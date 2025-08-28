import path from 'path';
import fs from 'fs-extra';
import createConfig from './config/vite.mjs';
import { manifestCache } from './config/manifest.mjs';
import httpMiddlewareHook from './server/http.mjs';
import wsMiddlewareHook from './server/socket.mjs';
import { templateTracker } from './server/template-tracker.mjs';
import { buildI18n } from './i18n/transformer.mjs';
import { languageTracker } from './i18n/language-tracker.mjs';
import { validateI18nBuild } from './i18n/validator.mjs';

export default function foundryVTT(options = { foundryPort: 30000 }) {
    return {
        name: 'vite-plugin-foundryvtt',
        config: createConfig(options),
        configResolved(config) {
            // store the resolved config in the manifest cache
            manifestCache.config = config;
            const normalizedEntry = path.posix.normalize(config.build.lib.entry);
            const segments = normalizedEntry
                .split(path.posix.sep)
                .filter(Boolean)
                .filter((s) => s !== '.');
            const firstFolder = segments.length > 0 ? segments[0] : '.';
            manifestCache.config.projectSourceFolder = path.join(config.root, firstFolder);
        },
        async closeBundle() {
            if (manifestCache.config.mode !== 'production') return;
            const outDir = path.resolve(process.cwd(), manifestCache.config.build.outDir);
            const candidates = ['system.json', 'module.json'];

            for (const file of candidates) {
                const src = path.resolve(process.cwd(), file);
                if (await fs.pathExists(src)) {
                    const dest = path.join(outDir, file);
                    await fs.copy(src, dest);
                    console.log(`Copied ${file} >>> ${dest}`);
                }
            }

            // console.log(manifestCache.config);

            const languages = manifestCache.data.languages;
            if (languages.length > 0) {
                buildI18n(manifestCache.data.languages, manifestCache.config);
                validateI18nBuild();
            }
        },
        load(id) {
            const config = manifestCache.config;
            const jsFileName = config.build.lib.fileName(config.build.lib.formats[0]);
            if (id === jsFileName || id === `/${jsFileName}`) {
                const jsToInject = fs.readFileSync(path.resolve(__dirname, './server/client-inject-hmr.mjs'));
                const entryPath = path.resolve(config.build.lib.entry); // absolute fs path
                const viteId = `/@fs/${entryPath}`;
                return `import '${viteId}';\n${jsToInject}`;
            }
        },
        configureServer(server) {
            // initialize the tracking of templates && language files
            templateTracker.initialize(server);
            languageTracker.initialize(server);
            // Virtualize http calls: css entry points & language files
            httpMiddlewareHook(server);
            // Serve templates from our files
            wsMiddlewareHook(server, options);
        },
    };
}

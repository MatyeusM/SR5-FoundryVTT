import path from 'path';
import fs from 'fs-extra';
import createConfig from './config/vite.mjs';
import { manifestCache } from './config/manifest.mjs';
import httpMiddlewareHook from './server/http.mjs';

export default function foundryVTT(options = { foundryPort: 30000 }) {
    // console.log(MANIFEST.data);
    return {
        name: 'vite-plugin-foundryvtt',
        config: createConfig(options),
        configResolved(config) {
            // store the resolved config in the manifest cache
            manifestCache.config = config;
        },
        async closeBundle() {
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
        },
        configureServer(server) {
            // Virtualize http calls: entry points & language files
            httpMiddlewareHook(server);
            // Proxy the ws connection: to inject the correct templates for dev
        },
    };
}

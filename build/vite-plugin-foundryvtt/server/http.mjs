import fs from 'fs-extra';
import path from 'path';
import { manifestCache } from '../config/manifest.mjs';
import { buildExpectedSrcPath, buildLanguage } from '../i18n/transformer.mjs';
import { languageTracker } from '../i18n/language-tracker.mjs';

export default function httpMiddlewareHook(server) {
    server.middlewares.use((req, res, next) => {
        const config = manifestCache.config;

        // This is a defensive check to make sure we don't handle requests
        // that don't belong to our module.
        if (!req.url.startsWith(config.decodedBase)) {
            next();
            return;
        }

        // Get the filenames from the resolved config, as they are now finalized.
        const cssFileName = config.build.lib.cssFileName;
        const cssEntry = cssFileName ? path.posix.join(config.decodedBase, `${cssFileName}.css`) : null;

        if (req.url === cssEntry) {
            res.setHeader('Content-Type', 'text/css');
            res.end('/* The cake is in another castle. */');
            return;
        }

        const languages = manifestCache.data.languages.filter(
            (lang) => path.posix.join(config.decodedBase, lang.path) === req.url,
        );

        if (languages.length === 1) {
            const language = languages[0];
            language.localPublicPath = path.posix.join(config.publicDir, language.path);
            language.expectedSrcPath = buildExpectedSrcPath(config, language);
            console.log(language);
            if (!fs.existsSync(language.localPublicPath)) {
                res.setHeader('Content-Type', 'application/json');
                res.end(buildLanguage(language.expectedSrcPath, language.lang));
            } else {
                languageTracker.addLanguageFile(language.lang, language.localPublicPath);
            }
        }
        next();
    });
}

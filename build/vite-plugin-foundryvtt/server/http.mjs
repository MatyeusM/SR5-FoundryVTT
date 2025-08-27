import fs from 'fs-extra';
import path from 'path';
import { manifestCache } from '../config/manifest.mjs';

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

        next();
    });
}

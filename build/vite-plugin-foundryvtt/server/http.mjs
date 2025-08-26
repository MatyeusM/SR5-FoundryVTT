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
        const jsFileName = config.build.lib.fileName(config.build.lib.formats[0]);
        const cssFileName = config.build.lib.cssFileName;

        // Construct the expected URL paths.
        const jsEntry = path.posix.join(config.decodedBase, jsFileName);
        const cssEntry = cssFileName ? path.posix.join(config.decodedBase, `${cssFileName}.css`) : null;

        if (req.url === jsEntry) {
            const jsToInject = fs.readFileSync(path.resolve(__dirname, './client-inject-hmr.mjs'));
            res.setHeader('Content-Type', 'application/javascript');
            res.end(`
            import "${config.build.lib.entry}";
            ${jsToInject}`);
            return;
        }

        if (req.url === cssEntry) {
            res.setHeader('Content-Type', 'text/css');
            res.end('/* The cake is in another castle. */');
            return;
        }

        next();
    });
}

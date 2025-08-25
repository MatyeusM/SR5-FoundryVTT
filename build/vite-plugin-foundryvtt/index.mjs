import path from 'path';
import { createConfig } from './config/vite.mjs';
import { manifestCache } from './config/manifest.mjs';

export default function foundryVTT(options = { foundryPort: 30000 }) {
    // console.log(MANIFEST.data);
    return {
        name: 'vite-plugin-foundryvtt',
        config: createConfig(options),
        configResolved(config) {
            manifestCache.config = config;
        },
        configureServer(server) {
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
                    res.setHeader('Content-Type', 'application/javascript');
                    res.end(`
                    import "${config.build.lib.entry}";
                    `);
                    return;
                }

                console.log(cssEntry);

                if (req.url === cssEntry) {
                    res.setHeader('Content-Type', 'text/css');
                    res.end('/* The cake is in another castle. */');
                    return;
                }

                next();
            });
        },
    };
}

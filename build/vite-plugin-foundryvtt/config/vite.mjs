// create a partial vite config based upon the entries
// of the manifest.
import path from 'path';
import { loadManifest } from './manifest.mjs';

export default function createConfig(options) {
    return async (config) => {
        const MANIFEST = await loadManifest(config);

        const base = config.base ? config.base : `/${MANIFEST.manifestType}s/${MANIFEST.data.id}/`;

        // Decide build format
        const hasEsModules = MANIFEST.data.esmodules?.length > 0;
        const formats = hasEsModules ? ['es'] : ['iife'];

        // Pick correct output filename
        const fileName = (format) => {
            if (format === 'es') {
                return MANIFEST.data.esmodules[0];
            }
            if (format === 'iife') {
                return MANIFEST.data.scripts?.[0];
            }
            throw new Error('No valid output target found in manifest.');
        };
        const cssFileName = path.parse(MANIFEST.data.styles[0]).name;

        return {
            base,
            // define minification
            esbuild: {
                minifyIdentifiers: false,
                minifySyntax: true,
                minifyWhitespace: true,
                keepNames: true,
            },
            // dev server base config
            server: {
                port: options.foundryPort + 1,
                proxy: {
                    [`^(?!${base})`]: `http://localhost:${options.foundryPort}`,
                    '/socket.io': { target: `ws://localhost:${options.foundryPort}`, ws: true },
                },
            },
            build: {
                minify: 'esbuild',
                lib: { name: MANIFEST.data.id, formats, fileName, cssFileName },
            },
        };
    };
}

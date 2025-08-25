import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import foundryVTT from './build/vite-plugin-foundryvtt/index.mjs';

export default defineConfig({
    // remove base once previous version has the newer output structure
    base: '/systems/shadowrun5e/dist/',
    plugins: [
        tsconfigPaths(),
        foundryVTT(),
        // note that we do not need to copy the system.json, as the
        // foundry vtt plugin handles this
        viteStaticCopy({
            targets: [
                { src: 'LICENSE', dest: '' },
                { src: 'README.md', dest: '' },
                { src: 'README-DEV.md', dest: '' },
            ],
        }),
    ],
    build: {
        // target: 'esnext', // let vite autotarget for compat?
        lib: { entry: './src/module/main.ts' },
    },
    css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
});

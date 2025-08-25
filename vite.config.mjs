import { defineConfig } from 'vite';
import fs from 'fs-extra';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import foundryVTT from './build/vite-plugin-foundryvtt/index.mjs';

export default defineConfig({
    // remove base once previous version has the newer output structure
    base: '/systems/shadowrun5e/dist/',
    plugins: [tsconfigPaths(), foundryVTT()],
    build: {
        // target: 'esnext', // let vite autotarget for compat?
        lib: { entry: './src/module/main.ts' },
    },
    css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
});

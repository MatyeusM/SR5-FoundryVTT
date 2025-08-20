import { defineConfig } from 'vite';
import fs from 'fs-extra';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig(({ command }) => {
    if (command === 'serve') {
        fs.writeFileSync('./bundle.css', `/* Placeholder */\n`);
        fs.writeFileSync('./bundle.js', `import "./src/module/main.ts";\n`);
    }

    return {
        base: `/systems/shadowrun5e/dist/`,
        publicDir: path.resolve(__dirname, 'public'),
        plugins: [tsconfigPaths()],
        esbuild: {
            target: ['es2022'],
            minifyIdentifiers: false,
            minifySyntax: true,
            minifyWhitespace: true,
            keepNames: true,
        },
        server: {
            port: 30001,
            proxy: {
                '^(?!/systems/shadowrun5e/)': `http://localhost:30000/`,
                '/socket.io': { target: 'ws://localhost:30000', ws: true },
            },
        },
        build: {
            outDir: path.resolve(__dirname, 'dist'),
            emptyOutDir: true,
            target: 'es2022',
            lib: { entry: './src/module/main.ts', name: 'bundle', formats: ['es'], fileName: 'bundle' },
            minify: 'esbuild',
        },
        css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
    };
});

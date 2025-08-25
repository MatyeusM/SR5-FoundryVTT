import { defineConfig } from 'vite';
import fs from 'fs-extra';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import foundryVTT from './build/vite-plugin-foundryvtt/index.mjs';


export default defineConfig(({ command }) => {
    if (command === 'serve') {
        fs.writeFileSync('./bundle.css', `/* Placeholder */\n`);
        fs.writeFileSync('./bundle.js', `import "./src/module/main.ts";\n`);
    }

    return {
        publicDir: path.resolve(__dirname, 'public'),
        plugins: [tsconfigPaths(), foundryVTT()],
        build: {
            // target: 'esnext', // let vite autotarget for compat?
            lib: { entry: './src/module/main.ts' },
        },
        css: { preprocessorOptions: { scss: { api: 'modern-compiler' } } },
    };
});

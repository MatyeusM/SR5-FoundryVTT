import path from 'path';
import { manifestCache } from '../config/manifest.mjs';

export const templateTracker = {
    initialized: false,
    tracked: new Set(),
    watcher: null,

    initialize(server) {
        if (this.initialized) return;
        this.initialized = true;
        this.watcher = server.watcher;

        this.watcher.on('change', (changedPath) => {
            if (!this.tracked.has(changedPath)) return;

            const config = manifestCache.config;
            // Strip `publicDir` or `root` from the changed path
            let relativePath = changedPath;
            if (config.publicDir && relativePath.startsWith(config.publicDir)) {
                relativePath = path.relative(config.publicDir, relativePath);
            } else if (config.root && relativePath.startsWith(config.root)) {
                relativePath = path.relative(config.root, relativePath);
            }
            // Join with decodedBase
            let foundryPath = path.join(config.decodedBase, relativePath);

            // Normalize for web (force `/` separators)
            foundryPath = foundryPath.split(path.sep).join('/');

            // Remove any accidental leading `/`
            if (foundryPath.startsWith('/')) {
                foundryPath = foundryPath.slice(1);
            }

            server.ws.send({
                type: 'custom',
                event: 'foundryvtt-template-update',
                data: { path: foundryPath },
            });
        });
    },

    addTemplate(filePath) {
        const absPath = path.resolve(filePath);
        if (!this.tracked.has(absPath)) {
            this.tracked.add(absPath);
            this.watcher.add(absPath);
        }
    },

    removeTemplate(filePath) {
        const absPath = path.resolve(filePath);
        this.tracked.delete(absPath);
        this.watcher.unwatch(absPath);
    },
};

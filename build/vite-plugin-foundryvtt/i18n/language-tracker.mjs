import path from 'path';
import { manifestCache } from '../config/manifest.mjs';

export const languageTracker = {
    initialized: false,
    tracked: new Map(), // Map<absoluteFilePath, lang>
    watcher: null,

    initialize(server) {
        if (this.initialized) return;
        this.initialized = true;
        this.watcher = server.watcher;

        this.watcher.on('change', (changedPath) => {
            const lang = this.tracked.get(changedPath);
            if (!lang) return;

            server.ws.send({
                type: 'custom',
                event: 'foundryvtt-language-update',
            });
        });
    },

    addLanguageFile(lang, filePath) {
        const absPath = path.resolve(filePath);
        if (!this.tracked.has(absPath)) {
            this.tracked.set(absPath, lang);
            this.watcher.add(absPath);
        }
    },

    removeLanguageFile(filePath) {
        const absPath = path.resolve(filePath);
        const lang = this.tracked.get(absPath);
        if (!lang) return;
        this.tracked.delete(absPath);
        this.watcher.unwatch(absPath);
    },
};

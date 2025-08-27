import path from 'path';
import { sync } from 'glob';
import fs from 'fs-extra';
import { languageTracker } from './language-tracker.mjs';

export function buildExpectedSrcPath(config, lang) {
    const dir = path.parse(lang.path).dir;
    const lastDirName = path.basename(dir);

    // Only append lang.lang if different from last folder
    const finalSegments = lastDirName === lang.lang ? dir : path.join(dir, lang.lang);

    return path.join(config.projectSourceFolder, finalSegments);
}

export function buildLanguage(langPath, langId) {
    if (!fs.existsSync(langPath) || !fs.statSync(langPath).isDirectory()) {
        console.warn(`[vite-plugin-foundryvtt] No language folder found at: ${langPath}`);
        return '{}';
    }
    const files = sync(path.posix.join(langPath, '**/*.json').replace(/\\/g, '/'));
    const result = {};

    for (const file of files) {
        try {
            const content = fs.readJsonSync(file);
            loadLanguage(result, content);
            languageTracker.addLanguageFile(langId, file);
        } catch (e) {
            console.warn(`Failed to read ${file}:`, e.message);
        }
    }

    return JSON.stringify(result, null, 2);
}

function loadLanguage(target, data) {
    const setProperty = (object, key, value) => {
        if (!key) return false;
        let current = object;
        const parts = key.split('.');
        const lastKey = parts.pop();

        for (const part of parts) {
            if (!(part in current)) current[part] = {};
            current = current[part];
        }

        if (!(lastKey in current) || current[lastKey] !== value) {
            current[lastKey] = value;
            return true;
        }
        return false;
    };

    const expandObject = (value, depth = 0) => {
        if (depth > 32) throw new Error('Max object expansion depth exceeded');
        if (!value || typeof value !== 'object' || Array.isArray(value)) return value;

        const result = {};
        for (const [key, val] of Object.entries(value)) {
            setProperty(result, key, expandObject(val, depth + 1));
        }
        return result;
    };

    // TODO: Add a check if we overwrite any keys
    const expanded = expandObject(data);
    Object.assign(target, expanded);
}

export function buildI18n(languages, config) {
    const outDir = path.join(config.root, config.build.outDir);

    for (const lang of languages) {
        const outPath = path.join(outDir, lang.path);

        if (fs.existsSync(outPath)) continue;

        const expectedSrcPath = buildExpectedSrcPath(config, lang);
        const json = buildLanguage(expectedSrcPath);

        fs.outputFileSync(outPath, json, 'utf-8');
        console.log(`[vite-plugin-foundryvtt] created language file from partials: ${lang.path}`);
    }
}

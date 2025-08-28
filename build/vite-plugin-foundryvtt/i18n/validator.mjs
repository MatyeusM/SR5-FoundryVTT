import path from 'path';
import fs from 'fs-extra';
import { manifestCache } from '../config/manifest.mjs';

function flattenKeys(obj, prefix = '') {
    const result = {};
    for (const [key, val] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (val && typeof val === 'object' && !Array.isArray(val)) {
            Object.assign(result, flattenKeys(val, fullKey));
        } else {
            result[fullKey] = val;
        }
    }
    return result;
}

export async function validateI18nBuild() {
    const config = manifestCache.config;

    const files = manifestCache.data.languages.map((lang) => ({
        path: path.posix.join(config.root, config.build.outDir, lang.path),
        language: lang.lang,
    }));
    const baseLanguage = files.find((file) => file.language === 'en'); // foundry-vtt fallback language

    const base = flattenKeys(fs.readJsonSync(baseLanguage.path));

    for (const file of files) {
        if (file.language === baseLanguage.language) continue;

        const current = flattenKeys(fs.readJsonSync(file.path));
        const missing = Object.keys(base).filter((k) => !(k in current));
        const extra = Object.keys(current).filter((k) => !(k in base));

        console.log(`Summary for language [${file.language}]:`);
        if (missing.length) console.warn(`  Missing keys: ${missing.length}`, missing.slice(0, 5));
        if (extra.length) console.warn(`  Extra keys: ${extra.length}`, extra.slice(0, 5));
        if (!missing.length && !extra.length) console.log('  ✅ All keys match.');
    }
}

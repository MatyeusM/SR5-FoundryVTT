import fs from 'fs-extra';
import path from 'path';

export let manifestCache = null;

export async function loadManifest(config, rootDir = process.cwd()) {
    if (manifestCache) {
        return manifestCache;
    }

    const publicDir = config.publicDir || 'public';

    const MANIFEST_LOCATIONS = ['system.json', 'module.json', `${publicDir}/system.json`, `${publicDir}/module.json`];

    const foundPath = MANIFEST_LOCATIONS.map((relPath) => path.resolve(rootDir, relPath)).find((absPath) =>
        fs.pathExistsSync(absPath),
    );

    if (!foundPath) {
        throw new Error(`Could not find a manifest file (system.json or module.json) in project root or public/.`);
    }

    try {
        const data = await fs.readJson(foundPath);
        const manifestType = foundPath.includes('module.json') ? 'module' : 'system';

        manifestCache = { path: foundPath, data, manifestType };
        return manifestCache;
    } catch (err) {
        throw new Error(`Failed to read manifest at ${foundPath}: ${err.message}`);
    }
}

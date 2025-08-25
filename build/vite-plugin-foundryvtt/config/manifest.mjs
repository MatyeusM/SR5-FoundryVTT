import fs from "fs-extra";
import path from "path";

/**
 * A list of potential FoundryVTT manifest file locations.
 * @type {string[]}
 */
const MANIFEST_LOCATIONS = [
  "system.json",
  "module.json",
  "public/system.json",
  "public/module.json",
];

/**
 * A cached copy of the parsed manifest.
 * @type {{path: string, data: object, type: 'systems'|'modules'} | null}
 */
export let manifestCache = null;

/**
 * Finds and loads the FoundryVTT manifest (system.json or module.json),
 * with caching to prevent redundant file system reads. It also determines
 * the type of manifest ('systems' or 'modules').
 * @param {string} [rootDir=process.cwd()] - The root directory of the project.
 * @returns {Promise<{path: string, data: object, type: 'systems'|'modules'}>} Parsed manifest JSON.
 */
async function loadManifest(rootDir = process.cwd()) {
  if (manifestCache) {
    return manifestCache;
  }

  const foundPath = MANIFEST_LOCATIONS.map(relPath => path.resolve(rootDir, relPath))
    .find(absPath => fs.pathExistsSync(absPath));

  if (!foundPath) {
    throw new Error(
      `Could not find a manifest file (system.json or module.json) in project root or public/.`
    );
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

/**
 * The FoundryVTT manifest object, loaded once on import.
 * @type {{path: string, data: object, type: 'systems'|'modules'}}
 */
export const MANIFEST = await loadManifest();

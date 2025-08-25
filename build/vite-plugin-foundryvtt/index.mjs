import { MANIFEST } from './config/manifest.mjs';
import { createConfig } from './config/vite.mjs';

export default function foundryVTT(options = { foundryPort: 30000 }) {
    console.log(MANIFEST.data);
    return {
        name: 'vite-plugin-foundryvtt',
        config: createConfig(options),
    }
}

/**
 * Drop-in asset replacement.
 *
 * Every file under src/assets/files/ is picked up automatically and addressed
 * by its path without the extension:
 *
 *   src/assets/files/characters/vik/idle.png   → 'characters/vik/idle'
 *   src/assets/files/scenes/canteen.jpg        → 'scenes/canteen'
 *   src/assets/files/footage/karishma-desk.mp4 → 'footage/karishma-desk'
 *
 * When a key has no file, components render a labelled placeholder instead.
 * Open #/assets in the app to see every key the story asks for and which are missing.
 */
const files = import.meta.glob('./files/**/*.{png,jpg,jpeg,webp,gif,svg,avif,mp4,webm}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export const assets: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  assets[path.replace('./files/', '').replace(/\.[^.]+$/, '')] = url;
}

export const assetUrl = (key: string): string | undefined => assets[key];
export const isVideo = (url: string) => /\.(mp4|webm)(\?|$)/i.test(url);

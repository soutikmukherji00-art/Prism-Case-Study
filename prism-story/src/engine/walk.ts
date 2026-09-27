import type { Layer, Panel } from './types';

/** Visit every layer in a panel, including those nested in split / group. */
export function walkLayers(layers: Layer[], visit: (l: Layer) => void) {
  for (const l of layers) {
    visit(l);
    if (l.kind === 'split') {
      walkLayers(l.left, visit);
      walkLayers(l.right, visit);
    } else if (l.kind === 'group') walkLayers(l.layers, visit);
  }
}

export interface AssetUse {
  key: string;
  what: string;
  panels: string[];
}

/** Every asset key the story asks for, with where it's used. Drives the #/assets checklist. */
export function assetsUsed(panels: Panel[]): AssetUse[] {
  const map = new Map<string, AssetUse>();
  const add = (key: string, what: string, panel: string) => {
    const e = map.get(key) ?? { key, what, panels: [] };
    if (!e.panels.includes(panel)) e.panels.push(panel);
    map.set(key, e);
  };
  for (const p of panels) {
    walkLayers(p.layers, (l) => {
      if (l.kind === 'scene') add(`scenes/${l.id}`, l.label, p.id);
      if (l.kind === 'character') add(`characters/${l.who}/${l.pose ?? 'idle'}`, `${l.who} · ${l.pose ?? 'idle'}`, p.id);
      if (l.kind === 'footage') add(`footage/${l.asset}`, l.caption, p.id);
    });
  }
  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
}

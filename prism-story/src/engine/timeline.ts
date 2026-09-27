import { layers as registry } from '../layers';
import { theme } from '../theme';
import type { LayerDef } from './registry';
import type { Layer, Panel } from './types';

/** Seconds a layer occupies on its parent timeline (its entrance, not its lifetime). */
export function layerDuration(layer: Layer): number {
  if (layer.hold != null) return layer.hold * theme.motion.pace;
  const def = registry[layer.kind] as LayerDef<unknown>;
  return def.duration(layer) * theme.motion.pace;
}

export interface Laid {
  starts: number[];
  end: number;
}

/**
 * Lay layers out in time. By default each layer starts when the previous one
 * finishes, so a panel reads top-to-bottom as written. `sync`, `after` and `at`
 * are the only knobs a story author needs.
 */
export function layoutLayers(list: Layer[], base = 0): Laid {
  let cursor = base;
  let prevStart = base;
  let end = base;
  const starts = list.map((l) => {
    const start = l.at != null ? base + l.at * theme.motion.pace : l.sync ? prevStart : cursor + (l.after ?? 0) * theme.motion.pace;
    const dur = layerDuration(l);
    cursor = start + dur;
    prevStart = start;
    end = Math.max(end, cursor);
    return start;
  });
  return { starts, end };
}

export const listDuration = (list: Layer[]): number => layoutLayers(list).end;
export const panelDuration = (p: Panel): number => listDuration(p.layers);

import type { Panel } from './types';

/**
 * State that persists across panels (marker, call tally, frame shape).
 * It is *derived* by folding over the panel list, never stored per panel, so
 * reordering or cutting panels keeps continuity correct automatically.
 */
export interface HudState {
  marker: {
    visible: boolean;
    m: number;
    a: number;
    frozen: boolean;
    onChart: boolean;
    named: boolean;
    lurch: boolean;
  };
  tally: number | null;
  frame: 'full' | 'band';
}

const INITIAL: HudState = {
  marker: { visible: false, m: 50, a: 50, frozen: false, onChart: false, named: false, lurch: false },
  tally: null,
  frame: 'full',
};

export function computeHud(panels: Panel[]): HudState[] {
  const out: HudState[] = [];
  let s = INITIAL;
  for (const p of panels) {
    const marker = { ...s.marker, lurch: !!p.lurch, frozen: false, onChart: false };
    const spec = p.marker;
    if (spec === 'hide') marker.visible = false;
    else if (spec === 'frozen') marker.frozen = true;
    else if (spec === 'onChart') marker.onChart = true;
    else if (spec) Object.assign(marker, { visible: true, m: spec.m, a: spec.a, onChart: !!spec.onChart });
    if (p.markerNamed) marker.named = true;
    s = {
      marker,
      tally: p.tally !== undefined ? p.tally : s.tally,
      frame: p.frame ?? s.frame,
    };
    out.push(s);
  }
  return out;
}

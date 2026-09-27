import { layers as registry } from '../layers';
import { cast } from '../story/cast';
import { toLine } from '../components/dialogue/Dialogue';
import type { Panel } from './types';
import { walkLayers } from './walk';

export interface StoryIssues {
  errors: string[];
  warnings: string[];
}

/**
 * Structural checks that keep a re-cut story from silently breaking.
 * Errors fail `npm test`; warnings show on the storyboard page.
 */
export function validateStory(panels: Panel[]): StoryIssues {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();

  for (const p of panels) {
    const at = `panel "${p.id}"`;
    if (seen.has(p.id)) errors.push(`${at}: duplicate id`);
    seen.add(p.id);
    if (!p.layers.length) warnings.push(`${at}: has no layers`);
    if (p.marker && typeof p.marker === 'object') {
      const { m, a } = p.marker;
      if (m < 0 || m > 100 || a < 0 || a > 100) errors.push(`${at}: marker out of range (${m}/${a})`);
    }
    walkLayers(p.layers, (l) => {
      if (!(l.kind in registry)) errors.push(`${at}: unknown layer kind "${l.kind}"`);
      if (l.kind === 'character' && !(l.who in cast)) errors.push(`${at}: unknown cast member "${l.who}"`);
      if (l.kind === 'dialogue') {
        const lines = l.lines.map(toLine);
        lines.forEach((ln) => { if (!(ln.who in cast)) errors.push(`${at}: unknown speaker "${ln.who}"`); });
        if (lines.length > 4) warnings.push(`${at}: ${lines.length} bubbles in one panel (script max is 3, 4 when the rhythm is the joke)`);
      }
    });
  }
  return { errors, warnings };
}

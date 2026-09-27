import { describe, expect, it } from 'vitest';
import { computeHud } from '../engine/hud';
import { layoutLayers, panelDuration } from '../engine/timeline';
import { validateStory } from '../engine/validate';
import { story } from '.';

describe('story', () => {
  it('has no structural errors', () => {
    const { errors } = validateStory(story);
    expect(errors).toEqual([]);
  });

  it('covers every script panel exactly once (while the story still mirrors the script)', () => {
    const refs = story.map((p) => p.ref).filter((r): r is number => r != null);
    const missing = Array.from({ length: 151 }, (_, i) => i + 1).filter((n) => !refs.includes(n));
    const dupes = refs.filter((r, i) => refs.indexOf(r) !== i);
    expect({ missing, dupes }).toEqual({ missing: [], dupes: [] });
  });

  it('every panel has a finite, reasonable timeline', () => {
    for (const p of story) {
      const d = panelDuration(p);
      expect(Number.isFinite(d), p.id).toBe(true);
      expect(d, p.id).toBeLessThan(20);
    }
  });

  it('HUD state carries forward: marker appears at P27, tally clears by Act 3, frame bands in the coda', () => {
    const hud = computeHud(story);
    const at = (ref: number) => hud[story.findIndex((p) => p.ref === ref)];
    expect(at(26).marker.visible).toBe(false);
    expect(at(27).marker.visible).toBe(true);
    expect(at(46).marker.lurch).toBe(true);
    expect(at(62).tally).toBe(6);
    expect(at(64).tally).toBeNull();
    expect(at(81).marker.onChart).toBe(true);
    expect(at(82).marker.named).toBe(true);
    expect(at(151).frame).toBe('band');
  });
});

describe('timeline', () => {
  it('lays layers out sequentially, honouring sync / after / at', () => {
    const { starts } = layoutLayers([
      { kind: 'dim', hold: 1 },
      { kind: 'dim', hold: 1, sync: true },
      { kind: 'dim', hold: 1, after: 0.5 },
      { kind: 'dim', hold: 1, at: 0.2 },
    ]);
    expect(starts).toEqual([0, 0, 1.5, 0.2]);
  });
});

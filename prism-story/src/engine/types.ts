import type { LayerProps } from '../layers';
import type { Area } from './areas';

export type ActId = 'act1' | 'act2' | 'act3' | 'act4' | 'coda';

/** When a layer starts, relative to the layer before it (all in seconds). */
export interface Timing {
  /** Absolute start inside the parent timeline. Overrides everything else. */
  at?: number;
  /** Extra gap after the previous layer finishes. Default 0. */
  after?: number;
  /** Start together with the previous layer instead of after it. */
  sync?: boolean;
  /** Override how long this layer occupies the timeline. */
  hold?: number;
}

export interface LayerBase extends Timing {
  area?: Area;
  /** Stable React key when the same kind appears twice in a panel. */
  key?: string;
}

/**
 * Every layer kind registered in src/layers/index.ts becomes a valid story
 * layer automatically: `{ kind: 'callout', label, body, ... }`.
 */
export type Layer = {
  [K in keyof LayerProps]: LayerBase & { kind: K } & LayerProps[K];
}[keyof LayerProps];

export type LayerKind = Layer['kind'];

/** Marker instruction for a panel. Omitted = carry the previous state forward. */
export type MarkerSpec =
  | { m: number; a: number; /** The full chart is on screen and owns the dot; hide the corner widget. */ onChart?: boolean }
  | 'hide'
  | 'frozen'
  | 'onChart';

export interface Panel {
  /** Stable slug. Never renumber: order comes from position in the story list. */
  id: string;
  /** Panel number in the original script, for traceability only. */
  ref?: number;
  title: string;
  act: ActId;
  movement?: string;
  layers: Layer[];

  /* Persistent HUD instructions — each carries forward until changed. */
  marker?: MarkerSpec;
  /** One-shot: make the marker visibly lurch on arrival (P46). */
  lurch?: boolean;
  /** From this panel on, the marker shows its axis names (P81). */
  markerNamed?: boolean;
  /** Call tally in the corner. null hides it. */
  tally?: number | null;
  /** Frame shape. 'band' = the 16:9 epilogue band (P142). */
  frame?: 'full' | 'band';

  /* Panel-local presentation */
  mood?: 'normal' | 'desaturate' | 'still';
  /** Seconds into the panel before the mood kicks in. */
  moodAt?: number;
  transition?: 'fade' | 'cut' | 'continue';
  camera?: { zoom?: number; x?: number; y?: number; push?: boolean };

  /** Why the panel exists. Shown in the dev overlay (press D). */
  notes?: string;
}

export interface ActMeta {
  id: ActId;
  title: string;
  short: string;
}

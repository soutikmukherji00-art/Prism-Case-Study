/**
 * Tiny helpers so story files read like the script. Everything here returns
 * plain layer objects — you can always write `{ kind: '...', ... }` by hand instead.
 */
import type { CharacterProps } from '../components/character/Character';
import type { LineInput } from '../components/dialogue/Dialogue';
import type { SceneProps } from '../components/scene/Scene';
import type { ActId, Layer, LayerBase, LayerKind, Panel } from '../engine/types';
import type { CastId } from './cast';

type Of<K extends LayerKind> = Extract<Layer, { kind: K }>;
export type PanelDraft = Omit<Panel, 'act' | 'movement'>;

/** A movement = a run of panels in one act. Files export one or more of these. */
export const movement = (act: ActId, name: string, panels: PanelDraft[]): Panel[] =>
  panels.map((p) => ({ ...p, act, movement: name }));

/** Typed escape hatch for any registered layer kind. */
export const layer = <K extends LayerKind>(kind: K, props: Omit<Of<K>, 'kind'>): Of<K> => ({ kind, ...props }) as Of<K>;

/** Tweak placement or timing of a layer: at(say(...), { area: 'rightPad', after: 0.3 }). */
export const at = <L extends Layer>(l: L, extra: LayerBase): L => ({ ...l, ...extra });

export const scene = (id: string, label: string, tone: SceneProps['tone'] = 'neutral') => layer('scene', { id, label, tone });

export const char = (who: CastId, opts: Omit<CharacterProps, 'who'> = {}) => layer('character', { who, ...opts });

/** Speech bubbles, in order: say(['vik', 'Was.'], ['nandini', 'Mm.']) */
export const say = (...lines: LineInput[]) => layer('dialogue', { lines });

export const card = (label: string, body: string, extra: Partial<Omit<Of<'callout'>, 'kind' | 'label' | 'body'>> = {}) =>
  layer('callout', { label, body, ...extra });

export const quote = (text: string, sub: string) => layer('type', { text, sub, variant: 'quote', bg: 'surface' });
export const statement = (text: string, extra: Partial<Omit<Of<'type'>, 'kind' | 'text'>> = {}) => layer('type', { text, variant: 'statement', ...extra });
export const product = (text: string, sub: string) => layer('type', { text, sub, variant: 'product' });

/** The two designers in their usual spots. */
export const designers = (opts: Omit<CharacterProps, 'who'> = {}) => [
  char('vik', { x: 34, ...opts }),
  char('nandini', { x: 66, ...opts }),
];

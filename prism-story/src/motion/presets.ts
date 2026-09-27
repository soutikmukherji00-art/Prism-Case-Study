import type { TargetAndTransition, Transition } from 'motion/react';
import { useBeat } from '../engine/BeatContext';
import { theme } from '../theme';

/**
 * Named entrance animations. Components never hand-write keyframes for
 * entrances; they ask for one of these by name so a theme can retune them all.
 */
export type EnterName =
  | 'none'
  | 'fade'
  | 'rise'
  | 'drop'
  | 'pop'
  | 'slideLeft'
  | 'slideRight'
  | 'stamp'
  | 'grow'
  | 'zoom'
  | 'blur';

const FROM: Record<Exclude<EnterName, 'none'>, TargetAndTransition> = {
  fade: { opacity: 0 },
  rise: { opacity: 0, y: 28 },
  drop: { opacity: 0, y: -28 },
  pop: { opacity: 0, scale: 0.82 },
  slideLeft: { opacity: 0, x: -120 },
  slideRight: { opacity: 0, x: 120 },
  stamp: { opacity: 0, scale: 1.45, rotate: -10 },
  grow: { opacity: 0, scaleY: 0.1 },
  zoom: { opacity: 0, scale: 1.14 },
  blur: { opacity: 0, filter: 'blur(10px)' },
};

const TO: TargetAndTransition = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, scaleY: 1, filter: 'blur(0px)' };

const SPRINGY: EnterName[] = ['pop', 'stamp', 'slideLeft', 'slideRight', 'rise', 'drop'];

export function transitionFor(name: EnterName, delay: number, duration?: number): Transition {
  if (SPRINGY.includes(name) && duration == null) return { ...theme.motion.spring, delay };
  return { duration: duration ?? theme.motion.tween, ease: theme.motion.ease, delay };
}

export interface EnterOpts {
  duration?: number;
  /** Final pose override, e.g. { rotate: -6 } for a stamp that lands crooked. */
  to?: TargetAndTransition;
}

/** Props to spread on a motion element: `<motion.div {...enter('rise', delay, instant)} />` */
export function enter(name: EnterName, delay: number, instant: boolean, opts: EnterOpts = {}) {
  const animate = { ...TO, ...opts.to };
  if (name === 'none' || instant) return { initial: false as const, animate, transition: { duration: 0 } };
  return { initial: FROM[name], animate, transition: transitionFor(name, delay, opts.duration) };
}

/** Hook form: reads the layer's beat, adds `offset` seconds. */
export function useEnter(name: EnterName, offset = 0, opts: EnterOpts = {}) {
  const { start, instant } = useBeat();
  return enter(name, start + offset * theme.motion.pace, instant, opts);
}

/** Scale a duration by the global pace. */
export const paced = (s: number) => s * theme.motion.pace;

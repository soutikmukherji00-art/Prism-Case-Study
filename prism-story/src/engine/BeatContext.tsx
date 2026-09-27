import { createContext, useContext, useEffect, useState } from 'react';
import { theme } from '../theme';

/**
 * Every layer renders inside a Beat: when it starts on the panel timeline and
 * whether the panel should appear already-settled (no entrance animation) —
 * which happens when the reader skips ahead or steps backwards.
 */
export interface Beat {
  start: number;
  instant: boolean;
}

const BeatCtx = createContext<Beat>({ start: 0, instant: false });

export const BeatProvider = BeatCtx.Provider;
export const useBeat = () => useContext(BeatCtx);

/** Delay (seconds) for something `offset` seconds into this layer. 0 when instant. */
export function useDelay(offset = 0) {
  const { start, instant } = useBeat();
  return instant ? 0 : start + offset * theme.motion.pace;
}

/**
 * Flips to true once the timeline reaches `offset` seconds into this layer.
 * Use it for state changes inside a widget (a chip changing, an error clearing).
 */
export function useReached(offset = 0) {
  const { start, instant } = useBeat();
  const [reached, setReached] = useState(instant);
  useEffect(() => {
    if (instant) {
      setReached(true);
      return;
    }
    setReached(false);
    const t = setTimeout(() => setReached(true), (start + offset * theme.motion.pace) * 1000);
    return () => clearTimeout(t);
  }, [start, offset, instant]);
  return reached;
}

/** Index of how many of `count` steps (spaced `gap` seconds apart from `offset`) have been reached. */
export function useStepper(count: number, gap: number, offset = 0) {
  const { start, instant } = useBeat();
  const [n, setN] = useState(instant ? count : 0);
  useEffect(() => {
    if (instant) {
      setN(count);
      return;
    }
    setN(0);
    const timers = Array.from({ length: count }, (_, i) =>
      setTimeout(() => setN(i + 1), (start + (offset + i * gap) * theme.motion.pace) * 1000),
    );
    return () => timers.forEach(clearTimeout);
  }, [count, gap, offset, start, instant]);
  return n;
}

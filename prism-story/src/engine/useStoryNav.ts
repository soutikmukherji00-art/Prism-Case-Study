import { useCallback, useEffect, useRef, useState } from 'react';
import { panelDuration } from './timeline';
import type { Panel } from './types';

const HASH_PREFIX = '#/p/';

export function indexFromHash(panels: Panel[]): number {
  const h = window.location.hash;
  if (!h.startsWith(HASH_PREFIX)) return 0;
  const id = decodeURIComponent(h.slice(HASH_PREFIX.length));
  const i = panels.findIndex((p) => p.id === id);
  return i >= 0 ? i : 0;
}

export const panelHref = (p: Panel) => `${HASH_PREFIX}${encodeURIComponent(p.id)}`;

interface NavState {
  index: number;
  /** Render the panel already settled (skipped ahead / stepped back). */
  instant: boolean;
  /** Bumps when the same panel is re-rendered settled, to remount it. */
  nonce: number;
}

/**
 * Tap-to-advance navigation.
 * - First "next" while a panel is still animating settles it; the second advances.
 * - "Back" always lands on a settled panel.
 * - The URL hash tracks the panel id, so any panel is deep-linkable.
 */
export function useStoryNav(panels: Panel[], { keyboard = true } = {}) {
  const [s, setS] = useState<NavState>(() => ({ index: indexFromHash(panels), instant: false, nonce: 0 }));
  const [settled, setSettled] = useState(false);
  const panel = panels[s.index];
  const stateRef = useRef({ s, settled });
  stateRef.current = { s, settled };

  useEffect(() => {
    if (s.instant) {
      setSettled(true);
      return;
    }
    setSettled(false);
    const t = setTimeout(() => setSettled(true), panelDuration(panel) * 1000 + 120);
    return () => clearTimeout(t);
  }, [s, panel]);

  useEffect(() => {
    const href = panelHref(panel);
    if (window.location.hash !== href) history.replaceState(null, '', href);
  }, [panel]);

  const go = useCallback(
    (i: number, instant = false) => {
      const index = Math.max(0, Math.min(panels.length - 1, i));
      setS((prev) => ({ index, instant, nonce: prev.nonce + 1 }));
    },
    [panels.length],
  );

  const next = useCallback(() => {
    const { s, settled } = stateRef.current;
    if (!settled) setS({ ...s, instant: true, nonce: s.nonce + 1 });
    else if (s.index < panels.length - 1) go(s.index + 1);
  }, [go, panels.length]);

  const prev = useCallback(() => go(stateRef.current.s.index - 1, true), [go]);

  useEffect(() => {
    const onHash = () => {
      const i = indexFromHash(panels);
      if (window.location.hash.startsWith(HASH_PREFIX) && i !== stateRef.current.s.index) go(i);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [panels, go]);

  useEffect(() => {
    if (!keyboard) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
        next();
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        prev();
      } else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(panels.length - 1, true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keyboard, next, prev, go, panels.length]);

  return { index: s.index, panel, instant: s.instant, nonce: s.nonce, settled, next, prev, go, total: panels.length };
}

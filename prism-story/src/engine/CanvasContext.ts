import { createContext, useContext, type RefObject } from 'react';

/** The fixed 1280×720 logical canvas every panel is laid out on. */
export const CANVAS = { w: 1280, h: 720 };

export interface CanvasInfo {
  ref: RefObject<HTMLDivElement | null>;
  /** Current CSS scale from logical canvas px to screen px. */
  scale: number;
}

const Ctx = createContext<CanvasInfo>({ ref: { current: null }, scale: 1 });
export const CanvasProvider = Ctx.Provider;
export const useCanvas = () => useContext(Ctx);

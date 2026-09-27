/**
 * Named regions of the 1280×720 story canvas, as [x, y, width, height] in percent.
 * Layers are placed into an area; nothing in a story file uses raw pixels.
 * Add a name here when a layout keeps recurring.
 */
export const AREAS = {
  full: [0, 0, 100, 100],
  center: [15, 12, 70, 76],
  centerWide: [6, 10, 88, 80],
  centerNarrow: [28, 14, 44, 72],
  left: [0, 0, 50, 100],
  right: [50, 0, 50, 100],
  leftPad: [4, 10, 43, 80],
  rightPad: [53, 10, 43, 80],
  top: [8, 4, 84, 36],
  bottom: [8, 60, 84, 36],
  topLeft: [4, 5, 44, 48],
  topRight: [52, 5, 44, 48],
  bottomLeft: [4, 50, 44, 46],
  bottomRight: [52, 50, 44, 46],
  upper: [10, 6, 80, 54],
  lower: [10, 58, 80, 38],
  /** Dialogue strip across the top, with a screen below it. */
  strip: [8, 2, 84, 24],
  belowStrip: [12, 27, 76, 70],
} as const;

export type AreaName = keyof typeof AREAS;
export type AreaBox = readonly [number, number, number, number];
export type Area = AreaName | AreaBox;

export function resolveArea(area: Area | undefined, fallback: Area = 'full'): AreaBox {
  const a = area ?? fallback;
  return typeof a === 'string' ? AREAS[a] : a;
}

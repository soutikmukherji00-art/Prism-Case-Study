/**
 * Fogg Behavior Model geometry, shared by the corner marker and the full chart.
 * The action line is m × a = K: above/right of it a prompt works (green zone).
 * K is tuned so the script's M/A values land on the side the script says.
 */
export const THRESHOLD_K = 2900;

export const isAboveThreshold = (m: number, a: number) => m * a >= THRESHOLD_K;

/** Threshold curve as points in 0–100 space (a, m). */
export function thresholdPoints(steps = 40): [number, number][] {
  const pts: [number, number][] = [];
  const a0 = THRESHOLD_K / 100;
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((100 - a0) * i) / steps;
    pts.push([a, THRESHOLD_K / a]);
  }
  return pts;
}

/** Map (m, a) into a w×h box with padding. */
export function project(m: number, a: number, w: number, h: number, pad = 0) {
  return { x: pad + (a / 100) * (w - pad * 2), y: pad + (1 - m / 100) * (h - pad * 2) };
}

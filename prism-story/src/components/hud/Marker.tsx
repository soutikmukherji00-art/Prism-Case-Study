import { motion } from 'motion/react';
import { project, thresholdPoints, isAboveThreshold } from '../../engine/bmap';
import { CANVAS } from '../../engine/CanvasContext';
import type { HudState } from '../../engine/hud';
import { theme } from '../../theme';
import './hud.css';

/** Where the corner marker lives on the canvas. BMapChart uses this for the P81 reveal. */
export const HUD_MARKER = { left: 22, bottom: 22, size: 128, pad: 10 };

export function hudDotCanvasPoint(m: number, a: number) {
  const { left, bottom, size, pad } = HUD_MARKER;
  const p = project(m, a, size, size, pad);
  return { x: left + p.x, y: CANVAS.h - bottom - size + p.y };
}

const S = HUD_MARKER.size;
const curve = thresholdPoints(24)
  .map(([a, m], i) => {
    const p = project(m, a, S, S, HUD_MARKER.pad);
    return `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  })
  .join(' ');
const pad = HUD_MARKER.pad;
const redZone = `${curve} L${S - pad} ${S - pad} L${pad} ${S - pad} L${pad} ${pad} Z`;
const greenZone = `${curve} L${S - pad} ${pad} Z`;

/**
 * The persistent B=MAP marker (appears P27, named P81). Unlabelled until
 * `named`; lurches when told to; frozen = icy outline while the CM side plays.
 */
export function Marker({ state }: { state: HudState['marker'] }) {
  const { visible, m, a, frozen, onChart, named, lurch } = state;
  const p = project(m, a, S, S, pad);
  const green = isAboveThreshold(m, a);
  return (
    <motion.div
      className={`marker${frozen ? ' marker--frozen' : ''}`}
      style={{ left: HUD_MARKER.left, bottom: HUD_MARKER.bottom, width: S, height: S }}
      initial={false}
      animate={{ opacity: visible && !onChart ? 1 : 0, x: lurch ? [0, -7, 6, -4, 3, 0] : 0 }}
      transition={{ opacity: { duration: 0.4 }, x: { duration: 0.6, delay: 0.3 } }}
    >
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
        <path d={redZone} className="marker__red" />
        <path d={greenZone} className="marker__green" />
        <path d={curve} className="marker__curve" />
        <path d={`M${pad} ${pad - 2} V${S - pad} H${S - pad + 2}`} className="marker__axes" />
        <motion.circle
          r={6.5}
          className={`marker__dot${green ? ' marker__dot--green' : ''}`}
          initial={false}
          animate={{ cx: p.x, cy: p.y }}
          transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.25 * theme.motion.pace }}
        />
      </svg>
      {named && (
        <>
          <span className="marker__axis marker__axis--m">Motivation</span>
          <span className="marker__axis marker__axis--a">Ability</span>
        </>
      )}
      <span className="marker__readout">M/A {m} / {a}</span>
    </motion.div>
  );
}

export function CallTally({ n }: { n: number | null }) {
  return (
    <motion.div key={n ?? 'none'} className="tally" initial={n == null ? false : { scale: 1.25 }} animate={{ opacity: n == null ? 0 : 1, scale: 1 }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
      </svg>
      <span>CALL {n ?? ''}</span>
    </motion.div>
  );
}

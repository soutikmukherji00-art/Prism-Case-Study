import { motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { project, thresholdPoints } from '../../engine/bmap';
import { useBeat } from '../../engine/BeatContext';
import { useCanvas } from '../../engine/CanvasContext';
import { paced } from '../../motion/presets';
import { hudDotCanvasPoint } from '../hud/Marker';
import './charts.css';

type MA = { m: number; a: number };

export interface BMapChartProps {
  /** Marker target. Omit for an empty chart (P80). */
  marker?: MA;
  /** Animate the marker from here to `marker` (e.g. P92 climbing, P99 crossing). */
  from?: MA;
  /** P81: the corner marker lifts out and lands on the chart. */
  fromCorner?: MA;
  axes?: boolean;
  /** Draw the dashed activation threshold. 'draw' animates it in (P83). */
  threshold?: boolean | 'draw';
  zones?: boolean;
  arrows?: ('up' | 'right')[];
  /** Emphasise one arrow (Connect → motivation, Prism → ability). */
  glow?: 'up' | 'right';
  /** A prompt fires beside the marker: 'fail' fizzles, 'land' works. */
  burst?: 'fail' | 'land';
  /** Journey line through these points, drawn in order (P103, P148). */
  path?: MA[];
  labels?: { text: string; m: number; a: number }[];
  /** Label for a band drawn across the chart (P101 AI layer). */
  band?: string;
}

const W = 640, H = 460, PAD = 56;
const P = (v: MA) => project(v.m, v.a, W, H, PAD);
const curvePts = thresholdPoints(40).map(([a, m]) => P({ m, a }));
const curve = curvePts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
const redZone = `${curve} L${W - PAD} ${H - PAD} L${PAD} ${H - PAD} L${PAD} ${PAD} Z`;
const greenZone = `${curve} L${W - PAD} ${PAD} Z`;

export const bmapDuration = (p: BMapChartProps) => 0.8 + (p.from || p.fromCorner ? 1.2 : 0) + (p.path ? 2 : 0) + (p.burst ? 1 : 0) + (p.arrows ? 0.8 : 0);

export function BMapChart({ marker, from, fromCorner, axes = true, threshold = true, zones = true, arrows, glow, burst, path, labels, band }: BMapChartProps) {
  const { start, instant } = useBeat();
  const d = (s: number) => (instant ? 0 : start + paced(s));
  const t = (s: number, dur = 0.6) => ({ delay: d(s), duration: instant ? 0 : dur });
  const svgRef = useRef<SVGSVGElement>(null);
  const cornerDelta = useCornerDelta(svgRef, marker, fromCorner);

  const target = marker ? P(marker) : null;
  const origin = from ? P(from) : target;
  const moveAt = 0.6;

  return (
    <div className="bmap">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="bmap__svg">
        {zones && (
          <motion.g initial={instant ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.1)}>
            <path d={redZone} className="bmap__red" />
            <path d={greenZone} className="bmap__green" />
          </motion.g>
        )}
        {band && (
          <motion.g initial={instant ? false : { opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={t(0.4, 0.7)} style={{ originX: 0 }}>
            <rect x={PAD} y={PAD + 8} width={W - PAD * 2} height={40} className="bmap__band" />
            <text x={W / 2} y={PAD + 34} textAnchor="middle" className="bmap__bandText">{band}</text>
          </motion.g>
        )}
        {axes && (
          <g className="bmap__axes">
            <path d={`M${PAD} ${PAD - 16} V${H - PAD} H${W - PAD + 16}`} />
            <text x={PAD - 18} y={H / 2} transform={`rotate(-90 ${PAD - 18} ${H / 2})`} textAnchor="middle">Motivation</text>
            <text x={W / 2} y={H - PAD + 34} textAnchor="middle">Ability</text>
          </g>
        )}
        {threshold && (
          <motion.path
            d={curve}
            className="bmap__curve"
            initial={instant || threshold !== 'draw' ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={t(0.2, 1.2)}
          />
        )}
        {labels?.map((l, i) => {
          const p = P(l);
          return <motion.text key={i} x={p.x} y={p.y} className="bmap__label" textAnchor="middle" initial={instant ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={t(0.5 + i * 0.2)}>{l.text}</motion.text>;
        })}
        {path && path.length > 1 && (
          <motion.path
            d={path.map((v, i) => `${i ? 'L' : 'M'}${P(v).x} ${P(v).y}`).join(' ')}
            className="bmap__path"
            initial={instant ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={t(0.6, 2)}
          />
        )}
        {target && arrows?.map((dir) => {
          const end = dir === 'up' ? { x: target.x, y: PAD + 20 } : { x: W - PAD - 20, y: target.y };
          return (
            <motion.path
              key={dir}
              d={`M${target.x} ${target.y} L${end.x} ${end.y}`}
              className={`bmap__arrow${glow === dir ? ' bmap__arrow--glow' : ''}`}
              markerEnd="url(#bmap-head)"
              initial={instant ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={t(0.5 + (dir === 'right' ? 0.35 : 0), 0.7)}
            />
          );
        })}
        <defs>
          <marker id="bmap-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="bmap__head" />
          </marker>
        </defs>
        {target && burst && (
          <motion.circle
            cx={(burst === 'land' ? origin! : target).x + 26}
            cy={(burst === 'land' ? origin! : target).y - 26}
            className={`bmap__burst bmap__burst--${burst}`}
            initial={instant ? { r: 0, opacity: 0 } : { r: 4, opacity: 0.9 }}
            animate={{ r: 34, opacity: 0 }}
            transition={t(0.4, 0.9)}
          />
        )}
        {/* When flying in from the corner, wait one layout pass so the start offset is known. */}
        {target && origin && (!fromCorner || instant || cornerDelta) && (
          <motion.circle
            r={11}
            className="bmap__dot"
            initial={instant ? false : { cx: origin.x, cy: origin.y, x: cornerDelta?.x ?? 0, y: cornerDelta?.y ?? 0 }}
            animate={{ cx: target.x, cy: target.y, x: 0, y: 0 }}
            transition={{ delay: d(fromCorner ? 0.2 : burst === 'land' ? 1.0 : moveAt), duration: instant ? 0 : 1.1, ease: [0.3, 0.8, 0.2, 1] }}
          />
        )}
      </svg>
    </div>
  );
}

/** Offset (in chart SVG units) from the chart dot to where the corner marker's dot sits on screen. */
function useCornerDelta(svgRef: React.RefObject<SVGSVGElement | null>, marker?: MA, fromCorner?: MA) {
  const { scale } = useCanvas();
  const [delta, setDelta] = useState<{ x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    // Find the canvas from our own node: on first mount the parent's ref isn't attached yet.
    const canvas = svgRef.current?.closest('.player__canvas');
    if (!fromCorner || !marker || !svgRef.current || !canvas) return;
    const svgBox = svgRef.current.getBoundingClientRect();
    const canvasBox = canvas.getBoundingClientRect();
    // viewBox is letterboxed (preserveAspectRatio "meet"): uniform scale + centring offset.
    const unit = Math.min(svgBox.width / W, svgBox.height / H);
    const offX = (svgBox.width - W * unit) / 2, offY = (svgBox.height - H * unit) / 2;
    const dot = P(marker);
    const dotScreen = { x: svgBox.left + offX + dot.x * unit, y: svgBox.top + offY + dot.y * unit };
    const hud = hudDotCanvasPoint(fromCorner.m, fromCorner.a);
    const hudScreen = { x: canvasBox.left + hud.x * scale, y: canvasBox.top + hud.y * scale };
    setDelta({ x: (hudScreen.x - dotScreen.x) / unit, y: (hudScreen.y - dotScreen.y) / unit });
  }, [fromCorner, marker, scale, svgRef]);
  return delta;
}

import { motion } from 'motion/react';
import { useBeat } from '../../engine/BeatContext';
import { enter, paced, useEnter } from '../../motion/presets';
import { RichText } from '../primitives/RichText';
import './charts.css';

export interface DayBarProps {
  title?: string;
  segments: { label: string; share: number; tone?: 'muted' | 'strong' | 'accent' }[];
}

/** One working day as a single segmented bar (P66). The only conventional chart in the story. */
export function DayBar({ title = 'One working day', segments }: DayBarProps) {
  const { start, instant } = useBeat();
  const total = segments.reduce((s, x) => s + x.share, 0);
  let acc = 0;
  return (
    <div className="daybar">
      <div className="daybar__title">{title}</div>
      <div className="daybar__bar">
        {segments.map((s, i) => {
          const delay = start + paced(0.3 + i * 0.5);
          acc += s.share;
          return (
            <motion.div
              key={i}
              className={`daybar__seg daybar__seg--${s.tone ?? 'muted'}`}
              style={{ width: `${(s.share / total) * 100}%`, originX: 0 }}
              initial={instant ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: instant ? 0 : delay, duration: instant ? 0 : 0.5 }}
            >
              <span>{s.label}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="daybar__ticks"><span>9 AM</span><span>7 PM</span></div>
    </div>
  );
}
export const dayBarDuration = (p: DayBarProps) => 0.5 + p.segments.length * 0.5;

export interface MetricProps {
  label: string;
  /** Headline value, or `from` → `to`. */
  value?: string;
  from?: string;
  to?: string;
  sub?: string;
}

/** Result card (P145–147). */
export function Metric({ label, value, from, to, sub }: MetricProps) {
  const { start, instant } = useBeat();
  const anim = useEnter('rise');
  return (
    <motion.div className="metric" {...anim}>
      <div className="metric__label">{label}</div>
      <div className="metric__value">
        {value ? <RichText text={value} /> : (
          <>
            <span className="metric__from"><RichText text={from ?? ''} /></span>
            <motion.span className="metric__arrow" {...enter('fade', start + 0.5, instant)}>→</motion.span>
            <motion.span {...enter('pop', start + 0.8, instant)}><RichText text={to ?? ''} /></motion.span>
          </>
        )}
      </div>
      {sub && <motion.div className="metric__sub" {...enter('fade', start + 1.1, instant)}><RichText text={sub} /></motion.div>}
    </motion.div>
  );
}

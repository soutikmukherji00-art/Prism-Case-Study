import { motion } from 'motion/react';
import { useBeat } from '../../engine/BeatContext';
import { enter, useEnter, type EnterName } from '../../motion/presets';
import { RichText } from '../primitives/RichText';
import './callout.css';

export interface CalloutProps {
  /** Small caps kicker, e.g. 'NN/g heuristic · Match between the system and the real world'. */
  label: string;
  title?: string;
  body?: string;
  items?: { title: string; body: string }[];
  /** Our own conclusion, visually separated from the cited definition (P23). */
  ours?: string;
  tone?: 'neutral' | 'alert' | 'insight' | 'method' | 'wrong' | 'result';
  enter?: EnterName;
  valign?: 'top' | 'center' | 'bottom';
}

export const calloutDuration = (p: CalloutProps) => 0.7 + (p.items?.length ?? 0) * 0.35 + (p.ours ? 0.4 : 0);

/**
 * Call-out card: never spoken aloud, a different register from dialogue.
 * Items and the `ours` paragraph reveal after the card lands.
 */
export function Callout({ label, title, body, items, ours, tone = 'neutral', enter: name = 'rise', valign = 'center' }: CalloutProps) {
  const { start, instant } = useBeat();
  const anim = useEnter(name);
  return (
    <div className={`callout-wrap callout-wrap--${valign}`}>
      <motion.div className={`callout callout--${tone}`} {...anim}>
        <div className="callout__label">{label}</div>
        {title && <div className="callout__title"><RichText text={title} /></div>}
        {body && <div className="callout__body"><RichText text={body} /></div>}
        {items?.map((it, i) => (
          <motion.div key={i} className="callout__item" {...enter('rise', start + 0.5 + i * 0.35, instant)}>
            <strong><RichText text={it.title} /></strong> <RichText text={it.body} />
          </motion.div>
        ))}
        {ours && (
          <motion.div className="callout__ours" {...enter('fade', start + 0.6 + (items?.length ?? 0) * 0.35, instant)}>
            <RichText text={ours} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

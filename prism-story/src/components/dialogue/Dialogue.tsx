import { motion } from 'motion/react';
import { useBeat } from '../../engine/BeatContext';
import { enter, paced } from '../../motion/presets';
import { cast, type CastId } from '../../story/cast';
import { RichText } from '../primitives/RichText';
import './dialogue.css';

export interface Line {
  who: CastId;
  text: string;
  /** Force the bubble to one side regardless of the speaker's default. */
  side?: 'left' | 'right';
}
/** Story files may write a line as a tuple: ['vik', 'Was.'] */
export type LineInput = Line | [CastId, string];

export interface DialogueProps {
  lines: LineInput[];
  /** 'speaker' = each bubble leans to its speaker's side. */
  align?: 'speaker' | 'left' | 'right' | 'center';
  valign?: 'top' | 'center' | 'bottom';
  size?: 'm' | 'l';
}

export const toLine = (l: LineInput): Line => (Array.isArray(l) ? { who: l[0], text: l[1] } : l);

/** Reading time a bubble holds the timeline before the next one pops. */
export const lineDuration = (text: string) => 0.4 + Math.min(text.length * 0.022, 1.8);
export const dialogueDuration = (p: DialogueProps) => p.lines.map(toLine).reduce((s, l) => s + lineDuration(l.text), 0);

/**
 * Speech bubbles, revealed one at a time on the panel timeline.
 * Three bubbles is the script's normal maximum; four is allowed when the rhythm is the joke.
 */
export function Dialogue({ lines, align = 'speaker', valign = 'top', size = 'm' }: DialogueProps) {
  const { start, instant } = useBeat();
  let offset = 0;
  return (
    <div className={`dialogue dialogue--${valign} dialogue--${size}`}>
      {lines.map(toLine).map((line, i) => {
        const delay = start + paced(offset);
        offset += lineDuration(line.text);
        const side = line.side ?? (align === 'speaker' ? cast[line.who].side : align === 'center' ? 'center' : align);
        return <Bubble key={i} line={line} side={side} delay={delay} instant={instant} />;
      })}
    </div>
  );
}

export function Bubble({ line, side, delay, instant }: { line: Line; side: 'left' | 'right' | 'center'; delay: number; instant: boolean }) {
  const c = cast[line.who];
  return (
    <motion.div
      className={`bubble bubble--${side}`}
      style={{ ['--speaker' as string]: c.color, transformOrigin: side === 'right' ? '90% 100%' : side === 'left' ? '10% 100%' : '50% 100%' }}
      {...enter('pop', delay, instant)}
    >
      <span className="bubble__who">{('short' in c && c.short) || c.name}</span>
      <span className="bubble__text">
        <RichText text={line.text} />
      </span>
    </motion.div>
  );
}

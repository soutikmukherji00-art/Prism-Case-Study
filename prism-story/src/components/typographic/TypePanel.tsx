import { motion } from 'motion/react';
import { useBeat } from '../../engine/BeatContext';
import { enter, useEnter, type EnterName } from '../../motion/presets';
import { Icon, type IconName } from '../primitives/Icon';
import { RichText } from '../primitives/RichText';
import './typographic.css';

export interface TypePanelProps {
  text: string;
  /** Quote attribution or small line under a title. */
  sub?: string;
  variant?: 'quote' | 'title' | 'statement' | 'product' | 'caption' | 'kicker';
  /** 'surface' or 'ink' fills the area (full-bleed typographic panels, P18). */
  bg?: 'none' | 'surface' | 'ink';
  icon?: IconName;
  enter?: EnterName;
  align?: 'center' | 'left';
}

export const typeDuration = (p: TypePanelProps) => (p.variant === 'quote' ? 1.2 : 0.8) + (p.sub ? 0.3 : 0);

/** The document speaking in its own voice: quotes, title beats, product names. */
export function TypePanel({ text, sub, variant = 'statement', bg = 'none', icon, enter: name, align = 'center' }: TypePanelProps) {
  const { start, instant } = useBeat();
  const anim = useEnter(name ?? (variant === 'product' ? 'pop' : variant === 'quote' ? 'blur' : 'rise'), 0, variant === 'quote' ? { duration: 0.9 } : {});
  return (
    <div className={`typepanel typepanel--${variant} typepanel--bg-${bg} typepanel--${align}`}>
      <motion.div className="typepanel__main" {...anim}>
        {icon && <span className="typepanel__icon"><Icon name={icon} size={72} stroke={1.4} /></span>}
        {variant === 'quote' ? <blockquote>“<RichText text={text} />”</blockquote> : <RichText text={text} />}
      </motion.div>
      {sub && (
        <motion.div className="typepanel__sub" {...enter('fade', start + 0.5, instant)}>
          <RichText text={sub} />
        </motion.div>
      )}
    </div>
  );
}

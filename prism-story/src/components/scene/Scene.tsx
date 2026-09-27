import { motion } from 'motion/react';
import { useEnter, type EnterName } from '../../motion/presets';
import { Asset, Placeholder } from '../primitives/Asset';
import './scene.css';

export interface SceneProps {
  /** Asset key suffix: loads `scenes/<id>` when present. */
  id: string;
  /** What the illustrator should draw here. */
  label: string;
  tone?: 'warm' | 'cool' | 'neutral' | 'dark' | 'outdoor';
  enter?: EnterName;
}

/** Full-bleed background for a panel. Placeholder wash + label until art exists. */
export function Scene({ id, label, tone = 'neutral', enter = 'fade' }: SceneProps) {
  const anim = useEnter(enter, 0, { duration: 0.35 });
  return (
    <motion.div className={`scene scene--${tone}`} {...anim}>
      <Asset id={`scenes/${id}`} fallback={<div className="scene__label">SCENE · {label}</div>} />
    </motion.div>
  );
}

export interface FootageProps {
  /** Loads `footage/<asset>` (video or image) when present. */
  asset: string;
  caption: string;
  media?: 'video' | 'photo';
  /** Show a loader spinning longer than it should (P109 — leave it in). */
  rough?: boolean;
  enter?: EnterName;
}

/** Real footage / photograph slot. Deliberately uncaptioned on screen; the caption is for production. */
export function Footage({ asset, caption, media = 'video', rough, enter = 'none' }: FootageProps) {
  const anim = useEnter(enter);
  return (
    <motion.div className="footage" {...anim}>
      <Asset
        id={`footage/${asset}`}
        fallback={<Placeholder stripes label={media === 'video' ? 'Real footage' : 'Real photograph'} detail={`${caption}  ·  footage/${asset}`} />}
      />
      {rough && (
        <div className="footage__loader">
          <motion.div className="footage__spinner" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }} />
        </div>
      )}
    </motion.div>
  );
}

/** Dims whatever is underneath (for cards over a dimmed previous frame, P23). */
export interface DimProps { opacity?: number }
export function Dim({ opacity = 0.55 }: DimProps) {
  const anim = useEnter('fade', 0, { duration: 0.4, to: { opacity } });
  return <motion.div className="dim" {...anim} />;
}

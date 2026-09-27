import { motion } from 'motion/react';
import { useEnter, type EnterName } from '../../motion/presets';
import { cast, type CastId } from '../../story/cast';
import { Asset } from '../primitives/Asset';
import { PlaceholderFigure, type Pose } from './PlaceholderFigure';
import './character.css';

export interface CharacterProps {
  who: CastId;
  pose?: Pose;
  /** Horizontal centre of the figure, 0–100 % of its area. Defaults by cast side. */
  x?: number;
  /** Baseline (feet), 0–100 % from the top of the area. */
  y?: number;
  size?: 's' | 'm' | 'l' | 'xl';
  enter?: EnterName;
  facing?: 'left' | 'right';
  /** Push the figure back (e.g. listeners while someone else talks). */
  dim?: boolean;
  /** Hide the name tag under the placeholder. */
  tag?: boolean;
}

const HEIGHT = { s: 30, m: 46, l: 60, xl: 78 };

/**
 * Character entrance. Art resolves from `characters/<who>/<pose>`, then
 * `characters/<who>/idle`, then the placeholder figure.
 */
export function Character({ who, pose = 'idle', x, y = 100, size = 'm', enter, facing, dim, tag = true }: CharacterProps) {
  const side = cast[who].side;
  const cx = x ?? (side === 'left' ? 28 : 72);
  const entrance: EnterName = enter ?? (cx < 50 ? 'slideLeft' : 'slideRight');
  const anim = useEnter(entrance, 0, dim ? { to: { opacity: 0.45 } } : {});
  const face = facing ?? (cx < 50 ? 'right' : 'left');

  return (
    <motion.div
      className="character"
      style={{ left: `${cx}%`, top: `${y}%`, height: `${HEIGHT[size]}%` }}
      {...anim}
    >
      <div className="character__art">
        <Asset
          id={[`characters/${who}/${pose}`, `characters/${who}/idle`]}
          fit="contain"
          fallback={
            <>
              <PlaceholderFigure who={who} pose={pose} facing={face} />
              {tag && (
                <span className="character__tag" style={{ color: cast[who].color }}>
                  {cast[who].name}
                  {pose !== 'idle' && <em> · {pose}</em>}
                </span>
              )}
            </>
          }
        />
      </div>
    </motion.div>
  );
}

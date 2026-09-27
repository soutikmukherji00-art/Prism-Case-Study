import { cast, type CastId } from '../../story/cast';

export type Pose =
  | 'idle'
  | 'talking'
  | 'phone'
  | 'desk'
  | 'laptop'
  | 'shrug'
  | 'lean'
  | 'arms-folded'
  | 'feet-up'
  | 'gesture'
  | 'hands-apart'
  | 'hat'
  | 'pacing'
  | 'hard-hat'
  | 'still'
  | 'reacting'
  | 'sad'
  | 'pointing'
  | 'from-behind';

/**
 * A deliberately crude stand-in figure: head, body, and one or two props that
 * tell the illustrator which pose the panel needs. Replaced by
 * `characters/<who>/<pose>.png` as soon as that file exists.
 */
export function PlaceholderFigure({ who, pose = 'idle', facing = 'right' }: { who: CastId; pose?: Pose; facing?: 'left' | 'right' }) {
  const c = cast[who];
  const initial = (('short' in c && c.short) || c.name).replace('The ', '').charAt(0);
  const flip = facing === 'left' ? 'scale(-1,1) translate(-120,0)' : undefined;
  const tilt = pose === 'lean' ? 'rotate(-7 60 200)' : pose === 'feet-up' ? 'rotate(8 60 200)' : undefined;
  const mouth = pose === 'reacting' ? <ellipse cx="68" cy="58" rx="4" ry="5" fill="var(--ink)" /> : pose === 'sad' ? <path d="M61 62q7-5 14 0" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" /> : <path d="M61 59q7 4 14 0" stroke="var(--ink)" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  const arm = { stroke: c.color, strokeWidth: 12, strokeLinecap: 'round' as const, fill: 'none' };

  return (
    <svg className="figure" viewBox="0 0 120 210" preserveAspectRatio="xMidYMax meet" aria-label={`${c.name} (${pose})`}>
      <g transform={flip}>
        <g transform={tilt}>
          {pose === 'from-behind' ? (
            <>
              <path d="M22 205 C22 120 30 92 60 92 C90 92 98 120 98 205 Z" fill={c.color} opacity="0.9" />
              <circle cx="60" cy="54" r="30" fill={c.color} opacity="0.75" />
            </>
          ) : (
            <>
              {/* body */}
              <path d="M26 205 C26 124 34 96 60 96 C86 96 94 124 94 205 Z" fill={c.color} opacity="0.88" />
              {/* head */}
              <circle cx="62" cy="52" r="28" fill="var(--surface)" stroke={c.color} strokeWidth="4" />
              <circle cx="54" cy="47" r="3" fill="var(--ink)" />
              <circle cx="72" cy="47" r="3" fill="var(--ink)" />
              {mouth}
            </>
          )}
          {/* pose props */}
          {pose === 'phone' && (<><path d="M88 150 L96 110 L84 72" {...arm} /><rect x="78" y="44" width="14" height="26" rx="3" fill="var(--ink)" /></>)}
          {pose === 'shrug' && (<><path d="M30 140 L10 112 L20 90" {...arm} /><path d="M90 140 L110 112 L100 90" {...arm} /></>)}
          {pose === 'hands-apart' && (<><path d="M30 140 L4 124" {...arm} /><path d="M90 140 L116 124" {...arm} /></>)}
          {pose === 'gesture' && <path d="M90 140 L114 116" {...arm} />}
          {pose === 'pointing' && <path d="M90 130 L118 104" {...arm} />}
          {pose === 'arms-folded' && <rect x="30" y="128" width="60" height="16" rx="8" fill={c.color} stroke="var(--surface)" strokeWidth="2" />}
          {(pose === 'laptop' || pose === 'desk') && <><rect x="14" y="150" width="92" height="8" rx="2" fill="var(--ink)" opacity="0.8" /><rect x="30" y="112" width="60" height="40" rx="3" fill="var(--ink-3)" /></>}
          {pose === 'hat' && <><path d="M30 34 C30 14 94 14 94 34 Z" fill="var(--ink-2)" /><rect x="22" y="31" width="80" height="7" rx="3.5" fill="var(--ink)" /></>}
          {pose === 'hard-hat' && <><path d="M32 38 C32 12 92 12 92 38 Z" fill="var(--amber)" /><rect x="26" y="35" width="72" height="6" rx="3" fill="var(--amber)" /></>}
          {pose === 'feet-up' && <path d="M40 200 L100 176" stroke={c.color} strokeWidth="14" strokeLinecap="round" />}
        </g>
      </g>
      {pose !== 'from-behind' && (
        <text x="60" y="165" textAnchor="middle" fontSize="28" fontWeight="700" fill="var(--surface)" fontFamily="var(--font-display)">{initial}</text>
      )}
    </svg>
  );
}

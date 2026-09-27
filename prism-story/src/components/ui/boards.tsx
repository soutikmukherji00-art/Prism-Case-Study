import { motion } from 'motion/react';
import { useState } from 'react';
import { useBeat } from '../../engine/BeatContext';
import { enter, paced, useEnter } from '../../motion/presets';
import { Placeholder } from '../primitives/Asset';
import { Icon, type IconName } from '../primitives/Icon';
import { RichText } from '../primitives/RichText';
import { Window } from './Window';

/* ───────── Whiteboard: ideas written, then struck through (P68–73) ───────── */
export interface WhiteboardProps {
  heading?: string;
  items: { text: string; state?: 'plain' | 'struck' | 'struck2' }[];
  /** What happens to the LAST item on this panel. Earlier items render in their final state. */
  animate?: 'write' | 'strike' | 'strike2' | 'none';
}
export const whiteboardDuration = (p: WhiteboardProps) => (p.animate === 'strike2' ? 1.6 : 1.0);

export function Whiteboard({ heading, items, animate = 'write' }: WhiteboardProps) {
  const { start, instant } = useBeat();
  const last = items.length - 1;
  return (
    <motion.div className="board" {...useEnter('fade', 0, { duration: 0.3 })}>
      {heading && <div className="board__h">{heading}</div>}
      {items.map((it, i) => {
        const isLast = i === last;
        const writes = isLast && animate === 'write';
        const strikes = it.state === 'struck' || it.state === 'struck2';
        const animStrike1 = isLast && (animate === 'strike' || animate === 'strike2');
        const animStrike2 = isLast && animate === 'strike2';
        const lineAnim = (delay: number, animated: boolean) =>
          animated && !instant ? { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { delay: start + paced(delay), duration: 0.45 } } : { initial: false as const, animate: { scaleX: 1 } };
        return (
          <motion.div key={i} className="board__item" {...(writes ? enter('blur', start + 0.3, instant) : { initial: false })}>
            <RichText text={it.text} />
            {strikes && <motion.span className="board__strike" style={{ top: '52%' }} {...lineAnim(0.4, animStrike1)} />}
            {it.state === 'struck2' && <motion.span className="board__strike" style={{ top: '38%', rotate: -3 }} {...lineAnim(1.0, animStrike2)} />}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ───────── DetectiveBoard: photos, string, pins (P64) ───────── */
export interface DetectiveBoardProps { items: string[] }
export function DetectiveBoard({ items }: DetectiveBoardProps) {
  const { start, instant } = useBeat();
  const pos = [[8, 10], [40, 6], [72, 12], [18, 52], [52, 48], [78, 56]];
  return (
    <motion.div className="cork" {...useEnter('fade')}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {items.slice(1).map((_, i) => {
          const [x1, y1] = pos[i % pos.length], [x2, y2] = pos[(i + 1) % pos.length];
          return <motion.line key={i} x1={x1 + 8} y1={y1 + 2} x2={x2 + 8} y2={y2 + 2} stroke="var(--red)" strokeWidth="0.4" initial={instant ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: instant ? 0 : start + 0.6 + i * 0.2, duration: 0.5 }} />;
        })}
      </svg>
      {items.map((t, i) => (
        <motion.div key={i} className="cork__card" style={{ left: `${pos[i % pos.length][0]}%`, top: `${pos[i % pos.length][1]}%`, rotate: (i % 2 ? 3 : -3) }} {...enter('pop', start + 0.1 + i * 0.15, instant)}>
          <span className="cork__pin" />
          <RichText text={t} />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ───────── Flow: nodes and arrows (P7 quote→PO, P88 one handle) ───────── */
export interface FlowProps {
  nodes: { label: string; sub?: string; icon?: IconName }[];
  arrows?: 'right' | 'both';
  caption?: string;
}
export const flowDuration = (p: FlowProps) => 0.4 + p.nodes.length * 0.5 + (p.caption ? 0.4 : 0);
export function Flow({ nodes, arrows = 'right', caption }: FlowProps) {
  const { start, instant } = useBeat();
  return (
    <div className="ui-fill">
      <div className="flow">
        {nodes.map((n, i) => (
          <div key={i} style={{ display: 'contents' }}>
            {i > 0 && <motion.span className="flow__arrow" {...enter('fade', start + i * 0.5, instant)}>{arrows === 'both' ? '⇄' : '→'}</motion.span>}
            <motion.div className="flow__node" {...enter('pop', start + 0.2 + i * 0.5, instant)}>
              {n.icon && <Icon name={n.icon} size={34} stroke={1.5} />}
              <span className="flow__label"><RichText text={n.label} /></span>
              {n.sub && <span className="flow__sub"><RichText text={n.sub} /></span>}
            </motion.div>
          </div>
        ))}
      </div>
      {caption && <motion.div className="flow__caption" {...enter('fade', start + 0.4 + nodes.length * 0.5, instant)}><RichText text={caption} /></motion.div>}
    </div>
  );
}

/* ───────── ScreensRow: several small screens side by side (P102) ───────── */
export interface ScreensRowProps { items: { title: string; body: string; icon?: IconName }[] }
export const screensRowDuration = (p: ScreensRowProps) => 0.4 + p.items.length * 0.35;
export function ScreensRow({ items }: ScreensRowProps) {
  const { start, instant } = useBeat();
  return (
    <div className="screens">
      {items.map((it, i) => (
        <motion.div key={i} className="minis" {...enter('rise', start + 0.1 + i * 0.35, instant)}>
          <div className="minis__t">{it.icon && <Icon name={it.icon} size={14} />}{it.title}</div>
          <div className="minis__b"><RichText text={it.body} /></div>
          <div className="skel skel--w80" /><div className="skel skel--w60" />
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── Gallery: the screens, properly (P150) ───────── */
export interface GalleryProps { items: string[] }
export function Gallery({ items }: GalleryProps) {
  const { start, instant } = useBeat();
  return (
    <div className="gallery">
      {items.map((it, i) => (
        <motion.div key={it} {...enter('rise', start + i * 0.15, instant)}>
          <Placeholder label={it} detail={`gallery/${it.toLowerCase().replace(/\W+/g, '-')}`} />
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── DeviceCompare: the same list on a MacBook and on her Dell (P123) ───────── */
export interface DeviceCompareProps {
  rows: string[];
  left: { label: string; visible: number };
  right: { label: string; visible: number };
}
export function DeviceCompare({ rows, left, right }: DeviceCompareProps) {
  const { start, instant } = useBeat();
  const dev = (d: { label: string; visible: number }, w: number, i: number) => (
    <motion.div className="device" {...enter('rise', start + i * 0.3, instant)}>
      <div className="device__screen" style={{ width: w, height: d.visible * 31 + 40 }}>
        <div className="device__row" style={{ fontWeight: 700 }}>Add member</div>
        {rows.slice(0, d.visible).map((r) => <div key={r} className="device__row">{r}</div>)}
      </div>
      <span className="device__label">{d.label} · {d.visible} of {rows.length} visible</span>
    </motion.div>
  );
  return <div className="devices">{dev(left, 260, 0)}{dev(right, 190, 1)}</div>;
}

/* ───────── PersonaToggle: one prototype, four roles — interactive (P108) ───────── */
export interface PersonaToggleProps { options: string[]; views: Record<string, string> }
export function PersonaToggle({ options, views }: PersonaToggleProps) {
  const [on, setOn] = useState(options[0]);
  return (
    <motion.div className="persona" {...useEnter('rise')}>
      <div className="persona__toggle" onClick={(e) => e.stopPropagation()}>
        {options.map((o) => (
          <button key={o} className={`persona__opt${o === on ? ' persona__opt--on' : ''}`} onClick={() => setOn(o)}>{o}</button>
        ))}
      </div>
      <div className="persona__hint">Click a role to switch the prototype</div>
      <div className="persona__view">
        <motion.div key={on} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ height: '100%' }}>
          <Window app="Prototype" title={`Signed in as ${on}`}>
            <div className="field__label" style={{ fontWeight: 500 }}><RichText text={views[on] ?? ''} /></div>
            {[80, 60, 70].map((w, i) => <div key={i} className="skel" style={{ width: `${w}%` }} />)}
          </Window>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ───────── IconMark: one big symbol (P24 magnifier, P76 lightbulb) ───────── */
export interface IconMarkProps { icon: IconName; label?: string; size?: number }
export function IconMark({ icon, label, size = 120 }: IconMarkProps) {
  return (
    <motion.div className="ui-center" {...useEnter('pop')}>
      <div className="iconmark">
        <Icon name={icon} size={size} stroke={1.2} />
        {label && <span>{label}</span>}
      </div>
    </motion.div>
  );
}

import { animate, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useBeat, useReached, useStepper } from '../../engine/BeatContext';
import { enter, paced } from '../../motion/presets';
import { Chip, type ChipTone } from '../primitives/Chip';
import { Icon } from '../primitives/Icon';
import { RichText } from '../primitives/RichText';
import { Typewriter, typingDuration } from '../primitives/Typewriter';
import { UIEnter, Window } from './Window';

/* ───────── List: generic table — inbox, seller quotes, member search, ranked sellers ───────── */
export interface ListRow {
  cells: string[];
  sub?: string;
  chip?: { label: string; tone?: ChipTone };
  /** Hover card lines (P121). Hover the row to see it; `autoHover` opens it on the timeline. */
  hover?: string[];
}
export interface ListProps {
  title: string;
  app?: string;
  columns?: string[];
  rows: ListRow[];
  /** Rows after this index fall below the fold (P122). */
  cutoffAfter?: number;
  highlight?: number;
  /** A filter chip that gets "applied" — and changes nothing (P44). */
  filter?: string;
  autoHover?: number;
}
export const listDuration = (p: ListProps) => 0.6 + p.rows.length * 0.1 + (p.filter ? 0.8 : 0) + (p.autoHover != null ? 0.9 : 0);

export function List({ title, app = 'Pluto', columns, rows, cutoffAfter, highlight, filter, autoHover }: ListProps) {
  const { start, instant } = useBeat();
  const filterOn = useReached(0.8);
  const autoOpen = useReached(0.9 + rows.length * 0.1);
  const [hovered, setHovered] = useState<number | null>(null);
  const openRow = hovered ?? (autoHover != null && autoOpen ? autoHover : null);
  return (
    <UIEnter>
      <Window app={app} title={title}>
        {filter && (
          <div className="filterbar">
            <Icon name="filter" size={16} /> Filter:
            <Chip tone={filterOn ? 'info' : 'neutral'}>{filter}{filterOn ? ' ✓' : ''}</Chip>
          </div>
        )}
        <div style={{ position: 'relative' }}>
          <table className="tbl">
            {columns && <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>}
            <tbody>
              {rows.map((r, i) => (
                <motion.tr
                  key={i}
                  className={`${i === highlight ? 'tbl__row--hl' : ''} ${cutoffAfter != null && i > cutoffAfter ? 'tbl__row--cut' : ''}`}
                  {...enter('fade', start + 0.3 + i * 0.1, instant)}
                  onMouseEnter={() => r.hover && setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: r.hover ? 'help' : undefined }}
                >
                  {r.cells.map((c, j) => (
                    <td key={j}>
                      <RichText text={c} />
                      {j === 0 && r.sub && <span className="tbl__sub">{r.sub}</span>}
                    </td>
                  ))}
                  {r.chip && <td style={{ textAlign: 'right' }}><Chip tone={r.chip.tone}>{r.chip.label}</Chip></td>}
                </motion.tr>
              ))}
            </tbody>
          </table>
          {cutoffAfter != null && <div className="fold" style={{ top: `${((cutoffAfter + 1.6) / (rows.length + 1)) * 100}%` }}>Below the fold on her screen</div>}
          {openRow != null && rows[openRow]?.hover && (
            <motion.div className="hovercard" style={{ left: '38%', top: `${((openRow + 1.5) / (rows.length + 1)) * 100}%` }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <strong>{rows[openRow].cells[0]}</strong>
              {rows[openRow].hover!.map((h) => <div key={h}><RichText text={h} /></div>)}
            </motion.div>
          )}
        </div>
      </Window>
    </UIEnter>
  );
}

/* ───────── Search: search, results, pick one, counter (P41–42) ───────── */
export interface SearchProps { query: string; results: string[]; picked?: number; counter?: string; app?: string; typeIt?: boolean }
export const searchDuration = (p: SearchProps) => 0.6 + (p.typeIt === false ? 0 : typingDuration(p.query)) + 1.2;
export function Search({ query, results, picked, counter, app = 'Pluto', typeIt = true }: SearchProps) {
  const t = typeIt ? typingDuration(query) : 0;
  const showResults = useReached(0.5 + t);
  const pick = useReached(1.0 + t);
  const count = useReached(1.4 + t);
  return (
    <UIEnter>
      <Window app={app} title="Add line items" tools={counter && count ? <Chip tone="ink">{counter}</Chip> : undefined}>
        <div className="search"><Icon name="search" size={18} />{typeIt ? <Typewriter text={query} offset={0.4} /> : query}</div>
        {showResults && (
          <div className="results">
            {results.map((r, i) => (
              <motion.div key={r} className={pick && i === picked ? 'picked' : ''} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}>
                <span>{r}</span>{pick && i === picked && <span style={{ font: '700 12px var(--font-mono)' }}>ADDED</span>}
              </motion.div>
            ))}
          </div>
        )}
      </Window>
    </UIEnter>
  );
}

/* ───────── Counter: a number running from→to, with a clock sliding forward (P43, P96) ───────── */
export interface CounterProps {
  from: number;
  to: number;
  total: number;
  label?: string;
  duration?: number;
  timeFrom?: string;
  timeTo?: string;
  /** Blurred rows scrolling behind, to read as repetitive labour. */
  blur?: boolean;
  /** Faded, behind other text (P46). */
  ghost?: boolean;
}
export const counterDuration = (p: CounterProps) => (p.ghost ? 0.4 : 0.4 + (p.duration ?? 2.4));

const toMin = (t: string) => {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = +m[1] % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + +m[2];
};
const fromMin = (x: number) => {
  const h = Math.floor(x / 60), mm = Math.round(x % 60);
  return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

export function Counter({ from, to, total, label = 'OF', duration = 2.4, timeFrom, timeTo, blur, ghost }: CounterProps) {
  const { start, instant } = useBeat();
  const [v, setV] = useState(instant || ghost ? to : from);
  useEffect(() => {
    if (instant || ghost) {
      setV(to);
      return;
    }
    setV(from);
    const ctl = animate(from, to, { delay: start + paced(0.4), duration: paced(duration), ease: [0.5, 0, 0.3, 1], onUpdate: setV });
    return () => ctl.stop();
  }, [from, to, duration, start, instant, ghost]);
  const progress = to === from ? 1 : (v - from) / (to - from);
  const time = timeFrom && timeTo ? fromMin(toMin(timeFrom) + (toMin(timeTo) - toMin(timeFrom)) * progress) : null;
  return (
    <div className="ui-center" style={{ opacity: ghost ? 0.12 : 1 }}>
      {blur && !ghost && (
        <motion.div className="blurlist" animate={instant ? {} : { y: [0, -400] }} transition={{ delay: start, duration: paced(duration), ease: 'linear' }}>
          {Array.from({ length: 30 }, (_, i) => <div key={i} style={{ width: `${50 + ((i * 37) % 40)}%` }} />)}
        </motion.div>
      )}
      <div className="counter">
        {Math.round(v)} {label} {total}
        {time && <small><span className="counter__time">{time}</span></small>}
      </div>
    </div>
  );
}

/* ───────── Cart: a count and nothing else (P45) ───────── */
export interface CartProps { count: number; note?: string; app?: string }
export function Cart({ count, note = 'You have 26 items in your cart.', app = 'Pluto' }: CartProps) {
  const open = useReached(0.6);
  return (
    <UIEnter>
      <Window app={app} title="Add line items">
        <div className="cart">
          <span className="cart__btn"><Icon name="cart" size={18} />Cart <span className="cart__badge">{count}</span></span>
          {open && <motion.div className="cart__drop" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>{note}</motion.div>}
        </div>
        {[80, 60, 70, 50].map((w, i) => <div key={i} className="skel" style={{ width: `${w}%` }} />)}
      </Window>
    </UIEnter>
  );
}

/* ───────── StatusCard: an inquiry and its status chip, which may change (P50, P61, P140) ───────── */
export interface StatusCardProps {
  title: string;
  label: string;
  tone?: ChipTone;
  /** Chip shown first; switches to `label` after `changeAt` seconds. */
  prev?: string;
  prevTone?: ChipTone;
  changeAt?: number;
  sub?: string;
  app?: string;
}
export const statusDuration = (p: StatusCardProps) => 0.7 + (p.prev ? (p.changeAt ?? 0.9) + 0.4 : 0);
export function StatusCard({ title, label, tone = 'neutral', prev, prevTone = 'waiting', changeAt = 0.9, sub, app = 'Pluto' }: StatusCardProps) {
  const changed = useReached(changeAt);
  const showPrev = prev && !changed;
  return (
    <UIEnter>
      <Window app={app} title="Inquiries">
        <div className="status">
          <div className="status__title"><RichText text={title} /></div>
          {sub && <div className="status__sub">{sub}</div>}
          <motion.div key={showPrev ? 'prev' : 'now'} initial={prev && !showPrev ? { scale: 1.4, opacity: 0 } : false} animate={{ scale: 1, opacity: 1 }}>
            <Chip tone={showPrev ? prevTone : tone}>{showPrev ? prev : label}</Chip>
          </motion.div>
        </div>
      </Window>
    </UIEnter>
  );
}

/* ───────── Clock (P52–54, P57) ───────── */
export interface ClockProps { time: string; caption?: string }
export function Clock({ time, caption }: ClockProps) {
  const { start, instant } = useBeat();
  const mins = toMin(time);
  const hAngle = ((mins / 60) % 12) * 30;
  const mAngle = (mins % 60) * 6;
  return (
    <motion.div className="ui-center" {...enter('pop', start, instant)}>
      <div className="clock">
        <div className="clock__face">
          <motion.div className="clock__hand" style={{ width: 6, height: 62, marginLeft: -3 }} initial={instant ? false : { rotate: hAngle - 30 }} animate={{ rotate: hAngle }} transition={{ delay: instant ? 0 : start + 0.2, duration: instant ? 0 : 0.8 }} />
          <motion.div className="clock__hand" style={{ width: 4, height: 92, marginLeft: -2 }} initial={instant ? false : { rotate: mAngle - 360 }} animate={{ rotate: mAngle }} transition={{ delay: instant ? 0 : start + 0.2, duration: instant ? 0 : 0.8 }} />
        </div>
        <div className="clock__digital">{time}</div>
        {caption && <div className="clock__cap"><RichText text={caption} /></div>}
      </div>
    </motion.div>
  );
}

/* ───────── Summary: line items and prices (P57–58, P128) ───────── */
export interface SummaryProps {
  title: string;
  rows: { item: string; qty?: string; price?: string }[];
  /** Sweep a highlight down the rows, reading across (P58). */
  scan?: boolean;
  more?: string;
  app?: string;
}
export const summaryDuration = (p: SummaryProps) => 0.7 + (p.scan ? p.rows.length * 0.45 : 0);
export function Summary({ title, rows, scan, more, app = 'Pluto' }: SummaryProps) {
  const n = useStepper(scan ? rows.length : 0, 0.45, 0.6);
  return (
    <UIEnter>
      <Window app={app} title={title}>
        <table className="tbl">
          <thead><tr><th>Line item</th><th>Qty</th><th style={{ textAlign: 'right' }}>Rate</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={scan && i === n - 1 ? 'tbl__row--hl' : ''}>
                <td>{r.item}</td><td>{r.qty ?? ''}</td>
                <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{r.price ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {more && <div className="field__step">{more}</div>}
      </Window>
    </UIEnter>
  );
}

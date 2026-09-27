import { motion } from 'motion/react';
import { Icon } from '../components/primitives/Icon';
import type { ActMeta, Panel } from './types';

/** On-screen arrows. The next arrow breathes once the panel has settled. */
export function NavArrows({ index, total, settled, onPrev, onNext }: { index: number; total: number; settled: boolean; onPrev: () => void; onNext: () => void }) {
  return (
    <>
      <button className="nav nav--prev" onClick={onPrev} disabled={index === 0} aria-label="Previous panel">
        <Icon name="arrowLeft" size={26} />
      </button>
      <motion.button
        className="nav nav--next"
        onClick={onNext}
        disabled={index === total - 1 && settled}
        aria-label="Next panel"
        animate={settled && index < total - 1 ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={settled ? { repeat: Infinity, duration: 1.8, repeatDelay: 1.2 } : { duration: 0.2 }}
      >
        <Icon name="arrowRight" size={26} />
      </motion.button>
      {index === 0 && (
        <div className="nav__hint">
          <kbd>←</kbd> <kbd>→</kbd> or <kbd>space</kbd> to move through the story
        </div>
      )}
    </>
  );
}

/** Bottom bar: act segments (click to jump), counter, and dev shortcuts. */
export function ProgressBar({ panels, acts, index, onJump, onDev, height }: { panels: Panel[]; acts: ActMeta[]; index: number; onJump: (i: number) => void; onDev: () => void; height: number }) {
  const current = panels[index];
  const act = acts.find((a) => a.id === current.act);
  return (
    <div className="bar" style={{ height }}>
      <div className="bar__act">{act?.title}{current.movement ? <span> · {current.movement}</span> : null}</div>
      <div className="bar__track">
        {acts.map((a) => {
          const idx = panels.map((p, i) => (p.act === a.id ? i : -1)).filter((i) => i >= 0);
          if (!idx.length) return null;
          const first = idx[0], last = idx[idx.length - 1];
          const fill = index < first ? 0 : index > last ? 1 : (index - first + 1) / idx.length;
          return (
            <div
              key={a.id}
              className="bar__seg"
              style={{ flex: idx.length }}
              title={a.title}
              onClick={(e) => {
                const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                onJump(first + Math.floor(((e.clientX - r.left) / r.width) * idx.length));
              }}
            >
              <div className="bar__fill" style={{ width: `${fill * 100}%` }} />
              <span className="bar__segLabel">{a.short}</span>
            </div>
          );
        })}
      </div>
      <div className="bar__count">{index + 1} / {panels.length}</div>
      <div className="bar__tools">
        <a href="#/board" title="Storyboard (G)">Storyboard</a>
        <a href="#/assets" title="Asset checklist">Assets</a>
        <button onClick={onDev} title="Dev overlay (D)">Dev</button>
      </div>
    </div>
  );
}

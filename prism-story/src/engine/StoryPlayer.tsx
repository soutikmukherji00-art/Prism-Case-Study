import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CallTally, Marker } from '../components/hud/Marker';
import { DevOverlay } from './DevOverlay';
import { NavArrows, ProgressBar } from './Chrome';
import { CANVAS, CanvasProvider } from './CanvasContext';
import { computeHud } from './hud';
import { PanelView } from './PanelView';
import type { ActMeta, Panel } from './types';
import { useStoryNav } from './useStoryNav';
import './player.css';

const BAR_H = 52;

export function StoryPlayer({ panels, acts }: { panels: Panel[]; acts: ActMeta[] }) {
  const nav = useStoryNav(panels);
  const hud = useMemo(() => computeHud(panels), [panels]);
  const h = hud[nav.index];
  const [dev, setDev] = useState(false);

  const areaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: window.innerWidth, h: window.innerHeight - BAR_H });
  useLayoutEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scale = Math.min(box.w / CANVAS.w, box.h / CANVAS.h);
  const band = h.frame === 'band';

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D') setDev((v) => !v);
      if (e.key === 'g' || e.key === 'G') window.location.hash = '#/board';
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const transition = nav.instant ? 'cut' : (nav.panel.transition ?? 'fade');

  return (
    <div className={`player${band ? ' player--band' : ''}`}>
      <div className="player__area" ref={areaRef}>
        <motion.div
          className="player__frame"
          initial={false}
          animate={band ? { width: CANVAS.w * scale * 0.84, height: CANVAS.h * scale * 0.84, borderRadius: 6 } : { width: box.w, height: box.h, borderRadius: 0 }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="player__canvas" ref={canvasRef} style={{ width: CANVAS.w, height: CANVAS.h, transform: `translate(-50%, -50%) scale(${band ? scale * 0.84 : scale})` }}>
            <CanvasProvider value={{ ref: canvasRef, scale: band ? scale * 0.84 : scale }}>
              <AnimatePresence custom={transition} initial={false}>
                <PanelView key={`${nav.panel.id}:${nav.nonce}`} panel={nav.panel} instant={nav.instant} />
              </AnimatePresence>
              <Marker state={h.marker} />
              <CallTally n={h.tally} />
            </CanvasProvider>
          </div>
        </motion.div>
        <NavArrows index={nav.index} total={nav.total} settled={nav.settled} onPrev={nav.prev} onNext={nav.next} />
      </div>
      <ProgressBar panels={panels} acts={acts} index={nav.index} onJump={(i) => nav.go(i, true)} onDev={() => setDev((v) => !v)} height={BAR_H} />
      {dev && <DevOverlay panel={nav.panel} index={nav.index} hud={h} settled={nav.settled} />}
    </div>
  );
}

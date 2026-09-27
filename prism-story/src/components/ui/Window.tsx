import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useBeat } from '../../engine/BeatContext';
import { paced, useEnter } from '../../motion/presets';
import { Icon } from '../primitives/Icon';
import './ui.css';

/** Shared app-window chrome for every product screen. Not a layer by itself. */
export function Window({ app, title, children, tools }: { app?: string; title?: string; children: ReactNode; tools?: ReactNode }) {
  return (
    <div className="win">
      <div className="win__bar">
        <span className="win__dots"><i /><i /><i /></span>
        {app && <span className="win__app">{app}</span>}
        <span className="win__title">{title}</span>
        {tools && <span className="win__tools">{tools}</span>}
      </div>
      <div className="win__body">{children}</div>
    </div>
  );
}

/** Standard entrance wrapper for UI layers. */
export function UIEnter({ children, center }: { children: ReactNode; center?: boolean }) {
  const anim = useEnter('rise');
  return (
    <motion.div className={center ? 'ui-center' : 'ui-fill'} {...anim}>
      {children}
    </motion.div>
  );
}

export interface AppWindowProps {
  app: string;
  title: string;
  /** Zoom a focus ring onto the tiny plus in the toolbar (P28). */
  focus?: 'plus';
}

/** The old tool's dashboard, rebuilt clean (P27–28). */
export function AppWindow({ app, title, focus }: AppWindowProps) {
  const { start, instant } = useBeat();
  return (
    <UIEnter>
      <Window
        app={app}
        title={title}
        tools={
          <>
            <span className="skel" style={{ width: 60, height: 10 }} />
            <span className="dash__plus">
              <Icon name="plus" size={12} />
              {focus === 'plus' && (
                <motion.span
                  className="ring"
                  initial={instant ? false : { scale: 6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: instant ? 0 : start + paced(0.4), duration: instant ? 0 : 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                />
              )}
            </span>
          </>
        }
      >
        <div className="dash">
          <div className="dash__side">
            {[60, 80, 50, 70, 40].map((w, i) => <div key={i} className="skel" style={{ width: `${w}%` }} />)}
          </div>
          <div className="dash__main">
            {Array.from({ length: 6 }, (_, i) => <div key={i} className="dash__card" />)}
          </div>
        </div>
      </Window>
    </UIEnter>
  );
}

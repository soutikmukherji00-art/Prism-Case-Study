import { motion } from 'motion/react';
import { theme } from '../theme';
import { BeatProvider } from './BeatContext';
import { LayerList } from './LayerList';
import type { Panel } from './types';

type Kind = NonNullable<Panel['transition']>;

/** Panel-to-panel transition. `custom` comes from AnimatePresence = the INCOMING panel's transition. */
const variants = {
  initial: (k: Kind) => ({ opacity: k === 'fade' ? 0 : 1 }),
  animate: { opacity: 1, transition: { duration: theme.motion.panelFade } },
  exit: (k: Kind) => ({ opacity: 0, transition: { duration: k === 'fade' ? theme.motion.panelFade : 0 } }),
};

export function PanelView({ panel, instant }: { panel: Panel; instant: boolean }) {
  const moodDelay = instant ? 0 : (panel.moodAt ?? 0.6) * theme.motion.pace;
  const cam = panel.camera;
  const camTarget = { scale: cam?.zoom ?? 1, x: cam?.x ?? 0, y: cam?.y ?? 0 };
  return (
    <motion.div className="panel" variants={variants} initial="initial" animate="animate" exit="exit" data-panel={panel.id}>
      <motion.div
        className="panel__camera"
        initial={cam?.push && !instant ? { scale: 1, x: 0, y: 0 } : false}
        animate={camTarget}
        transition={{ duration: 1.2, ease: [0.3, 0.7, 0.2, 1] }}
      >
        <motion.div
          className="panel__mood"
          initial={false}
          animate={{ filter: panel.mood === 'desaturate' ? 'grayscale(1) contrast(0.9)' : 'grayscale(0) contrast(1)' }}
          transition={{ delay: moodDelay, duration: instant ? 0 : 1.2 }}
        >
          <BeatProvider value={{ start: 0, instant }}>
            <LayerList layers={panel.layers} />
          </BeatProvider>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

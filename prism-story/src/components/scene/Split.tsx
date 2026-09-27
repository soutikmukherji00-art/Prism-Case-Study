import { LayerList } from '../../engine/LayerList';
import { useBeat } from '../../engine/BeatContext';
import { listDuration } from '../../engine/timeline';
import type { Layer } from '../../engine/types';
import './scene.css';

export interface SplitProps {
  left: Layer[];
  right: Layer[];
  /** Share of the width given to the left half. */
  ratio?: number;
  divider?: boolean;
}

/**
 * The split-frame grammar (P6, P55, P59, P130). Each half is its own mini
 * canvas: child layers use areas relative to their half. Both halves start
 * with the split itself.
 */
export function Split({ left, right, ratio = 0.5, divider = true }: SplitProps) {
  const { start } = useBeat();
  return (
    <div className="split">
      <div className="split__half" style={{ width: `${ratio * 100}%` }}>
        <LayerList layers={left} base={start} />
      </div>
      {divider && <div className="split__divider" />}
      <div className="split__half" style={{ flex: 1 }}>
        <LayerList layers={right} base={start} />
      </div>
    </div>
  );
}

export const splitDuration = (p: SplitProps): number => Math.max(listDuration(p.left), listDuration(p.right));

/** Several layers treated as one unit (placed together, timed together). */
export interface GroupProps { layers: Layer[] }
export function Group({ layers }: GroupProps) {
  const { start } = useBeat();
  return (
    <div className="group">
      <LayerList layers={layers} base={start} />
    </div>
  );
}

export const groupDuration = (p: GroupProps): number => listDuration(p.layers);

import { useMemo } from 'react';
import { layers as registry } from '../layers';
import { resolveArea } from './areas';
import { BeatProvider, useBeat } from './BeatContext';
import type { LayerDef } from './registry';
import { layoutLayers } from './timeline';
import type { Layer } from './types';

/**
 * Renders a list of layers: places each in its area and hands it a Beat
 * (its start time on the panel timeline). Used by panels and, recursively,
 * by container layers such as `split` and `group`.
 */
export function LayerList({ layers, base = 0 }: { layers: Layer[]; base?: number }) {
  const { instant } = useBeat();
  const { starts } = useMemo(() => layoutLayers(layers, base), [layers, base]);
  return (
    <>
      {layers.map((layer, i) => (
        <LayerSlot key={layer.key ?? `${layer.kind}-${i}`} layer={layer} start={starts[i]} instant={instant} />
      ))}
    </>
  );
}

function LayerSlot({ layer, start, instant }: { layer: Layer; start: number; instant: boolean }) {
  const def = registry[layer.kind] as unknown as LayerDef<Record<string, unknown>>;
  // Strip engine-only fields; everything else is the component's props.
  const { kind, at, after, sync, hold, area, key, ...props } = layer as Layer & Record<string, unknown>;
  const [x, y, w, h] = resolveArea(area, def.area);
  const Component = def.component;
  return (
    <div className={`layer layer--${kind}`} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}>
      <BeatProvider value={{ start, instant }}>
        <Component {...props} />
      </BeatProvider>
    </div>
  );
}

import type { FC } from 'react';
import type { Area } from './areas';

/**
 * A layer definition couples a component with the two things the engine needs
 * to know about it without rendering it: how long its entrance takes (for the
 * panel timeline) and where it sits by default.
 */
export interface LayerDef<P> {
  component: FC<P>;
  duration: (props: P) => number;
  area: Area;
  /** Phantom field: carries the prop type so the story schema can be derived from the registry. */
  readonly __props: P;
}

export function defineLayer<P>(
  component: FC<P>,
  opts: { duration?: number | ((props: P) => number); area?: Area } = {},
): LayerDef<P> {
  const d = opts.duration ?? 0.6;
  return {
    component,
    duration: typeof d === 'number' ? () => d : d,
    area: opts.area ?? 'full',
    __props: undefined as unknown as P,
  };
}

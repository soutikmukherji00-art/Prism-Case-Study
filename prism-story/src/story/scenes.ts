import { scene } from './dsl';

/**
 * Recurring locations. Each maps to `scenes/<id>` in the asset folder.
 * Reuse these rather than inventing new ids so one background covers many panels.
 */
export const S = {
  office: () => scene('office', 'Birla Pivot office — two designers at a desk, window behind, two laptops, a cup', 'warm'),
  bdmDesk: () => scene('bdm-desk', 'The BDM’s desk — loose linework, unfussy', 'warm'),
  bdmDeskEmpty: () => scene('bdm-desk-empty', 'The same desk, empty. Laptop closed. He has gone home', 'neutral'),
  site: () => scene('site', 'A site / buyer’s yard — dust, TMT steel stacked, no desk in sight', 'outdoor'),
  cmDesk: () => scene('cm-desk', 'Category Manager at the office — two monitors', 'cool'),
  canteen: () => scene('canteen', 'Office canteen, wide — trays, busy, unremarkable Tuesday', 'warm'),
  karishmaDesk: () => scene('karishma-desk', 'Karishma at her computer', 'neutral'),
  whiteboard: () => scene('whiteboard-room', 'Meeting room with a whiteboard', 'neutral'),
  studio: () => scene('studio', 'Plain ground for charts and cards', 'neutral'),
};

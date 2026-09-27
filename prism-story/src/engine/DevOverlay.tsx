import type { HudState } from './hud';
import { layoutLayers, panelDuration } from './timeline';
import type { Panel } from './types';

/** Press D. Everything you need when re-cutting the story: ids, script refs, notes, timeline. */
export function DevOverlay({ panel, index, hud, settled }: { panel: Panel; index: number; hud: HudState; settled: boolean }) {
  const { starts } = layoutLayers(panel.layers);
  return (
    <aside className="dev">
      <div className="dev__row"><b>#{index + 1}</b> <code>{panel.id}</code>{panel.ref != null && <span> · script P{panel.ref}</span>}</div>
      <div className="dev__title">{panel.title}</div>
      <div className="dev__muted">{panel.act} · {panel.movement}</div>
      {panel.notes && <p className="dev__notes">{panel.notes}</p>}
      <div className="dev__h">Timeline · {panelDuration(panel).toFixed(2)}s {settled ? '✓ settled' : '… animating'}</div>
      <ol className="dev__layers">
        {panel.layers.map((l, i) => (
          <li key={i}><code>{starts[i].toFixed(2)}s</code> {l.kind}{'who' in l ? ` (${String(l.who)})` : ''}{l.area ? ` @${typeof l.area === 'string' ? l.area : 'custom'}` : ''}</li>
        ))}
      </ol>
      <div className="dev__h">HUD</div>
      <div className="dev__muted">
        marker {hud.marker.visible ? `${hud.marker.m}/${hud.marker.a}` : 'hidden'}
        {hud.marker.frozen ? ' · frozen' : ''}{hud.marker.onChart ? ' · on chart' : ''}{hud.marker.named ? ' · named' : ''}
        {' · '}tally {hud.tally ?? '—'} · frame {hud.frame}
      </div>
    </aside>
  );
}

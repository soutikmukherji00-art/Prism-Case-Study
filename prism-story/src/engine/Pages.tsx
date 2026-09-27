import { assetUrl } from '../assets/manifest';
import { toLine } from '../components/dialogue/Dialogue';
import type { ActMeta, Panel } from './types';
import { panelHref } from './useStoryNav';
import { validateStory } from './validate';
import { assetsUsed, walkLayers } from './walk';

/** #/board — every panel at a glance, grouped by act and movement. Click to jump. */
export function Storyboard({ panels, acts }: { panels: Panel[]; acts: ActMeta[] }) {
  const issues = validateStory(panels);
  return (
    <div className="page">
      <div className="page__top">
        <h1>Storyboard</h1>
        <span>{panels.length} panels</span>
        <a href={panelHref(panels[0])}>▶ Play from start</a>
        <a href="#/assets">Asset checklist</a>
      </div>
      <div className={`issues${issues.errors.length + issues.warnings.length === 0 ? ' issues--ok' : ''}`}>
        {issues.errors.length + issues.warnings.length === 0 ? 'Story validates: no issues.' : [...issues.errors.map((e) => `ERROR ${e}`), ...issues.warnings.map((w) => `warn  ${w}`)].map((s) => <div key={s}>{s}</div>)}
      </div>
      {acts.map((a) => {
        const inAct = panels.map((p, i) => ({ p, i })).filter(({ p }) => p.act === a.id);
        const movements = [...new Set(inAct.map(({ p }) => p.movement ?? ''))];
        return (
          <section key={a.id}>
            <h2>{a.title}</h2>
            {movements.map((m) => (
              <div key={m}>
                {m && <h3>{m}</h3>}
                <div className="sb-grid">
                  {inAct.filter(({ p }) => (p.movement ?? '') === m).map(({ p, i }) => <Card key={p.id} p={p} i={i} />)}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}

function Card({ p, i }: { p: Panel; i: number }) {
  const kinds: string[] = [];
  let firstLine = '';
  walkLayers(p.layers, (l) => {
    if (l.kind !== 'scene' && !kinds.includes(l.kind)) kinds.push(l.kind);
    if (!firstLine && l.kind === 'dialogue') { const ln = toLine(l.lines[0]); firstLine = `${ln.who.toUpperCase()}: ${ln.text}`; }
    if (!firstLine && (l.kind === 'type' || l.kind === 'callout')) firstLine = l.kind === 'type' ? l.text : l.label;
  });
  return (
    <a className="sb-card" href={panelHref(p)}>
      <div className="sb-card__n"><span>#{i + 1}</span><span>{p.ref != null ? `P${p.ref}` : 'new'}</span></div>
      <div className="sb-card__t">{p.title}</div>
      <div className="sb-card__l">{firstLine.replace(/\*\*|`/g, '') || (p.notes ?? '—')}</div>
      <div className="sb-card__k">{kinds.map((k) => <span key={k}>{k}</span>)}</div>
    </a>
  );
}

/** #/assets — every asset key the story references and whether a file exists for it. */
export function AssetChecklist({ panels }: { panels: Panel[] }) {
  const used = assetsUsed(panels);
  const have = used.filter((u) => assetUrl(u.key)).length;
  return (
    <div className="page">
      <div className="page__top">
        <h1>Asset checklist</h1>
        <span>{have} / {used.length} present</span>
        <a href="#/board">Storyboard</a>
      </div>
      <p style={{ maxWidth: 760, lineHeight: 1.5 }}>
        Drop files into <code>src/assets/files/</code> using these keys as paths (any of png, jpg, webp, svg, gif, mp4, webm).
        Character art falls back from <code>characters/&lt;who&gt;/&lt;pose&gt;</code> to <code>characters/&lt;who&gt;/idle</code>, so one idle image per character already replaces every placeholder figure.
      </p>
      <table className="asset-table">
        <thead><tr><th>Status</th><th>Key</th><th>What</th><th>Used in</th></tr></thead>
        <tbody>
          {used.map((u) => (
            <tr key={u.key}>
              <td className={assetUrl(u.key) ? 'ok' : 'missing'}>{assetUrl(u.key) ? '✓ present' : 'missing'}</td>
              <td>{u.key}</td>
              <td>{u.what}</td>
              <td>{u.panels.length > 4 ? `${u.panels.slice(0, 4).join(', ')} +${u.panels.length - 4}` : u.panels.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

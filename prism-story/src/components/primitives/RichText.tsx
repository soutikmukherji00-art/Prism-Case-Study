import { Fragment } from 'react';
import './primitives.css';

/**
 * Inline markup used throughout the story files, mirroring the script's conventions:
 *   **word**   → stressed word
 *   `Label`    → verbatim UI label (rendered as a chip)
 *   [X] / [N]  → value still to be confirmed (rendered as a flagged token)
 *   \n         → line break
 */
const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]|\n)/g;

export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter((p) => p !== '');
  return (
    <>
      {parts.map((p, i) => {
        if (p === '\n') return <br key={i} />;
        if (p.startsWith('**')) return <strong key={i} className="rt-stress">{p.slice(2, -2)}</strong>;
        if (p.startsWith('`')) return <code key={i} className="rt-label">{p.slice(1, -1)}</code>;
        if (p.startsWith('[')) return <mark key={i} className="rt-tbc" title="Value still to be confirmed">{p}</mark>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

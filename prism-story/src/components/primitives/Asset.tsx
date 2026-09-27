import type { ReactNode } from 'react';
import { assetUrl, isVideo } from '../../assets/manifest';
import './primitives.css';

interface AssetProps {
  /** Asset key, e.g. 'scenes/canteen'. Tried in order; first one present wins. */
  id: string | string[];
  /** Rendered when no file exists for any of the keys. */
  fallback: ReactNode;
  fit?: 'cover' | 'contain';
  loop?: boolean;
}

/** Renders a real asset if one has been dropped in, otherwise the fallback placeholder. */
export function Asset({ id, fallback, fit = 'cover', loop = true }: AssetProps) {
  const keys = Array.isArray(id) ? id : [id];
  const url = keys.map(assetUrl).find(Boolean);
  if (!url) return <>{fallback}</>;
  const cls = `asset-media${fit === 'contain' ? ' asset-media--contain' : ''}`;
  if (isVideo(url)) return <video className={cls} src={url} autoPlay muted loop={loop} playsInline />;
  return <img className={cls} src={url} alt="" draggable={false} />;
}

export function Placeholder({ label, detail, stripes }: { label: string; detail?: string; stripes?: boolean }) {
  return (
    <div className={`placeholder${stripes ? ' placeholder--stripes' : ''}`}>
      {label}
      {detail && <small>{detail}</small>}
    </div>
  );
}

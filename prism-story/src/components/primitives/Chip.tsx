import type { ReactNode } from 'react';
import './primitives.css';

export type ChipTone = 'neutral' | 'waiting' | 'bad' | 'good' | 'info' | 'ink';

export function Chip({ tone = 'neutral', children }: { tone?: ChipTone; children: ReactNode }) {
  return <span className={`chip chip--${tone}`}>{children}</span>;
}

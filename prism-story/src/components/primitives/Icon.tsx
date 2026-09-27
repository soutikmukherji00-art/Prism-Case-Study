/** Minimal line icons for the wireframe. A theme can replace this file wholesale. */
const PATHS = {
  phone: 'M6 3h4l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z',
  chat: 'M4 5h16v11H9l-5 4z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  voice: 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  doc: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7',
  po: 'M6 3h9l4 4v14H6zM14 3v5h5M9 15l2 2 4-4',
  handshake: 'M2 12l4-4 4 2 4-2 4 2 4 4-5 5-3-3-2 2-3-3-2 2z',
  plus: 'M12 5v14M5 12h14',
  hat: 'M3 16c3 1.6 15 1.6 18 0M6 15.5C6 9 8.5 6 12 6s6 3 6 9.5M9 7.5l3-3 3 3',
  magnifier: 'M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM15.5 15.5 21 21',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 1 3.5 10.9c-.6.5-1 1.2-1 2.1H9.5c0-.9-.4-1.6-1-2.1A6 6 0 0 1 12 3z',
  clock: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2',
  bell: 'M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z',
  check: 'M4 12l5 5L20 6',
  cart: 'M3 4h3l2.5 11h10L21 7H7M10 20a1 1 0 1 0 0-.01M18 20a1 1 0 1 0 0-.01',
  filter: 'M4 5h16l-6 7v6l-4 2v-8z',
  cursor: 'M5 3l14 8-6 1.5L10 19z',
  upload: 'M12 16V4M7 9l5-5 5 5M4 16v4h16v-4',
  user: 'M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21a8 8 0 0 1 16 0',
  arrowRight: 'M4 12h16M14 6l6 6-6 6',
  arrowLeft: 'M20 12H4M10 6l-6 6 6 6',
  laptop: 'M5 5h14v10H5zM2 19h20',
  search: 'M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM15.5 15.5 21 21',
  pin: 'M12 2a5 5 0 0 1 5 5c0 4-5 10-5 10S7 11 7 7a5 5 0 0 1 5-5z',
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 18, stroke = 1.8 }: { name: IconName; size?: number; stroke?: number }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={PATHS[name]} />
    </svg>
  );
}

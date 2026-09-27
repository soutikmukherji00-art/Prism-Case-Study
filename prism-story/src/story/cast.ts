/**
 * The cast. `color` is a theme token, `side` decides which way their speech
 * bubbles lean when nothing else says so.
 */
export interface CastMember {
  name: string;
  short?: string;
  role: string;
  color: string;
  side: 'left' | 'right';
}

export const cast = {
  vik: { name: 'Vik', role: 'Designer', color: 'var(--c-vik)', side: 'left' },
  nandini: { name: 'Nandini', role: 'Designer', color: 'var(--c-nandini)', side: 'right' },
  karishma: { name: 'Karishma', role: 'Business Development Manager', color: 'var(--c-karishma)', side: 'left' },
  bdm: { name: 'The BDM', short: 'BDM', role: 'Business Development Manager (illustrated)', color: 'var(--c-bdm)', side: 'left' },
  cm: { name: 'Category Manager', short: 'CM', role: 'Category Manager', color: 'var(--c-cm)', side: 'right' },
  buyer: { name: 'Buyer', role: 'Buyer', color: 'var(--c-buyer)', side: 'right' },
  seller: { name: 'Seller', role: 'Seller', color: 'var(--c-seller)', side: 'right' },
} as const satisfies Record<string, CastMember>;

export type CastId = keyof typeof cast;

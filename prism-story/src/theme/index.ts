/**
 * The active theme. v0 is deliberately theme-less (neutral wireframe).
 *
 * To theme the story: add `src/theme/<name>.css` that redefines the tokens in
 * neutral.css (and may restyle component classes), then swap the import below
 * and adjust `motion` to match the direction's feel.
 */
import './neutral.css';

export const theme = {
  name: 'neutral',
  motion: {
    /** Global pace multiplier for every timeline. 0.8 = 20% faster. */
    pace: 1,
    /** Cross-fade between panels, seconds. */
    panelFade: 0.22,
    spring: { type: 'spring', stiffness: 420, damping: 32, mass: 0.9 } as const,
    ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number],
    tween: 0.45,
  },
};

export type Theme = typeof theme;

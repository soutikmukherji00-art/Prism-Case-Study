/**
 * THE STORY ORDER. This list is the single source of truth for sequence.
 * Re-cutting the story = reordering, adding or removing entries here (or panels
 * inside a movement file). Panel numbers are derived; ids never change.
 */
import type { Panel } from '../engine/types';
import a1Dhanda from './act1/01-dhanda';
import a1Lunch from './act1/02-lunch';
import a1Break from './act1/03-pattern-break';
import { bridge, gettingIn } from './act2/01-bridge-and-getting-in';
import a2Questions from './act2/02-questions';
import a2LineItems from './act2/03-line-items';
import a2Wait from './act2/04-close-and-wait';
import a2Loss from './act2/05-the-loss';
import { brainstorm, method } from './act3/01-method-brainstorm';
import { crossQuestion, framework } from './act3/02-question-framework';
import { connect, prism, prompt } from './act3/03-connect-prism';
import a3Prototype from './act3/04-prototype';
import { journey, setup, wart } from './act4/01-setup-journey-wart';
import { climax, closing, otherSide } from './act4/02-other-side-to-climax';
import coda from './coda';

export { acts } from './acts';

export const story: Panel[] = [
  // Act 1 · The mismatch
  ...a1Dhanda,
  ...a1Lunch,
  ...a1Break,
  // Act 2 · The audit, and the loss
  ...bridge,
  ...gettingIn,
  ...a2Questions,
  ...a2LineItems,
  ...a2Wait,
  ...a2Loss,
  // Act 3 · Connect, then Prism
  ...method,
  ...brainstorm,
  ...crossQuestion,
  ...framework,
  ...connect,
  ...prism,
  ...prompt,
  ...a3Prototype,
  // Act 4 · The moment of truth
  ...setup,
  ...journey,
  ...wart,
  ...otherSide,
  ...closing,
  ...climax,
  // Coda
  ...coda,
];

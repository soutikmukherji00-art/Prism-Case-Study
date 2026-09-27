import { at, card, char, designers, layer, movement, say } from '../dsl';
import { S } from '../scenes';

export default movement('act3', 'Movement eight: the doubt, and the prototype', [
  {
    id: 'a3-the-doubt',
    ref: 104,
    title: 'The doubt',
    layers: [S.office(), char('nandini', { x: 60, size: 'xl', pose: 'arms-folded', enter: 'fade' }), at(say(['nandini', 'Sounds good on a whiteboard. Are we sure it actually works?']), { area: 'topLeft' })],
    notes: 'Never let the idea win unopposed. Third time she stops him; this one produces the prototype.',
  },
  { id: 'a3-the-cost', ref: 105, title: 'The cost', layers: [S.office(), ...designers({ size: 'l', enter: 'fade' }), at(say(['vik', 'Let’s test it.'], ['nandini', 'That’s a lot of engineering effort to find out.']), { area: 'top' })] },
  {
    id: 'a3-the-decision',
    ref: 106,
    title: 'The decision',
    layers: [S.office(), char('vik', { x: 34, size: 'l', pose: 'laptop', enter: 'none' }), char('nandini', { x: 66, size: 'l', enter: 'none' }), at(say(['vik', 'Then let’s not ask engineering. Let’s build it ourselves.'], ['nandini', '...Can we?'], ['vik', 'Let’s find out.']), { area: 'top' })],
    notes: 'Her “can we” is genuine uncertainty, not a setup.',
  },
  {
    id: 'a3-one-week',
    ref: 107,
    title: 'One week',
    layers: [
      S.studio(),
      at(layer('flow', { nodes: [{ label: 'Claude', sub: 'logic & flows', icon: 'sparkle' }, { label: 'Figma Make', sub: 'screens', icon: 'laptop' }, { label: 'A working prototype', sub: 'not a clickable one', icon: 'check' }] }), { area: [6, 8, 88, 54] }),
      at(say(['vik', 'One week. Claude and Figma Make. A working prototype, not a clickable one.']), { area: [10, 64, 80, 30] }),
    ],
    notes: 'State the method plainly. Tools visible in the frame, not hidden. (Confirm both are nameable publicly — appendix.)',
  },
  {
    id: 'a3-persona-toggle',
    ref: 108,
    title: 'The persona toggle',
    layers: [
      at(layer('personaToggle', { options: ['BDM', 'CM', 'Buyer', 'Seller'], views: { BDM: 'Your inquiries, filled from your chats.', CM: 'Mentions and recommended sellers, ranked.', Buyer: 'Just WhatsApp. Nothing to install.', Seller: 'RFQs arrive in WhatsApp too.' } }), { area: 'belowStrip' }),
      at(say(['nandini', 'One prototype. Switch the toggle and you’re the category manager. Switch again and you’re the buyer.']), { area: 'strip' }),
    ],
    notes: 'INTERACTIVE: click the toggle. Also what made a four-sided marketplace testable by two people in a room.',
  },
  {
    id: 'a3-rough',
    ref: 109,
    title: 'Rough',
    transition: 'cut',
    layers: [at(layer('footage', { asset: 'prototype-interaction', caption: 'The interaction video. Visibly unpolished; loader spins longer than it should', rough: true }), { area: [8, 6, 84, 88] })],
    notes: 'DO NOT CLEAN THIS UP. The roughness is the argument: a test, not a demo.',
  },
  { id: 'a3-method-prototype', ref: 110, title: 'Method', layers: [S.studio(), at(card('Method · Prototype test', '[N] days of building. [N] users across four roles. What was real: [to fill]. What was faked: [to fill].', { tone: 'method' }), { area: 'centerNarrow' })] },
  { id: 'a3-go', ref: 111, title: 'Go', layers: [S.office(), ...designers({ size: 'l', enter: 'fade' }), at(say(['nandini', 'They liked it.'], ['vik', 'Two weeks to build it properly.']), { area: 'top' })], notes: 'Hard cut to a title beat. No wind-down.' },
]);

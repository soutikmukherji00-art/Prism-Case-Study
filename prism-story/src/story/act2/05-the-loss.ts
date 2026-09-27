import { at, char, layer, movement, say } from '../dsl';
import { S } from '../scenes';

export default movement('act2', 'Movement five: the loss', [
  {
    id: 'a2-two-devices',
    ref: 59,
    title: 'TWO DEVICES',
    transition: 'cut',
    marker: { m: 25, a: 10 },
    layers: [
      {
        kind: 'split',
        left: [S.bdmDesk(), char('bdm', { x: 50, size: 'l', pose: 'laptop', enter: 'fade' })],
        right: [S.bdmDesk(), char('bdm', { x: 50, size: 'l', pose: 'phone', enter: 'fade' })],
      },
    ],
    notes: 'HOLD THIS PANEL. Same split as P6 and P55, except both halves are the same man: one man doing the work of the gap. No dialogue, no caption, no commentary.',
  },
  {
    id: 'a2-the-reply',
    ref: 60,
    title: 'The reply',
    marker: { m: 10, a: 8 },
    layers: [
      layer('phoneChat', {
        title: 'Buyer',
        startAt: 1,
        gap: 1.1,
        messages: [
          { from: 'me', text: '8 mm @ ₹[X]/t, 10 mm @ ₹[X]/t. Full quote attached.', time: '6:24 PM' },
          { from: 'them', text: 'I’ve already got a better deal somewhere else.', time: '6:51 PM' },
        ],
      }),
    ],
  },
  {
    id: 'a2-lost',
    ref: 61,
    title: 'Lost',
    marker: { m: 6, a: 6 },
    mood: 'desaturate',
    moodAt: 1.5,
    layers: [layer('status', { title: 'Inquiry #0412 · TMT steel · 30 items', prev: 'AWAITING RESPONSE', label: 'LOST', tone: 'bad', changeAt: 0.9 })],
    notes: 'One buyer, one inquiry, one loss. A deal that existed at nine in the morning and does not exist at seven at night. Status chip → LOST, then the screen desaturates.',
  },
  {
    id: 'a2-for-what',
    ref: 62,
    title: 'For what',
    marker: { m: 4, a: 5 },
    tally: 6,
    layers: [S.karishmaDesk(), char('karishma', { x: 50, size: 'l', pose: 'sad', enter: 'fade' }), at(say(['karishma', 'I wasted so much time. For what?']), { area: 'topRight' })],
    notes: 'CALL 6 — does six callbacks match reality? (appendix)',
  },
  {
    id: 'a2-floor',
    ref: 63,
    title: 'FLOOR',
    transition: 'fade',
    marker: { m: 4, a: 5 },
    layers: [S.bdmDeskEmpty()],
    notes: 'PSYCH FLOOR. One full panel of nothing; the marker as low as it goes. Buys the tonal jump into Act 3’s detective board.',
  },
]);

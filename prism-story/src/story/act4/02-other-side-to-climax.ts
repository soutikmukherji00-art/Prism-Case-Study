import { at, char, layer, movement, say } from '../dsl';
import { S } from '../scenes';
import { BUYER, HISTORY, NEW_REQ } from './01-setup-journey-wart';

const RATES = [
  { item: 'TMT Fe 500 · 8 mm', qty: '9 t', price: '₹[X] / t' },
  { item: 'TMT Fe 500 · 10 mm', qty: '12 t', price: '₹[X] / t' },
  { item: 'TMT Fe 500D · 12 mm', qty: '5 t', price: '₹[X] / t' },
  { item: 'Binding wire', qty: '400 kg', price: '₹[X] / kg' },
];
const AI_ASK = { from: 'ai' as const, who: 'Prism assistant', text: 'Before you send this across, you’ll want the billing address and the first delivery date.' };

export const otherSide = movement('act4', 'Movement four: the other side', [
  {
    id: 'a4-the-cm',
    ref: 124,
    title: 'The CM',
    layers: [
      S.cmDesk(),
      at(layer('nudge', { from: 'Prism · mention', text: `Karishma mentioned you on **${BUYER}** · TMT, 30 items`, align: 'right' }), { area: [50, 4, 46, 24] }),
      at(layer('phoneChat', { title: BUYER, app: 'Connect', device: 'window', messages: [...HISTORY, NEW_REQ], startAt: 4 }), { area: [8, 30, 56, 66], after: 0.3 }),
    ],
    notes: 'His screen. The mention appears, he opens it, and the buyer thread is right there. CM sequence stays compressed (four panels).',
  },
  {
    id: 'a4-recommended-sellers',
    ref: 125,
    title: 'Recommended sellers',
    layers: [
      layer('list', { app: 'Prism', title: 'Recommended sellers · TMT, 30 items', rows: [{ cells: ['[Seller A]', '1st'], sub: 'Category match · strong quote history · 40 km · delivers to site' }, { cells: ['[Seller B]', '2nd'], sub: 'Category match · good quote history · 85 km · ex-works' }, { cells: ['[Seller C]', '3rd'], sub: 'Category match · few past quotes · 30 km · delivers to site' }] }),
      at(say(['cm', 'It’s telling me which ones to open first.']), { area: 'rightPad' }),
    ],
    notes: 'Pays off P56. Frame as discoverability, never as time saved. Ranking factors are real — keep exactly: category match, quality of past quotes, distance, delivery terms.',
  },
  {
    id: 'a4-the-nudge',
    ref: 126,
    title: 'The nudge',
    layers: [layer('summary', { app: 'Prism', title: 'Quote builder', rows: RATES }), at(layer('nudge', { from: 'Prism · AI', tone: 'ai', text: 'A better rate is available from another seller for 10 mm.', context: '[Seller B] · ₹[X] / t lower' }), { area: 'rightPad', after: 0.2 })],
    notes: 'No dialogue. He adjusts and submits.',
  },
  {
    id: 'a4-the-seller',
    ref: 127,
    title: 'The seller',
    layers: [at(layer('phoneChat', { title: 'Birla Pivot', messages: [{ from: 'them', kind: 'rfq', text: 'RFQ · TMT 8 & 10 mm · 21 t' }, { from: 'me', text: 'Can quote by 3 PM' }], gap: 0.7 }), { area: 'leftPad' }), at(say(['nandini', 'The seller never logs in either.']), { area: 'rightPad' })],
    notes: 'Quietly extends the thesis to a fourth party. One line, then move on.',
  },
]);

export const closing = movement('act4', 'Movement five: closing Obstacle 1', [
  { id: 'a4-the-quote', ref: 128, title: 'The quote', marker: { m: 65, a: 75 }, layers: [at(layer('summary', { app: 'Prism', title: `Quote · ${BUYER}`, rows: RATES, more: '+ 26 more line items, all priced' }), { area: 'center' })], notes: 'No dialogue.' },
  {
    id: 'a4-forgot-to-ask',
    ref: 129,
    title: 'What she forgot to ask',
    marker: { m: 75, a: 82 },
    layers: [at(layer('phoneChat', { title: BUYER, app: 'Connect', device: 'window', messages: [NEW_REQ, { from: 'me', kind: 'doc', text: 'Quote · 30 items.pdf' }, AI_ASK], startAt: 2 }), { area: 'leftPad' }), at(say(['karishma', 'Oh. Yes. I haven’t asked him either of those.']), { area: 'rightPad' })],
    notes: 'THE PAYOFF OF OBSTACLE 1 (planted P39, mentioned at P102). Conversational register: this panel dies if the assistant sounds like a form. (Assistant’s real copy TBC.)',
  },
  {
    id: 'a4-then-and-now',
    ref: 130,
    title: 'Then and now',
    transition: 'cut',
    marker: { m: 78, a: 85 },
    layers: [
      {
        kind: 'split',
        left: [S.studio(), at(layer('field', { label: 'Billing Address', required: true, error: 'This field is required', ghosts: ['First Delivery Date *', 'Payment Terms *'] }), { area: [8, 10, 84, 80] })],
        right: [S.studio(), at(layer('nudge', { from: 'Prism assistant', tone: 'ai', text: AI_ASK.text }), { area: [8, 10, 84, 80] })],
      },
    ],
    notes: 'Same split grammar as P6, P55, P59. Left: the Act 2 form. Right: two things asked at the moment they matter. No dialogue, no caption.',
  },
  { id: 'a4-the-rate', ref: 131, title: 'The rate', marker: { m: 85, a: 88 }, layers: [at(layer('phoneChat', { title: BUYER, app: 'Connect', device: 'window', startAt: 0, messages: [{ from: 'me', kind: 'doc', text: 'Quote · 30 items.pdf' }, { from: 'them', text: 'Rates are fine. Go ahead.' }] }), { area: 'center' })] },
  {
    id: 'a4-the-po',
    ref: 132,
    title: 'The PO',
    marker: { m: 90, a: 90 },
    layers: [at(layer('phoneChat', { title: BUYER, app: 'Connect', device: 'window', startAt: 2, messages: [{ from: 'me', kind: 'doc', text: 'Quote · 30 items.pdf' }, { from: 'them', text: 'Rates are fine. Go ahead.' }, { from: 'them', kind: 'po', text: 'PO_Sunvik_0921.pdf' }] }), { area: 'leftPad' }), at(say(['karishma', 'He’s sent the PO.']), { area: 'rightPad' })],
    notes: 'Peak before the drop.',
  },
]);

export const climax = movement('act4', 'Movement six: the fake-out and the climax', [
  {
    id: 'a4-fake-out',
    ref: 133,
    title: 'FAKE-OUT',
    marker: { m: 55, a: 25 },
    layers: [S.karishmaDesk(), char('karishma', { x: 40, size: 'xl', pose: 'sad', enter: 'fade' }), at(say(['karishma', 'So now I have to fill in all of that data. All that paperwork.']), { area: 'topRight' })],
    notes: 'THE MARKER PLUNGES BACK TOWARD RED. Do not signpost; do not let anyone reassure her.',
  },
  { id: 'a4-beat', ref: 134, title: 'Beat', transition: 'continue', mood: 'still', marker: { m: 55, a: 25 }, layers: [S.karishmaDesk(), char('karishma', { x: 40, size: 'xl', pose: 'sad', enter: 'none' })], notes: 'Nothing moves. The dread sits.' },
  { id: 'a4-the-click', ref: 135, title: 'The click', marker: { m: 55, a: 25 }, layers: [layer('cursorButton', { label: 'Proceed to Order', context: `PO received from **${BUYER}** · 30 line items` })] },
  {
    id: 'a4-shimmer',
    ref: 136,
    title: 'SHIMMER',
    transition: 'cut',
    marker: { m: 95, a: 95 },
    layers: [
      at(
        layer('shimmerForm', {
          title: `Order · ${BUYER}`,
          counter: '30 of 30',
          fields: [
            { label: 'Buyer', value: BUYER }, { label: 'PO number', value: 'PO_Sunvik_0921' },
            { label: 'Line items', value: '30 of 30' }, { label: 'Quantities', value: '21 t + 400 kg' },
            { label: 'Rates', value: 'As approved in chat' }, { label: 'Delivery terms', value: 'Delivered to site' },
            { label: 'First delivery', value: '20 March' }, { label: 'Billing address', value: 'Sunvik Corp., Pune' },
            { label: 'Payment terms', value: '30 days' }, { label: 'Category Manager', value: 'CM · TMT' },
          ],
        }),
        { area: [4, 4, 92, 92] },
      ),
    ],
    notes: 'THE PANEL THE DOCUMENT EXISTS FOR. Screen only: no faces, no reaction, no text. The marker spikes. Whatever animation budget exists belongs here.',
  },
  { id: 'a4-still', ref: 137, title: 'Still', transition: 'cut', layers: [layer('footage', { asset: 'karishma-hands', caption: 'Her hands, off the keyboard, motionless. No face' })], notes: 'Stillness reads as astonishment. Footage carries the fact; the next panel carries the emotion. (Confirm a usable 3-second moment exists.)' },
  { id: 'a4-reaction', ref: 138, title: 'Reaction', layers: [S.karishmaDesk(), char('karishma', { x: 40, size: 'xl', pose: 'reacting', enter: 'fade' }), at(say(['karishma', 'That’s it?']), { area: 'topRight' })], notes: 'The character the reader has followed for 138 panels.' },
  { id: 'a4-cm-half', ref: 139, title: 'The CM’s half', layers: [at(layer('summary', { app: 'Prism', title: 'Approve order · prices populated from seller code', rows: RATES, more: 'One approval.' }), { area: 'center' })] },
  {
    id: 'a4-placed',
    ref: 140,
    title: 'Placed',
    marker: { m: 97, a: 97 },
    layers: [at(layer('status', { app: 'Prism', title: `${BUYER} · TMT · 30 items`, prev: 'PO RECEIVED', prevTone: 'info', label: 'ORDER PLACED', tone: 'good', changeAt: 0.6 }), { area: 'center' })],
    notes: 'The marker sits in the top-right corner of the green zone.',
  },
]);

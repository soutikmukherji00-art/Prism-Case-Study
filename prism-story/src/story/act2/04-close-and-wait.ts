import { at, card, char, layer, movement, say } from '../dsl';
import { S } from '../scenes';

const INQUIRY = 'Inquiry #0412 · TMT steel · 30 items';
const QUOTES = [
  { item: 'TMT Fe 500 · 8 mm', qty: '9 t', price: '₹[X] / t' },
  { item: 'TMT Fe 500 · 10 mm', qty: '12 t', price: '₹[X] / t' },
  { item: 'TMT Fe 500D · 12 mm', qty: '5 t', price: '₹[X] / t' },
  { item: 'Binding wire', qty: '400 kg', price: '₹[X] / kg' },
];

export default movement('act2', 'Movement four: the close, and the wait', [
  {
    id: 'a2-deal-amount',
    ref: 47,
    title: 'Deal amount',
    marker: { m: 15, a: 7 },
    layers: [layer('field', { label: 'Deal Amount', step: 'Step 6 of 6 · Summary', required: true, placeholder: '₹' }), at(say(['vik', 'Deal amount. I don’t have prices yet. That’s the whole reason I’m here.']), { area: 'rightPad' })],
  },
  {
    id: 'a2-payment-terms',
    ref: 48,
    title: 'Payment terms',
    marker: { m: 14, a: 6 },
    tally: 5,
    layers: [layer('field', { label: 'Payment Terms', step: 'Step 6 of 6 · Summary' }), at(say(['vik', 'Call five.']), { area: 'rightPad' })],
    notes: 'The tally has run silently for fourteen panels. The only time anyone mentions it.',
  },
  {
    id: 'a2-assign-cm',
    ref: 49,
    title: 'Assign a CM',
    marker: { m: 13, a: 6 },
    layers: [layer('submitBar', { error: 'Please assign a Category Manager to proceed' }), at(say(['vik', 'I have to tell it who to send it to.'], ['nandini', 'It doesn’t know?']), { area: 'rightPad' })],
  },
  {
    id: 'a2-submit',
    ref: 50,
    title: 'Submit',
    marker: { m: 15, a: 6 },
    layers: [layer('status', { title: INQUIRY, label: 'AWAITING RESPONSE', tone: 'waiting', sub: 'Submitted 1:58 PM' }), at(say(['vik', 'Okay. Done. That’s the hard part over.']), { area: 'rightPad' })],
    notes: 'Small marker rise. He believes the work is finished — a setup the attentive reader already sees through.',
  },
  {
    id: 'a2-nothing-moves',
    ref: 51,
    title: 'Nothing moves',
    transition: 'continue',
    marker: { m: 14, a: 6 },
    layers: [at(layer('status', { title: INQUIRY, label: 'AWAITING RESPONSE', tone: 'waiting', sub: 'Submitted 1:58 PM' }), {}), at(say(['vik', 'Will it tell me when he opens it?'], ['nandini', 'No.'], ['vik', 'Will it tell me anything?'], ['nandini', 'No.']), { area: 'rightPad' })],
    notes: 'Pluto had no notifications of any kind. A genuine absence, which makes Prism’s reminders (P97) a real payoff.',
  },
  { id: 'a2-one-hour', ref: 52, title: 'One hour', marker: { m: 14, a: 6 }, layers: [at(layer('clock', { time: '3:00 PM' }), { area: 'center' })] },
  {
    id: 'a2-two-hours',
    ref: 53,
    title: 'Two hours',
    marker: { m: 12, a: 5 },
    layers: [layer('clock', { time: '4:00 PM' }), at(say(['karishma', 'My buyer is waiting.']), { area: 'rightPad' })],
    notes: 'Karishma’s voice returns for the first time since Act 1, briefly: whose day this is.',
  },
  { id: 'a2-three-hours', ref: 54, title: 'Three hours', marker: { m: 10, a: 5 }, layers: [layer('clock', { time: '5:00 PM' }), at(say(['karishma', 'Why hasn’t the category manager responded?']), { area: 'rightPad' })] },
  {
    id: 'a2-the-other-side',
    ref: 55,
    title: 'The other side',
    marker: 'frozen',
    layers: [
      {
        kind: 'split',
        left: [S.karishmaDesk(), char('karishma', { x: 50, size: 'l', pose: 'phone' })],
        right: [
          S.cmDesk(),
          char('cm', { x: 22, size: 'l', pose: 'desk' }),
          at(layer('list', { title: 'Seller quotes · 43 unread', rows: Array.from({ length: 7 }, (_, i) => ({ cells: [`Seller ${i + 1}`, 'TMT · 30 items'], chip: { label: 'NEW', tone: 'info' as const } })) }), { area: [40, 16, 56, 76] }),
        ],
      },
      at(say(['cm', 'I have so many quotes. I have to go through all of them to find the best one.']), { area: [52, 2, 46, 16] }),
    ],
    notes: 'SPLIT SCREEN, same composition as P6. Brief — not a second emotional journey. Marker frozen.',
  },
  {
    id: 'a2-precision',
    ref: 56,
    title: 'Precision',
    layers: [S.studio(), at(card('This is a discoverability problem, not a speed problem', 'The category manager is not slow. He is looking at everything at once, with nothing telling him which quote is worth opening first.', { tone: 'insight' }), { area: 'centerNarrow' })],
    notes: 'Keeps the recommended-sellers feature (P125) an honest answer rather than a convenient one.',
  },
  {
    id: 'a2-prices',
    ref: 57,
    title: 'Prices',
    marker: { m: 20, a: 8 },
    layers: [layer('summary', { title: `${INQUIRY} · summary`, rows: QUOTES, more: '+ 26 more line items' }), at(layer('clock', { time: '6:10 PM' }), { area: 'rightPad' })],
    notes: 'The quotes arrive. The summary finally has numbers in it. No dialogue.',
  },
  {
    id: 'a2-assembling',
    ref: 58,
    title: 'Assembling the answer',
    transition: 'continue',
    marker: { m: 25, a: 10 },
    layers: [layer('summary', { title: `${INQUIRY} · summary`, rows: QUOTES, scan: true, more: '+ 26 more line items' }), at(say(['vik', 'Okay. So I can do the 8mm at this, and the 10mm at this...']), { area: 'rightPad' })],
    notes: '8 mm / 10 mm prices come from the screenshot — confirm (appendix).',
  },
]);

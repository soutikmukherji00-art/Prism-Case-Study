import type { Msg } from '../../components/ui/chat';
import { at, card, char, layer, movement, say, statement } from '../dsl';
import { S } from '../scenes';

export const BUYER = 'Sunvik Corporation';
export const HISTORY: Msg[] = [
  { from: 'them', text: 'Received the last lot, thanks', time: 'Mon' },
  { from: 'me', text: 'Great. Let me know for the next site', time: 'Mon' },
  { from: 'them', text: 'Will do', time: 'Tue' },
];
export const NEW_REQ: Msg = { from: 'them', text: 'Need 30 t TMT for the Pune site, mostly 8 and 10 mm. List attached.', time: '10:12 AM' };

export const setup = movement('act4', 'Movement one: the setup', [
  {
    id: 'a4-title-beat',
    ref: 112,
    title: 'Title beat',
    transition: 'cut',
    marker: 'hide',
    layers: [statement('**Two weeks later.** Same BDM. A live inquiry from her own pipeline. Nothing staged.', { bg: 'surface' })],
    notes: 'The evidentiary act. Flat and factual. State the stakes once, plainly, then never again.',
  },
  {
    id: 'a4-the-room',
    ref: 113,
    title: 'The room',
    layers: [S.karishmaDesk(), char('karishma', { x: 50, size: 'l', pose: 'from-behind', enter: 'fade' }), char('vik', { x: 12, size: 'm', enter: 'fade', dim: true }), char('nandini', { x: 88, size: 'm', enter: 'fade', dim: true }), at(say(['vik', 'We trained her on the basics and then we left her alone.']), { area: 'topLeft' })],
    notes: 'Deliberately undramatic. Curious, not nervous.',
  },
  {
    id: 'a4-show-me',
    ref: 114,
    title: 'Karishma',
    marker: { m: 45, a: 30 },
    layers: [S.karishmaDesk(), char('karishma', { x: 40, size: 'xl', pose: 'laptop', enter: 'fade' }), at(say(['karishma', 'Okay. Show me.']), { area: 'topRight' })],
    notes: 'She went in curious and pleased, not hostile. Do not manufacture scepticism she did not have.',
  },
  {
    id: 'a4-method-retest',
    ref: 115,
    title: 'Method',
    layers: [S.studio(), at(card('Method · Retest', 'Trained on the basics, then left alone. A live inquiry from her own pipeline, not a scripted task. We did not intervene. Shared with her permission.', { tone: 'method' }), { area: 'centerNarrow' })],
    notes: 'Method disclosure at the point of the claim: what separates evidence from testimonial.',
  },
]);

export const journey = movement('act4', 'Movement two: the journey', [
  {
    id: 'a4-existing-group',
    ref: 116,
    title: 'A group that already exists',
    marker: { m: 40, a: 45 },
    layers: [at(layer('phoneChat', { title: BUYER, app: 'Connect', device: 'window', messages: [...HISTORY, NEW_REQ], startAt: 3 }), { area: 'leftPad' }), at(say(['karishma', 'This is my buyer. We’ve been talking in here for weeks.']), { area: 'rightPad' })],
    notes: 'No setup, no onboarding, no empty state. The conversation was already in it.',
  },
  {
    id: 'a4-forward',
    ref: 117,
    title: 'Forward',
    marker: { m: 45, a: 55 },
    layers: [at(layer('phoneChat', { title: 'Category Manager · TMT', app: 'Connect', device: 'window', messages: [{ from: 'system', text: `Shared from ${BUYER}` }, { ...NEW_REQ, from: 'me' }], gap: 0.6 }), { area: 'center' })],
    notes: 'One action. Callback to P59: in Act 2 this took a laptop, a phone and two hands.',
  },
  {
    id: 'a4-threshold',
    ref: 118,
    title: 'THRESHOLD',
    marker: { m: 50, a: 65 },
    layers: [
      at(layer('chatInquiry', { chatTitle: BUYER, recordTitle: 'Inquiry · created from chat', mode: 'verify', startAt: 4, messages: [...HISTORY, NEW_REQ], fields: [{ label: 'Buyer', value: BUYER }, { label: 'Product', value: 'TMT bars, Fe 500' }, { label: 'Quantity', value: '30 t' }, { label: 'Site', value: 'Pune' }, { label: 'Thread', value: 'Attached · 4 messages' }] }), { area: 'belowStrip' }),
      at(say(['karishma', 'And it keeps the whole conversation.']), { area: 'strip' }),
    ],
    notes: 'THE MARKER CROSSES THE ACTIVATION THRESHOLD HERE. The product’s core move and the model’s tipping point are the same panel — not engineered.',
  },
  { id: 'a4-mention', ref: 119, title: 'The mention', marker: { m: 52, a: 67 }, layers: [at(layer('field', { app: 'Prism', label: 'Assign / mention', typed: '@Category Manager · TMT' }), { area: 'center' })], notes: 'No dialogue. Different action from P122 (there she adds him to the buyer group).' },
  {
    id: 'a4-prism-inbox',
    ref: 120,
    title: 'Prism',
    marker: { m: 55, a: 70 },
    layers: [
      layer('list', { app: 'Prism', title: 'My inquiries', rows: [{ cells: [BUYER, 'TMT · 30 items'], chip: { label: 'NEW', tone: 'info' } }, { cells: ['[Buyer 2]', 'Cement · 400 bags'], chip: { label: 'QUOTED', tone: 'waiting' } }, { cells: ['[Buyer 3]', 'Structural steel'], chip: { label: 'PO RECEIVED', tone: 'good' } }, { cells: ['[Buyer 4]', 'Binding wire'], chip: { label: 'QUIET 2 DAYS', tone: 'bad' } }] }),
      at(say(['vik', 'We’d told her this is where all her inquiries live now.']), { area: 'rightPad' }),
    ],
    notes: 'PRISM IS EXPLAINED HERE AND NOWHERE EARLIER. No verbatim quote from her exists, so Vik narrates. Never put invented words in her mouth.',
  },
  {
    id: 'a4-buyer-insight',
    ref: 121,
    title: 'Buyer insight',
    transition: 'continue',
    marker: { m: 60, a: 72 },
    layers: [
      layer('list', { app: 'Prism', title: 'My inquiries', autoHover: 0, rows: [{ cells: [BUYER, 'TMT · 30 items'], chip: { label: 'NEW', tone: 'info' }, hover: ['Past orders: 6 · last in January', 'Pays in 30 days, usually on time', 'Usually buys: TMT 8–12 mm, binding wire'] }, { cells: ['[Buyer 2]', 'Cement · 400 bags'], chip: { label: 'QUOTED', tone: 'waiting' } }, { cells: ['[Buyer 3]', 'Structural steel'], chip: { label: 'PO RECEIVED', tone: 'good' } }, { cells: ['[Buyer 4]', 'Binding wire'], chip: { label: 'QUIET 2 DAYS', tone: 'bad' } }] }),
      at(say(['karishma', 'It knows what he’s bought before.']), { area: 'rightPad' }),
    ],
    notes: 'INTERACTIVE: hover the buyer row. The card also opens on its own.',
  },
]);

export const wart = movement('act4', 'Movement three: the wart', [
  {
    id: 'a4-the-wart',
    ref: 122,
    title: 'THE WART',
    marker: { m: 55, a: 62 },
    layers: [
      layer('list', { app: 'Connect', title: `Add member · ${BUYER}`, cutoffAfter: 0, rows: [{ cells: ['[Colleague 1]', 'Sales'] }, { cells: ['Category Manager · TMT', 'Category'] }, { cells: ['[Colleague 3]', 'Finance'] }, { cells: ['[Colleague 4]', 'Logistics'] }] }),
      at(say(['karishma', 'Is that the only one?']), { area: 'rightPad' }),
    ],
    notes: 'REAL, AND IT HAPPENED IN THIS SESSION. She scrolls, finds him, moves on within seconds. Brief; do not make her struggle.',
  },
  {
    id: 'a4-owning-it',
    ref: 123,
    title: 'Owning it',
    layers: [
      S.studio(),
      at(card('What we got wrong', 'We designed and tested on MacBooks. Most of the sales floor runs Windows on smaller screens, so lists that fitted for us were cut in half for them. We found this here, redesigned it with engineering, and shipped the fix in the following release.', { tone: 'wrong' }), { area: 'leftPad' }),
      layer('deviceCompare', { rows: ['[Colleague 1]', 'Category Manager · TMT', '[Colleague 3]', '[Colleague 4]', '[Colleague 5]'], left: { label: 'MacBook', visible: 5 }, right: { label: 'Her Dell', visible: 1 } }),
    ],
    notes: 'THE CREDIBILITY BEAT OF THE DOCUMENT. Flat, unapologetic, specific, with a fix attached.',
  },
]);

import type { Msg } from '../../components/ui/chat';
import { at, card, char, layer, movement, product, say } from '../dsl';
import { S } from '../scenes';

const FLOOR = { m: 4, a: 5 };
const CONNECTED = { m: 60, a: 5 };
const ABLE = { m: 60, a: 85 };
const PROMPTED = { m: 85, a: 90 };

/** The three fragments from P26, now arriving in one Connect thread. */
export const FRAGMENTS: Msg[] = [
  { from: 'them', text: 'Thirty tonnes TMT, mostly 8 and 10 mm', time: '9:40 AM' },
  { from: 'them', kind: 'voice', text: '0:42', time: '11:15 AM' },
  { from: 'them', kind: 'image', text: 'The list', time: '2:05 PM' },
];
export const INQUIRY_FIELDS = [
  { label: 'Product', value: 'TMT bars, Fe 500', at: 0 },
  { label: 'Quantity', value: '30 t', at: 0 },
  { label: 'Sizes', value: '8 mm, 10 mm', at: 0 },
  { label: 'Unloading', value: 'At site, buyer’s crew', at: 1 },
  { label: 'Needed by', value: '20 March', at: 1 },
  { label: 'Line items', value: '30 of 30', at: 2 },
];

export const connect = movement('act3', 'Movement five: Connect answers Motivation', [
  {
    id: 'a3-connect-title',
    ref: 87,
    title: 'Connect',
    transition: 'cut',
    marker: { ...FLOOR, onChart: true },
    layers: [
      S.studio(),
      at(product('CONNECT', 'The chat layer'), { area: 'leftPad' }),
      at(layer('bmap', { marker: FLOOR, arrows: ['up', 'right'], glow: 'up' }), { area: [54, 6, 42, 60], hold: 0.8 }),
      at(say(['vik', 'Don’t make them come to us. Go to where they already are.']), { area: [52, 68, 44, 28] }),
    ],
  },
  {
    id: 'a3-one-handle',
    ref: 88,
    title: 'One handle',
    layers: [
      S.studio(),
      at(layer('flow', { arrows: 'both', nodes: [{ label: 'One Birla Pivot handle', sub: 'He sends from our platform', icon: 'chat' }, { label: 'Buyer’s WhatsApp', sub: 'Buyer replies where he already is', icon: 'phone' }] }), { area: [6, 8, 88, 50] }),
      at(say(['vik', 'One Birla Pivot handle. He sends from our platform, it lands in the buyer’s WhatsApp. Buyer replies on WhatsApp, it lands with us.'], ['nandini', 'The buyer doesn’t install anything.']), { area: [10, 58, 80, 40] }),
    ],
    notes: 'The most important thing about Connect is what the buyer is NOT asked to do. Nandini says it, so it reads as a check.',
  },
  {
    id: 'a3-groups',
    ref: 89,
    title: 'Groups',
    layers: [
      at(
        {
          kind: 'split',
          divider: false,
          left: [at(layer('phoneChat', { title: 'Group · Buyer', app: 'Connect', device: 'window', messages: [{ from: 'them', text: 'Rates by today?' }, { from: 'me', text: 'Checking now' }], gap: 0.4 }), { area: [4, 2, 92, 96] })],
          right: [at(layer('phoneChat', { title: 'Group · Category Manager', app: 'Connect', device: 'window', messages: [{ from: 'me', text: 'Buyer needs 30 t TMT, see thread' }, { from: 'them', who: 'CM', text: 'On it' }], gap: 0.4 }), { area: [4, 2, 92, 96] })],
        },
        { area: 'belowStrip' },
      ),
      at(say(['vik', 'A group with the buyer. A group with the category manager. Same app, same thread, no forwarding.']), { area: 'strip' }),
    ],
    notes: 'Callback to P55 (split) and P59 (two devices): the gap is now inside one window.',
  },
  {
    id: 'a3-effort-follows-intent',
    ref: 90,
    title: 'Effort follows intent',
    layers: [
      at(layer('chatInquiry', { chatTitle: 'Buyer', recordTitle: 'Order', mode: 'onLast', messages: [{ from: 'them', text: 'Need 30 t TMT, mostly 8 and 10 mm' }, { from: 'me', text: 'Sharing rates by evening' }, { from: 'them', kind: 'po', text: 'PO_4471.pdf' }], fields: INQUIRY_FIELDS.slice(0, 5) }), { area: 'belowStrip' }),
      at(say(['vik', 'While it’s cold, it stays a conversation. The moment a PO lands, it becomes an order.'], ['nandini', 'So nobody fills anything in until somebody has actually decided to buy.']), { area: 'strip' }),
    ],
  },
  {
    id: 'a3-the-principle',
    ref: 91,
    title: 'The principle',
    layers: [S.studio(), at(card('Effort should scale with demonstrated intent', 'The old system demanded its heaviest work at the coldest moment of a deal, from the person least able to spare the time, before anyone knew whether the order was real.', { tone: 'insight' }), { area: 'centerNarrow' })],
    notes: 'THE SHARPEST STRATEGIC IDEA IN THE DOCUMENT. Also takeaway 2.',
  },
  {
    id: 'a3-still-red',
    ref: 92,
    title: 'Still red',
    marker: { ...CONNECTED, onChart: true },
    layers: [S.whiteboard(), at(layer('bmap', { marker: CONNECTED, from: FLOOR }), { area: 'center' })],
    notes: 'CRITICAL TEACHING BEAT. The marker climbs a long way and is still, unmistakably, in the red. Resisting “Connect is the answer” is what makes Prism necessary.',
  },
  { id: 'a3-the-gap', ref: 93, title: 'The gap', marker: CONNECTED, layers: [S.studio(), char('nandini', { x: 40, size: 'xl', enter: 'fade', facing: 'left' }), at(say(['nandini', 'He wants to. He still can’t.']), { area: 'rightPad' })] },
]);

export const prism = movement('act3', 'Movement six: Prism answers Ability', [
  {
    id: 'a3-prism-title',
    ref: 94,
    title: 'Prism',
    transition: 'cut',
    marker: { ...CONNECTED, onChart: true },
    layers: [
      S.studio(),
      at(product('PRISM', 'The layer on top of Connect'), { area: 'leftPad' }),
      at(layer('bmap', { marker: CONNECTED, arrows: ['right'], glow: 'right' }), { area: [54, 6, 42, 60], hold: 0.8 }),
      at(say(['vik', 'Connect gets him there. Prism is why he stays.']), { area: [52, 68, 44, 28] }),
    ],
  },
  {
    id: 'a3-reading-conversation',
    ref: 95,
    title: 'Reading the conversation',
    marker: CONNECTED,
    layers: [
      at(layer('chatInquiry', { chatTitle: 'Buyer', recordTitle: 'Inquiry', mode: 'progressive', gap: 1.1, messages: FRAGMENTS, fields: INQUIRY_FIELDS }), { area: 'belowStrip' }),
      at(say(['vik', 'It reads the conversation and fills the inquiry in.'], ['nandini', 'As it arrives. Not all at once.']), { area: 'strip' }),
    ],
    notes: 'THE SINGLE MOST IMPORTANT SCREEN. Direct answer to P26: same three timestamps, landing one after another, the inquiry updating each time.',
  },
  {
    id: 'a3-thirty-of-thirty',
    ref: 96,
    title: 'Thirty of thirty',
    layers: [layer('counter', { from: 12, to: 30, total: 30, duration: 1.4 }), at(say(['vik', 'He checks it. He doesn’t type it.']), { area: [20, 70, 60, 24] })],
    notes: 'DELIBERATE MIRROR of P43: same component, same position, opposite direction. Four hours becomes a scroll.',
  },
  {
    id: 'a3-reminders',
    ref: 97,
    title: 'Reminders',
    layers: [
      S.studio(),
      at(layer('nudge', { from: 'Prism · reminder', text: 'The TMT inquiry has been quiet for two days. Nudge the buyer?', context: 'Inquiry · TMT steel · 30 items' }), { area: [18, 10, 64, 34] }),
      at(say(['nandini', 'And it tells him when something moves.'], ['vik', 'Which Pluto never did.']), { area: [18, 50, 64, 40] }),
    ],
    notes: 'Payoff of P51.',
  },
  {
    id: 'a3-the-po',
    ref: 98,
    title: 'The PO',
    layers: [
      at(layer('chatInquiry', { chatTitle: 'Buyer', recordTitle: 'Order · verify', mode: 'verify', startAt: 3, messages: [...FRAGMENTS, { from: 'them', kind: 'po', text: 'PO_4471.pdf', time: '5:40 PM' }], fields: INQUIRY_FIELDS }), { area: 'belowStrip' }),
      at(say(['vik', 'PO arrives, it reads it, he checks it once.']), { area: 'strip' }),
    ],
    notes: 'SEEDS THE ACT 4 CLIMAX. Do not show the autofill in full — the feeling is P136’s job.',
  },
  {
    id: 'a3-green',
    ref: 99,
    title: 'Green',
    marker: { ...ABLE, onChart: true },
    layers: [S.whiteboard(), at(layer('bmap', { marker: ABLE, from: CONNECTED }), { area: 'center' })],
    notes: 'The marker crosses the threshold into green, for the first time. Silent: the first good news in ninety-nine panels.',
  },
  {
    id: 'a3-the-lever',
    ref: 100,
    title: 'The lever',
    marker: ABLE,
    layers: [S.studio(), at(card('When a behaviour fails, reduce the cost before you increase the persuasion', 'Motivation is expensive to buy and it decays. Ability, once designed for, compounds. A man who wanted to do his job was never the problem.', { tone: 'insight' }), { area: 'centerNarrow' })],
  },
]);

export const prompt = movement('act3', 'Movement seven: the Prompt', [
  {
    id: 'a3-ai-layer',
    ref: 101,
    title: 'The AI layer',
    marker: { ...PROMPTED, onChart: true },
    layers: [S.whiteboard(), at(layer('bmap', { marker: PROMPTED, from: ABLE, burst: 'land', band: 'AI layer — across Connect and Prism' }), { area: [4, 6, 60, 88] }), at(say(['vik', 'And now a nudge actually lands.']), { area: 'rightPad' })],
  },
  {
    id: 'a3-what-it-does',
    ref: 102,
    title: 'What it does',
    marker: PROMPTED,
    layers: [
      at(layer('screensRow', { items: [{ title: 'Quiet inquiry', body: 'Nudge: this buyer has gone quiet', icon: 'bell' }, { title: 'Missing info', body: 'You haven’t asked for the billing address', icon: 'sparkle' }, { title: 'Sellers', body: 'Open these three quotes first', icon: 'search' }, { title: 'Closing', body: 'Rates approved. Send the order?', icon: 'check' }] }), { area: [4, 6, 92, 56] }),
      at(say(['nandini', 'Tell him what’s gone quiet. Tell him what he forgot to ask. Tell the category manager which quote to open first.']), { area: [10, 66, 80, 30] }),
    ],
    notes: 'The second clause plants Act 4’s biggest payoff (P129). Say it once, lightly.',
  },
  {
    id: 'a3-whole-journey',
    ref: 103,
    title: 'The whole journey',
    marker: { ...PROMPTED, onChart: true },
    layers: [S.whiteboard(), at(layer('bmap', { marker: PROMPTED, path: [FLOOR, CONNECTED, ABLE, PROMPTED], labels: [{ text: 'Connect', m: 66, a: 12 }, { text: 'Prism', m: 52, a: 72 }] }), { area: 'center' })],
    notes: 'The entire thesis in one image. Reprised at P148.',
  },
]);

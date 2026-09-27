import { at, card, char, designers, layer, movement, say, statement } from '../dsl';
import { S } from '../scenes';

export default movement('act1', 'Movement one: the dhanda', [
  {
    id: 'a1-cover',
    ref: 1,
    title: 'Cover',
    layers: [
      S.office(),
      ...designers({ pose: 'desk', size: 'l', enter: 'rise' }),
      at(layer('type', { text: 'Birla Pivot · Aditya Birla Group', variant: 'kicker', align: 'left' }), { area: [2, 2, 60, 12] }),
      at(statement('**Prism & Connect**', { sub: 'AI-native chat platform for B2B procurement · Story duration: 8 min' }), { area: 'top' }),
    ],
    notes: 'The keyboard instruction is load-bearing: it tells the reader this is not a scrolling page (the on-screen hint shows on panel 1).',
  },
  {
    id: 'a1-hook',
    ref: 2,
    title: 'The hook',
    transition: 'continue',
    camera: { zoom: 1.08, push: true },
    layers: [
      S.office(),
      char('vik', { x: 34, pose: 'feet-up', size: 'l', enter: 'none', facing: 'right' }),
      char('nandini', { x: 66, pose: 'desk', size: 'l', enter: 'none' }),
      say(['vik', 'Dhanda at Birla Pivot was very **simple**.'], ['nandini', 'Was.']),
    ],
    notes: 'First line: establish register, violate the case-study expectation, make the reader curious. Nandini’s one word plants that something changed.',
  },
  {
    id: 'a1-step-one',
    ref: 3,
    title: 'Step one',
    layers: [S.bdmDesk(), char('bdm', { pose: 'phone', x: 40, size: 'l' }), at(say(['vik', 'Was. Okay. A buyer calls the BDM and tells him what he needs.']), { area: 'topRight' })],
  },
  {
    id: 'a1-step-two',
    ref: 4,
    title: 'Step two',
    transition: 'continue',
    layers: [
      S.bdmDesk(),
      char('bdm', { pose: 'phone', x: 40, size: 'l', enter: 'none' }),
      at(say({ who: 'buyer', text: 'Thirty tonnes of TMT steel.', side: 'right' }), { area: 'topRight' }),
    ],
    notes: 'Keep the requirement concrete and small: the reader needs to hold this number when thirty line items arrive. Bubble enters from off-panel in the buyer’s colour.',
  },
  {
    id: 'a1-step-three',
    ref: 5,
    title: 'Step three',
    layers: [S.site(), char('bdm', { pose: 'hard-hat', x: 34, size: 'l' }), at(say(['vik', 'And the BDM is almost never at a desk. He is at the site, or at the buyer’s office.']), { area: 'topRight' })],
    notes: 'The BDM works in the field and the CM sits in the office. This makes panel 8 inevitable.',
  },
  {
    id: 'a1-step-four',
    ref: 6,
    title: 'Step four',
    layers: [
      {
        kind: 'split',
        left: [S.site(), char('bdm', { pose: 'phone', x: 50, size: 'l', enter: 'rise' })],
        right: [S.cmDesk(), char('cm', { pose: 'desk', x: 50, size: 'l', enter: 'rise' }), char('seller', { x: 14, size: 's', enter: 'pop', tag: false }), char('seller', { x: 86, size: 's', enter: 'pop', tag: false }), char('seller', { x: 72, y: 55, size: 's', enter: 'pop', tag: false })],
      },
      at(say(['nandini', 'The category manager is at the office. So the BDM calls him, and he checks prices with his sellers.']), { area: 'top' }),
    ],
    notes: 'Split-frame grammar #1 (rhymes with P55, P59, P130): two people, two places, a lot of implied distance.',
  },
  {
    id: 'a1-step-five',
    ref: 7,
    title: 'Step five',
    layers: [
      S.studio(),
      at(layer('flow', { nodes: [{ label: 'Quote', sub: 'back across the gap', icon: 'doc' }, { label: 'PO', sub: 'buyer likes the number', icon: 'po' }, { label: 'Done', icon: 'handshake' }] }), { area: 'lower' }),
      at(say(['nandini', 'If the margin works, he quotes it back. Buyer likes the number, sends the PO.'], ['vik', 'Done. Same evening, sometimes.']), { area: 'top' }),
    ],
    notes: 'Optional spice: “Done. Same evening, sometimes. Seedha-saadha.”',
  },
  {
    id: 'a1-the-plant',
    ref: 8,
    title: 'The plant',
    transition: 'cut',
    layers: [
      at(layer('phoneChat', { title: 'Buyer', messages: [{ from: 'them', text: '30 t TMT. Rates?' }, { from: 'me', text: 'Checking with the office, will call back' }, { from: 'them', kind: 'voice', text: '0:38' }], gap: 0.5 }), { area: [16, 6, 34, 88] }),
      at(say(['nandini', 'All of it on phone calls and WhatsApp.'], ['vik', 'All of it on phone calls and WhatsApp.']), { area: [56, 22, 40, 50] }),
    ],
    notes: 'THE LOAD-BEARING FACT. Most visually spare panel so far — the frame should feel paused. Do not add a third line.',
  },
  {
    id: 'a1-business-context',
    ref: 9,
    title: 'Business context',
    layers: [
      S.studio(),
      at(card('The business problem', '[X]% of inquiries were lost to late response. Over [Y] leads sat untapped, with no BDM bandwidth to follow up.', { ours: 'Birla Pivot is a B2B materials marketplace in the Aditya Birla Group. Buyers, sellers, and the team in between.' }), { area: 'centerNarrow' }),
    ],
    notes: 'Concession to the reader who came for numbers. A card, not a section. Loop closes at P147.',
  },
]);

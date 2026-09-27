import { at, card, layer, movement, say } from '../dsl';

const RESULTS = ['TMT Bar Fe 500 · 8 mm', 'TMT Bar Fe 500D · 8 mm', 'TMT Bar Fe 550 · 10 mm', 'TMT Bar Fe 500 · 12 mm', 'TMT Bar Fe 500D · 16 mm'];

export default movement('act2', 'Movement three: thirty line items', [
  {
    id: 'a2-the-list',
    ref: 40,
    title: 'The list',
    marker: { m: 28, a: 14 },
    layers: [
      at(layer('footage', { asset: 'buyer-list-scan', media: 'photo', caption: 'The buyer’s list from the emailed scan: twenty-odd lines of steel, handwritten' }), { area: [6, 10, 42, 80] }),
      at(say(['nandini', 'He could have done this in the field. Pluto works on a phone.'], ['vik', 'Thirty line items. On a phone.'], ['nandini', 'Right.']), { area: 'rightPad' }),
    ],
    notes: 'Closes field-vs-desk without making a meal of it: the tool was reachable, not usable where he works.',
  },
  {
    id: 'a2-one',
    ref: 41,
    title: 'One',
    marker: { m: 27, a: 13 },
    layers: [at(layer('search', { query: 'TMT steel', results: RESULTS, picked: 0, counter: '1 OF 30' }), { area: 'center' })],
    notes: 'No dialogue. Establishes the unit of labour.',
  },
  {
    id: 'a2-two',
    ref: 42,
    title: 'Two',
    transition: 'cut',
    marker: { m: 26, a: 12 },
    layers: [at(layer('search', { query: 'TMT steel', results: RESULTS, picked: 1, counter: '2 OF 30', typeIt: false }), { area: 'center' })],
    notes: 'Identical frame. Two silent identical panels, exactly like P19–21, then we accelerate.',
  },
  {
    id: 'a2-the-grind',
    ref: 43,
    title: 'The grind',
    marker: { m: 22, a: 9 },
    layers: [layer('counter', { from: 3, to: 19, total: 30, blur: true, duration: 2.6, timeFrom: '12:40 PM', timeTo: '2:55 PM' })],
    notes: 'Replaces ~15 literal additions. Search, scroll, select, add, repeated to a blur; timestamps slide forward. (Timings TBC — appendix.)',
  },
  {
    id: 'a2-the-filter',
    ref: 44,
    title: 'The filter',
    marker: { m: 20, a: 8 },
    layers: [
      layer('list', { title: 'Add line items', filter: 'Category: TMT Bars', rows: RESULTS.map((r) => ({ cells: [r, 'Add'] })) }),
      at(say(['nandini', 'Did that do anything?'], ['vik', 'No.']), { area: 'rightPad' }),
    ],
  },
  {
    id: 'a2-the-cart',
    ref: 45,
    title: 'The cart',
    marker: { m: 19, a: 8 },
    layers: [layer('cart', { count: 26 }), at(say(['vik', 'So I can’t see what I’ve already added.'], ['nandini', 'You can see that there are twenty-six of them.'], ['vik', 'Twenty-six of **what**.']), { area: 'rightPad' })],
  },
  {
    id: 'a2-obstacle-2',
    ref: 46,
    title: 'OBSTACLE 2',
    transition: 'cut',
    marker: { m: 16, a: 7 },
    lurch: true,
    layers: [
      layer('counter', { from: 30, to: 30, total: 30, ghost: true, timeFrom: '10:55 AM', timeTo: '2:55 PM' }),
      at(card('Obstacle 2', 'Four hours of a salesperson’s day, spent typing things the buyer had already told him.', { title: 'Thirty line items. All by hand.', tone: 'alert' }), { area: 'centerWide' }),
      at(layer('type', { text: '10:55 AM → 2:55 PM · four hours', variant: 'kicker' }), { area: [20, 82, 60, 10] }),
    ],
    notes: 'LARGEST SINGLE DROP IN THE DOCUMENT. The marker should visibly lurch here.',
  },
]);

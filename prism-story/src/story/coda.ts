import { at, card, designers, layer, movement, say } from './dsl';
import { S } from './scenes';

const JOURNEY = [{ m: 4, a: 5 }, { m: 60, a: 5 }, { m: 60, a: 85 }, { m: 85, a: 90 }, { m: 97, a: 97 }];

export default movement('coda', 'Coda', [
  {
    id: 'coda-debrief',
    ref: 141,
    title: 'Debrief',
    transition: 'cut',
    layers: [layer('footage', { asset: 'debrief-photo', media: 'photo', caption: 'The two of them at a whiteboard, numbers written up, a crowd in front' }), at(say(['vik', 'At the next town hall, this is what we presented.']), { area: 'topLeft' })],
    notes: 'REAL PHOTOGRAPH. (Confirm the whiteboard is legible or re-set numbers as graphics.)',
  },
  {
    id: 'coda-shape-changes',
    ref: 142,
    title: 'The shape changes',
    frame: 'band',
    transition: 'continue',
    layers: [layer('footage', { asset: 'debrief-photo', media: 'photo', caption: 'Continuation of P141' })],
    notes: 'THE FRAME ANIMATES DOWN from full-screen to a 16:9 band. The only structural device of its kind — it has to be unmistakable.',
  },
  { id: 'coda-four-months', ref: 143, title: 'Four months', transition: 'cut', layers: [layer('footage', { asset: 'montage', caption: 'Montage: war rooms, whiteboards, real photographs, fast' })] },
  { id: 'coda-in-use', ref: 144, title: 'In use', transition: 'cut', layers: [layer('footage', { asset: 'adoption', caption: 'Adoption footage: real BDMs, real screens, the thing running in the world' })] },
  { id: 'coda-result-time', ref: 145, title: 'RESULT', layers: [S.studio(), at(layer('metric', { label: 'Time to punch an order', from: 'Six hours', to: 'sixty minutes' }), { area: 'centerWide' })] },
  { id: 'coda-result-orders', ref: 146, title: 'RESULT', layers: [S.studio(), at(layer('metric', { label: 'Orders per day', from: '[X]', to: '[Y]' }), { area: 'centerWide' })], notes: 'CLAIM THE ORDERS. Let the revenue be inferred. Never state a revenue figure anywhere.' },
  {
    id: 'coda-result-selling',
    ref: 147,
    title: 'RESULT',
    layers: [S.studio(), at(layer('metric', { label: 'The BDMs went back to selling', value: '[Y] leads', sub: 'A team that had quietly become a data-entry function now has the hours to work the [Y] leads nobody had bandwidth for.' }), { area: 'centerWide' })],
    notes: 'STRUCTURAL BOOKEND: closes the loop opened at P9.',
  },
  { id: 'coda-the-journey', ref: 148, title: 'The journey', marker: { m: 97, a: 97, onChart: true }, layers: [S.studio(), at(layer('bmap', { marker: JOURNEY[4], path: JOURNEY }), { area: 'center' })], notes: 'The marker’s whole trip in one image.' },
  {
    id: 'coda-takeaways',
    ref: 149,
    title: 'Takeaways',
    layers: [
      S.studio(),
      at(
        card('Key takeaways', '', {
          tone: 'result',
          items: [
            { title: 'Match the software to the conversation, not the org chart.', body: 'The business ran on chats. The software demanded forms. Every hour lost was the cost of translating between the two.' },
            { title: 'Make effort follow intent.', body: 'The old system demanded its heaviest work at the coldest moment of a deal. Structured data should be the reward for a won order, not the price of starting one.' },
            { title: 'A required field you cannot answer does not protect your data.', body: 'It manufactures bad data, quietly, every day.' },
          ],
        }),
        { area: 'centerWide' },
      ),
    ],
  },
  { id: 'coda-gallery', ref: 150, title: 'Gallery', layers: [layer('gallery', { items: ['Connect', 'Prism', 'The AI layer', 'The CM view'] })], notes: 'The screens, properly. For the reader who came for the craft.' },
  {
    id: 'coda-close',
    ref: 151,
    title: 'Close',
    layers: [S.office(), ...designers({ pose: 'desk', size: 'l', enter: 'fade' }), at(say(['nandini', 'Dhanda at Birla Pivot is still very simple.'], ['vik', 'It just takes an hour now.']), { area: 'top' })],
    notes: 'Bookend to the first line. Same framing as panel 1, hats off. Land quietly and stop.',
  },
]);

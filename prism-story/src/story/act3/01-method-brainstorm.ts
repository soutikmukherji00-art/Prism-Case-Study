import type { WhiteboardProps } from '../../components/ui/boards';
import { at, card, char, designers, layer, movement, say } from '../dsl';
import { S } from '../scenes';

type Item = WhiteboardProps['items'][number];
const IDEAS = ['Put all the fields on one page', 'Remove some fields', 'Remove ALL of them', 'Capture only header details'];

/** Whiteboard state after `n` ideas: earlier ones struck, the newest written. */
const board = (items: Item[], animate: WhiteboardProps['animate']) => at(layer('whiteboard', { heading: 'Ideas', items, animate }), { area: [4, 6, 60, 88] });
const upTo = (n: number, lastState: Item['state'] = 'plain'): Item[] =>
  IDEAS.slice(0, n).map((text, i) => ({ text, state: i < n - 1 ? 'struck' : lastState }));
const vikAtBoard = (enter: 'none' | 'fade' = 'none') => char('vik', { x: 80, size: 'l', pose: 'pointing', enter, facing: 'left' });

export const method = movement('act3', 'Movement one: the method', [
  {
    id: 'a3-the-board',
    ref: 64,
    title: 'The board',
    transition: 'cut',
    tally: null,
    layers: [
      S.whiteboard(),
      at(layer('detectiveBoard', { items: ['Pluto dashboard', '“Manual Inquiry”', 'CALL 1 → CALL 6', '9:40 · 11:15 · 2:05', '30 line items', 'LOST · 6:51 PM'] }), { area: [16, 4, 68, 64] }),
      char('vik', { x: 10, size: 'm', pose: 'hat', enter: 'slideLeft' }),
      char('nandini', { x: 90, size: 'm', pose: 'hat', enter: 'slideRight' }),
      at(say(['vik', 'Before we fixed anything, we followed him.']), { area: [16, 72, 68, 24] }),
    ],
    notes: 'The conceit earns the method: a diary study made readable without sounding like a deliverable. Tonal jump from the silent floor is deliberate.',
  },
  {
    id: 'a3-method',
    ref: 65,
    title: 'Method',
    layers: [S.studio(), at(card('Method · Diary study', '[N] BDMs, shadowed over [N] days on live inquiries. We recorded what they did, what tool they were in, and what they were trying to get done. Shared with their permission.', { tone: 'method' }), { area: 'centerNarrow' })],
  },
  {
    id: 'a3-the-day',
    ref: 66,
    title: 'The day',
    layers: [S.studio(), layer('dayBar', { segments: [{ label: 'Pluto', share: 47, tone: 'strong' }, { label: 'Calls & WhatsApp', share: 45, tone: 'muted' }, { label: 'Selling', share: 8, tone: 'accent' }] })],
    notes: 'The only conventional data visualisation in the document. Let the proportions speak. No dialogue.',
  },
  {
    id: 'a3-the-thesis',
    ref: 67,
    title: 'The thesis',
    layers: [
      S.office(),
      at(layer('dayBar', { segments: [{ label: 'Pluto', share: 47, tone: 'strong' }, { label: 'Calls & WhatsApp', share: 45, tone: 'muted' }, { label: 'Selling', share: 8, tone: 'accent' }] }), { area: [10, 4, 80, 30], hold: 0 }),
      ...designers({ size: 'l', enter: 'fade' }),
      at(say(['nandini', 'He isn’t a salesman any more. He’s a data entry operator.']), { area: [50, 36, 46, 20] }),
    ],
    notes: 'THE THESIS LINE. Nandini gets it because it is a conclusion, not an idea.',
  },
]);

export const brainstorm = movement('act3', 'Movement two: the brainstorm, including the failures', [
  { id: 'a3-idea-1', ref: 68, title: 'First idea', layers: [S.whiteboard(), board(upTo(1), 'write'), vikAtBoard('fade'), at(say(['vik', 'Put all the fields on one page. No steps, no next, no back.']), { area: [64, 4, 34, 36] })] },
  {
    id: 'a3-rejected',
    ref: 69,
    title: 'Rejected',
    transition: 'continue',
    layers: [
      S.whiteboard(),
      board(upTo(1, 'struck'), 'strike'),
      vikAtBoard(),
      at(say(['nandini', 'Then it’s one very long page instead of six short ones.']), { area: [64, 4, 34, 30] }),
      at(card('Cognitive load', 'Consolidating a long form onto a single page relocates the burden. It does not reduce it. The work is the same; the reader can now see all of it at once, which is worse.', { tone: 'insight' }), { area: [30, 58, 46, 38] }),
    ],
  },
  { id: 'a3-idea-2', ref: 70, title: 'Second idea', transition: 'continue', layers: [S.whiteboard(), board(upTo(2), 'write'), vikAtBoard(), at(say(['nandini', 'Remove some of them.'], ['vik', 'Which ones? Every team that asked for a field had a reason.']), { area: [64, 4, 34, 50] })] },
  { id: 'a3-idea-3', ref: 71, title: 'Third idea', transition: 'continue', layers: [S.whiteboard(), board(upTo(3), 'write'), vikAtBoard(), at(say(['vik', 'Remove all of them.'], ['nandini', 'And then how does the order get placed?']), { area: [64, 4, 34, 50] })] },
  { id: 'a3-idea-4', ref: 72, title: 'Fourth idea', transition: 'continue', layers: [S.whiteboard(), board(upTo(4), 'write'), vikAtBoard(), at(say(['vik', 'Okay. We only capture header details up front, and the rest comes later.']), { area: [64, 4, 34, 40] })] },
  {
    id: 'a3-struck-twice',
    ref: 73,
    title: 'Struck through twice',
    transition: 'continue',
    layers: [S.whiteboard(), board(upTo(4, 'struck2'), 'strike2'), vikAtBoard(), at(say(['nandini', 'No BDM on earth knows what a header detail is.']), { area: [64, 4, 34, 30] })],
    notes: 'Rejected as a solution and as language, in one line. Half of Pluto’s problems were vocabulary.',
  },
  {
    id: 'a3-the-pivot',
    ref: 74,
    title: 'The pivot',
    transition: 'continue',
    layers: [S.whiteboard(), board(upTo(4, 'struck2'), 'none'), char('vik', { x: 80, size: 'l', pose: 'idle', enter: 'none', facing: 'left' }), at(say(['vik', 'What is actually wrong with collecting it unstructured?']), { area: [64, 4, 34, 40] })],
    notes: 'The pivot arrives as a question, and from the failures — which is why keeping all of them matters.',
  },
  { id: 'a3-beat', ref: 75, title: 'Beat', transition: 'continue', layers: [S.whiteboard(), board(upTo(4, 'struck2'), 'none'), char('vik', { x: 80, size: 'l', enter: 'none', facing: 'left' }), char('nandini', { x: 94, size: 'm', enter: 'fade', facing: 'left' })], notes: 'No dialogue. The whiteboard, the two of them, a pause.' },
  {
    id: 'a3-lightbulb',
    ref: 76,
    title: 'LIGHTBULB',
    transition: 'cut',
    layers: [S.studio(), at(layer('iconMark', { icon: 'bulb', size: 110 }), { area: [40, 6, 20, 34] }), at(say(['vik', 'What if we just capture the chats?']), { area: [15, 46, 70, 30], })],
    notes: 'MAXIMUM READER VELOCITY STARTS HERE. Everything to P104 works against the reader’s impatience.',
  },
]);

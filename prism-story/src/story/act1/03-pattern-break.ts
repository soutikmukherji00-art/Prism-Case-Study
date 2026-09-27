import { at, card, char, layer, movement, say } from '../dsl';
import { S } from '../scenes';

/** P19–21 must be framed identically; only scale changes. The effect dies if the camera moves. */
const clicking = (zoom: number) => ({
  transition: 'cut' as const,
  camera: { zoom, y: (zoom - 1) * 180 },
  layers: [S.karishmaDesk(), char('karishma', { x: 50, y: 108, size: 'xl' as const, pose: 'from-behind' as const, enter: 'none' as const, tag: zoom === 1 })],
});

export default movement('act1', 'Movement three: the pattern break', [
  { id: 'a1-pattern-1', ref: 19, title: 'Pattern, beat one', ...clicking(1), notes: 'Seen from behind and slightly above. Clicking. No dialogue.' },
  { id: 'a1-pattern-2', ref: 20, title: 'Pattern, beat two', ...clicking(1.15), notes: 'Identical framing, pushed in. Only scale changes.' },
  { id: 'a1-pattern-3', ref: 21, title: 'Pattern, beat three', ...clicking(1.3), notes: 'Three silent panels is the correct risk: the reader has to get slightly bored for the next panel to work.' },
  {
    id: 'a1-pattern-break',
    ref: 22,
    title: 'PATTERN BREAK',
    transition: 'cut',
    layers: [layer('footage', { asset: 'karishma-desk', caption: 'Karishma at her actual desk doing exactly what the illustration was doing. Face not visible. Same framing as P19–21' })],
    notes: 'HIGHEST-VALUE CRAFT BEAT. Real footage in identical framing. Do not caption it, do not label it “real user research”, no play button.',
  },
  {
    id: 'a1-the-naming',
    ref: 23,
    title: 'The naming',
    transition: 'continue',
    layers: [
      layer('footage', { asset: 'karishma-desk', caption: 'Dimmed continuation of P22' }),
      layer('dim', {}),
      at(
        card(
          'NN/g heuristic · Match between the system and the real world',
          'A system should speak the user’s language, with words and concepts familiar to them, rather than internal jargon. It should follow real-world conventions and make information appear in a natural, logical order.',
          { ours: 'The business ran on conversations. The software ran on forms. Every order was a translation between the two, done by hand, by the person least able to spare the time.', tone: 'insight' },
        ),
        { area: 'centerWide' },
      ),
    ],
    notes: 'Theory arrives only after the reader has felt it. The last paragraph is ours, not NN/g’s — visually separated.',
  },
  {
    id: 'a1-the-turn',
    ref: 24,
    title: 'The turn',
    transition: 'cut',
    layers: [
      S.office(),
      char('vik', { x: 30, pose: 'hat', size: 'l', enter: 'drop' }),
      char('nandini', { x: 70, pose: 'hat', size: 'l', enter: 'drop' }),
      at(layer('iconMark', { icon: 'magnifier', size: 90 }), { area: [42, 40, 16, 24] }),
      at(say(['vik', 'I have never actually watched someone fill that form.'], ['nandini', 'Neither have I.'], ['vik', 'Should we?']), { area: 'top' }),
    ],
    notes: 'Detective hats. Full silliness, exactly when the document would otherwise turn earnest. Three bubbles: the rhythm is the joke. Hard cut into Act 2 — no “so we opened the tool”.',
  },
]);

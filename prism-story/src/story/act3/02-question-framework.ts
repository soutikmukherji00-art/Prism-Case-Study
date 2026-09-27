import { at, card, char, layer, movement, say } from '../dsl';
import { S } from '../scenes';

const FLOOR = { m: 4, a: 5 };
const chart = (props: Parameters<typeof layer<'bmap'>>[1]) => at(layer('bmap', props), { area: [4, 6, 56, 88] });

export const crossQuestion = movement('act3', 'Movement three: the cross-question', [
  {
    id: 'a3-the-question',
    ref: 77,
    title: 'The question',
    transition: 'cut',
    layers: [S.studio(), char('nandini', { x: 36, size: 'xl', enter: 'none' }), at(say(['nandini', 'Why would they come to us?']), { area: 'rightPad' })],
    notes: 'THE HINGE OF THE DOCUMENT. A real objection, so no pause before it: she is already talking.',
  },
  {
    id: 'a3-full-objection',
    ref: 78,
    title: 'The full objection',
    transition: 'continue',
    layers: [S.studio(), char('nandini', { x: 36, size: 'xl', enter: 'none', pose: 'gesture' }), at(say(['nandini', 'They’re on WhatsApp. It works, it’s free, and every buyer they sell to is already there. Why would a single BDM open our thing instead?'], ['nandini', 'And don’t say because leadership will make them.']), { area: 'rightPad' })],
    notes: 'She pre-empts the weak answer: the difference between a case study and a feature list.',
  },
  { id: 'a3-conceded', ref: 79, title: 'Conceded', layers: [S.studio(), char('vik', { x: 64, size: 'xl', enter: 'fade' }), at(say(['vik', '...Okay. Good question.']), { area: 'leftPad' })] },
]);

export const framework = movement('act3', 'Movement four: the framework, used rather than taught', [
  {
    id: 'a3-axes',
    ref: 80,
    title: 'Axes',
    layers: [S.whiteboard(), chart({ zones: false, threshold: false }), at(say(['vik', 'Alright. Two things have to be true before anybody does anything.']), { area: 'rightPad' })],
    notes: 'The whiteboard is wiped. Two axes, nothing else. The framework is grabbed mid-argument, not introduced.',
  },
  {
    id: 'a3-the-reveal',
    ref: 81,
    title: 'THE REVEAL',
    transition: 'continue',
    marker: { ...FLOOR, onChart: true },
    markerNamed: true,
    layers: [S.whiteboard(), chart({ zones: false, threshold: false, marker: FLOOR, fromCorner: FLOOR }), at(say(['vik', 'This is where he was. The whole time.']), { area: 'rightPad', after: 0.2 })],
    notes: 'THE PAYOFF THAT MAKES THE TEACHING A REWARD. The corner marker lifts out and lands on the chart. Same shape, same colour. Act 2 becomes retroactively rigorous.',
  },
  {
    id: 'a3-the-model',
    ref: 82,
    title: 'The model',
    layers: [S.studio(), at(card('#Psychology insight · Behavior map', 'A behaviour happens when Motivation, Ability and a Prompt arrive at the same moment. Remove any one and nothing happens, however strong the other two are.\nBJ Fogg, Behavior Design Lab, Stanford University.', { title: 'B = M · A · P', tone: 'insight' }), { area: 'centerNarrow' })],
  },
  {
    id: 'a3-threshold',
    ref: 83,
    title: 'The threshold',
    marker: { ...FLOOR, onChart: true },
    layers: [S.whiteboard(), chart({ marker: FLOOR, threshold: 'draw' }), at(say(['nandini', 'Below this line, nothing you do works.']), { area: 'rightPad' })],
  },
  {
    id: 'a3-prompt-never-worked',
    ref: 84,
    title: 'The prompt that never worked',
    transition: 'continue',
    marker: { ...FLOOR, onChart: true },
    layers: [S.whiteboard(), chart({ marker: FLOOR, burst: 'fail' }), at(say(['vik', 'Every reminder Pluto ever sent him was below this line.'], ['nandini', 'Pluto never sent him anything.'], ['vik', 'Right. Even better.']), { area: 'rightPad' })],
    notes: 'Payoff of P51 with a concrete referent. The absence of notifications was a system that had given up on prompting anyone.',
  },
  {
    id: 'a3-ability-defined',
    ref: 85,
    title: 'Ability, defined',
    layers: [S.studio(), at(card('#Psychology insight · The five ability resources', 'Ability is capped by whichever is scarcest at the moment of action. For a BDM mid-deal, the scarce ones are time and mental capacity, and the old inquiry form spent both before he had a single price.', { title: 'Time · Money · Physical capacity · Mental capacity · Practice', tone: 'insight' }), { area: 'centerWide' })],
  },
  {
    id: 'a3-two-directions',
    ref: 86,
    title: 'Two directions',
    marker: { ...FLOOR, onChart: true },
    layers: [S.whiteboard(), chart({ marker: FLOOR, arrows: ['up', 'right'] }), at(say(['vik', 'So we need two different things. Not one.']), { area: 'rightPad' })],
    notes: 'STRUCTURAL HINGE: the two-product reveal becomes inevitable rather than a coincidence of naming.',
  },
]);

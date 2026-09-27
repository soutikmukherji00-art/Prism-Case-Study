import { at, card, layer, movement, say } from '../dsl';
import type { FieldProps } from '../../components/ui/forms';

/** Every panel in this movement is one field of the old form + the designers reacting. */
const field = (label: string, extra: Omit<FieldProps, 'label'> = {}) => layer('field', { label, step: 'Step 2 of 6 · Requirement', ...extra });

export default movement('act2', 'Movement two: the questions he cannot answer', [
  {
    id: 'a2-parent-quote',
    ref: 32,
    title: 'Parent quote',
    marker: { m: 40, a: 20 },
    layers: [field('Parent Quote'), at(say(['vik', 'Parent quote.'], ['nandini', 'Do you know what that is?'], ['vik', 'No.']), { area: 'rightPad' })],
    notes: 'Verbatim Pluto labels from here to P38. Real jargon is funnier than invented jargon, and it is also the evidence.',
  },
  {
    id: 'a2-scope-of-unloading',
    ref: 33,
    title: 'Scope of unloading',
    marker: { m: 38, a: 18 },
    layers: [field('Scope of Unloading'), at(say(['vik', 'I didn’t ask my buyer this.']), { area: 'rightPad' })],
    notes: 'Switch to first person, unannounced: from here to the end of the audit Vik speaks AS the BDM.',
  },
  {
    id: 'a2-call-one',
    ref: 34,
    title: 'Call one',
    transition: 'continue',
    marker: { m: 36, a: 18 },
    tally: 1,
    layers: [at(field('Scope of Unloading'), {}), at(say(['vik', 'So now I call him again.']), { area: 'rightPad' })],
    notes: 'A phone icon enters top right and a tally begins. It increments quietly for the rest of the act and is never remarked on (except P48).',
  },
  {
    id: 'a2-expected-eta',
    ref: 35,
    title: 'Expected ETA',
    marker: { m: 34, a: 16 },
    layers: [field('Expected ETA', { required: true, error: 'This field is required', placeholder: 'DD / MM / YYYY' }), at(say(['vik', 'Expected ETA. I haven’t spoken to the seller yet. I don’t have an ETA.'], ['nandini', 'It’s mandatory.']), { area: 'rightPad' })],
    notes: 'The hero panel used on every moodboard direction.',
  },
  {
    id: 'a2-the-number',
    ref: 36,
    title: 'The number',
    transition: 'continue',
    marker: { m: 32, a: 15 },
    layers: [
      at(field('Expected ETA', { required: true, error: 'This field is required', typed: '20 / 03 / 2026' }), { area: 'topLeft' }),
      at(say(['vik', 'So he types a number.'], ['nandini', 'He types a number.'], ['vik', 'Every day. Every inquiry. Somebody types a number.']), { area: 'topRight' }),
      at(card('A required field you cannot answer does not protect your data', 'It manufactures bad data, quietly, at scale. This inquiry now carries a delivery date that nobody believes, in a system that other teams plan against.', { tone: 'alert' }), { area: 'lower', after: 0.3 }),
    ],
    notes: 'Second use of the repetition device, for weight. The asterisk goes quiet. The card says the hard thing so the characters do not have to.',
  },
  {
    id: 'a2-credit',
    ref: 37,
    title: 'Credit availability',
    marker: { m: 30, a: 15 },
    tally: 2,
    layers: [field('Credit Availability'), at(say(['vik', 'Don’t know.']), { area: 'rightPad' })],
  },
  {
    id: 'a2-asked-price',
    ref: 38,
    title: 'Buyer’s asked price',
    marker: { m: 29, a: 14 },
    tally: 3,
    layers: [field('Buyer’s Asked Price'), at(say(['vik', 'Never asked him. He’d have told me if I’d asked.']), { area: 'rightPad' })],
    notes: 'Rueful, not angry. The system asked at the wrong time, not the wrong question.',
  },
  {
    id: 'a2-obstacle-1',
    ref: 39,
    title: 'OBSTACLE 1',
    transition: 'cut',
    marker: { m: 28, a: 14 },
    tally: 4,
    layers: [at(card('Obstacle 1', 'Not because he was careless. Because the information arrives in pieces, over hours, across three apps, and the form wants all of it at once.', { title: 'He didn’t collect enough information from the buyer.', tone: 'alert' }), { area: 'centerWide' })],
    notes: 'Act 3 pivot and Act 4 payoff. The second paragraph matters more than the headline: without it the reader blames the BDM.',
  },
]);

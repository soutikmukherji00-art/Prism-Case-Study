import { at, char, layer, movement, quote, say } from '../dsl';
import { S } from '../scenes';

const table = (enter: 'rise' | 'none' = 'none', karishmaPose: Parameters<typeof char>[1] = {}) => [
  S.canteen(),
  char('vik', { x: 22, enter }),
  char('nandini', { x: 45, enter }),
  char('karishma', { x: 72, size: 'l', enter, ...karishmaPose }),
];

export default movement('act1', 'Movement two: lunch', [
  {
    id: 'a1-scene-change',
    ref: 10,
    title: 'Scene change',
    layers: [...table('rise'), at(say(['vik', 'This is a Tuesday. We are at lunch.']), { area: 'topLeft' })],
    notes: 'Lower the temperature before the inciting incident. No research session — lunch. The casualness makes the next four panels feel found.',
  },
  {
    id: 'a1-the-vent',
    ref: 11,
    title: 'The vent',
    transition: 'continue',
    layers: [...table('none', { pose: 'gesture' }), at(say(['karishma', 'I wasted my **entire day** yesterday trying to punch an order.']), { area: 'topLeft' })],
    notes: 'Karishma is not performing frustration, she is describing her Monday. Longer sentences, specific about her work.',
  },
  {
    id: 'a1-turn-of-the-knife',
    ref: 12,
    title: 'The turn of the knife',
    transition: 'continue',
    mood: 'still',
    layers: [...table('none', { pose: 'gesture' }), at(say(['karishma', 'And the order got cancelled.']), { area: 'topLeft' })],
    notes: 'Own panel = a pause. Nothing moves.',
  },
  {
    id: 'a1-human-first',
    ref: 13,
    title: 'Human first',
    layers: [S.canteen(), char('vik', { x: 34, size: 'xl', pose: 'sad', enter: 'fade' }), char('nandini', { x: 66, size: 'xl', pose: 'sad', enter: 'fade' }), at(say(['vik', 'That’s... really sad.']), { area: 'topLeft' })],
    notes: 'CRITICAL TONE BEAT. If only one line in Act 1 survives editing intact, make it this one.',
  },
  {
    id: 'a1-the-question',
    ref: 14,
    title: 'The question',
    layers: [S.canteen(), char('nandini', { x: 55, size: 'xl', pose: 'lean', enter: 'fade' }), at(say(['nandini', 'Why did it take a whole day?']), { area: 'topRight' })],
    notes: 'Five words that start the investigation. She asks one question and stops.',
  },
  {
    id: 'a1-contradiction-lands',
    ref: 15,
    title: 'The contradiction lands',
    layers: [S.canteen(), char('karishma', { x: 50, size: 'xl', pose: 'hands-apart', enter: 'fade' }), at(say(['karishma', 'Have you seen the inquiry form? Thirty line items. Every single one by hand.']), { area: 'topLeft' })],
    notes: 'The reader FEELS the contradiction here (phone-run business, form-run software). Nobody names it until P23. Optional spice: “Poora din just filling boxes.”',
  },
  {
    id: 'a1-the-wait',
    ref: 16,
    title: 'The wait',
    transition: 'continue',
    layers: [
      S.canteen(),
      char('karishma', { x: 40, size: 'xl', pose: 'talking', enter: 'none' }),
      at(say(['karishma', 'And then I’m just waiting. The category manager hasn’t responded, and there’s no way to know if he’s even opened it.']), { area: 'topLeft' }),
      at(layer('status', { title: 'Inquiry #0412', label: 'AWAITING RESPONSE', tone: 'waiting' }), { area: [64, 52, 32, 36] }),
    ],
    notes: 'Seeds the no-reminders problem: pays off at P51 and in Act 3 when Prism’s reminders arrive.',
  },
  {
    id: 'a1-the-absurdity',
    ref: 17,
    title: 'The absurdity',
    transition: 'continue',
    layers: [S.canteen(), char('karishma', { x: 40, size: 'xl', pose: 'shrug', enter: 'none' }), at(say(['karishma', 'By six o’clock I called him anyway. Like I always do.']), { area: 'topRight' })],
  },
  {
    id: 'a1-the-quote',
    ref: 18,
    title: 'THE QUOTE',
    transition: 'cut',
    layers: [quote('I waste so much time filling out the forms even though at the end of the day I have to call him anyway to get my answer.', 'Karishma · Business Development Manager')],
    notes: 'The thesis, in her own words, eighteen panels in. First time the document stops looking like a comic. Typographic only.',
  },
]);

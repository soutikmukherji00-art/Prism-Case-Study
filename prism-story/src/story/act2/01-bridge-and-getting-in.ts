import { at, card, char, layer, movement, say } from '../dsl';
import { S } from '../scenes';

export const bridge = movement('act2', 'Bridge: how the requirement actually arrives', [
  {
    id: 'a2-morning-field',
    ref: 25,
    title: 'Morning, in the field',
    transition: 'cut',
    layers: [S.site(), char('buyer', { x: 68, pose: 'gesture', size: 'l' }), char('bdm', { x: 32, pose: 'phone', size: 'l' }), at(say(['vik', 'The requirement never arrives as a document.']), { area: 'topLeft' })],
    notes: 'Makes Obstacle 1 structural rather than a personal failing. The BDM is listening, not writing anything down.',
  },
  {
    id: 'a2-in-pieces',
    ref: 26,
    title: 'In pieces',
    layers: [
      S.studio(),
      layer('fragments', {
        items: [
          { time: '9:40 AM', channel: 'call', text: 'A call: “thirty tonnes, mostly 8 and 10 mm”' },
          { time: '11:15 AM', channel: 'voice', text: 'A WhatsApp voice note' },
          { time: '2:05 PM', channel: 'email', text: 'An email with a scanned list attached' },
        ],
      }),
      at(say(['nandini', 'It comes in pieces. Over hours. Across three different apps.'], ['vik', 'Because sitting the buyer down and asking for all of it at once takes a week.']), { area: 'rightPad' }),
    ],
    notes: 'THE MOST IMPORTANT NEW PANEL. The form demands a complete picture at one moment; the picture never exists at one moment. Prism’s answer (P95) reuses these timestamps.',
  },
]);

export const gettingIn = movement('act2', 'Movement one: getting in', [
  {
    id: 'a2-the-desk',
    ref: 27,
    title: 'The desk',
    transition: 'cut',
    marker: { m: 55, a: 35 },
    layers: [layer('appWindow', { app: 'Pluto', title: 'Dashboard' }), at(say(['vik', 'Okay. New inquiry. Where do I... where do I even start?']), { area: 'strip' })],
    notes: 'The marker enters unannounced, bottom-left, and stays for the rest of the document. Do not caption it. Payoff at P81.',
  },
  {
    id: 'a2-the-plus',
    ref: 28,
    title: 'The plus',
    marker: { m: 52, a: 28 },
    layers: [
      layer('appWindow', { app: 'Pluto', title: 'Dashboard', focus: 'plus' }),
      at(say(['nandini', 'There.'], ['vik', 'Where?'], ['nandini', 'The plus. In the corner.'], ['vik', 'That plus? That is a **very** small plus.']), { area: [62, 28, 34, 70] }),
    ],
    notes: 'Four bubbles: the only panel in the act with four. The rhythm is the joke.',
  },
  {
    id: 'a2-upload',
    ref: 29,
    title: 'Upload a document',
    marker: { m: 48, a: 25 },
    layers: [layer('modal', { title: 'Upload inquiry document', body: 'Upload the buyer’s requirement document to create an inquiry.', drop: 'Drop PDF, XLS or DOC' }), at(say(['vik', 'It wants a document.'], ['nandini', 'He has a voice note and a photo of a list.']), { area: 'rightPad' })],
  },
  {
    id: 'a2-manual-inquiry',
    ref: 30,
    title: 'Manual inquiry',
    marker: { m: 45, a: 24 },
    layers: [
      layer('menu', { title: 'Create inquiry', options: ['Upload document', 'Manual Inquiry'], highlight: 1 }),
      at(say(['vik', '“Manual inquiry.”'], ['nandini', 'Mm.'], ['vik', 'As opposed to?'], ['nandini', 'Exactly.']), { area: 'topRight' }),
      at(card('System language', 'The option is named after the backend process that creates it, not the job the user is doing. Every inquiry this BDM has ever raised was manual. The word only means something to the people who built it.'), { area: [52, 52, 44, 44] }),
    ],
    notes: 'Movement one is deliberately fast and funny. Five panels, light touch, out.',
  },
  {
    id: 'a2-form-opens',
    ref: 31,
    title: 'The form opens',
    marker: { m: 42, a: 22 },
    layers: [layer('stepper', { title: 'New inquiry', steps: 6, current: 1 }), at(say(['vik', 'How many of these are there?']), { area: 'rightPad' })],
  },
]);

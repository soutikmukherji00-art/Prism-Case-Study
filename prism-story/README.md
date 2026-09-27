# Prism & Connect — interactive case study (prototype v0)

A click-through, keyboard-driven comic of the 151-panel script. **v0 is deliberately theme-less**: placeholder characters, wireframe product screens, labelled scene and footage slots. Its job is to test whether the flow actually works when you click through it, before any art is made.

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # type-check + story validation tests
npm run build      # static site in dist/
```

## Reading it

| Input | Action |
|---|---|
| `→` `space` `enter` / right arrow button | Next. If the panel is still animating, the first press settles it and the second advances. |
| `←` / left arrow button | Back (always lands on a settled panel) |
| `Home` / `End` | First / last panel |
| Click the progress bar | Jump within an act |
| `D` | Dev overlay: panel id, script panel number, the script's note, layer timeline, marker/tally state |
| `G` or **Storyboard** | `#/board`: every panel grouped by act and movement, with validation issues. Click any card to jump. |
| **Assets** | `#/assets`: every art/footage slot the story asks for, and whether a file exists |

Every panel is deep-linkable: `#/p/a2-expected-eta`.

## How it's built

```
src/
  story/            ← THE SCRIPT AS DATA (edit this to re-cut the story)
    index.ts          order of movements = order of the story
    act1/ … act4/, coda.ts   one file per movement, panels in order
    dsl.ts            helpers: say(), char(), card(), at() …
    cast.ts           characters, colours, which side their bubbles lean
    scenes.ts         recurring backgrounds
  layers/index.ts   ← REGISTRY: which components a panel may use
  components/       ← reusable, theme-free building blocks
    character/        Character entrance + placeholder figure (poses)
    dialogue/         Speech bubbles, revealed one by one
    callout/          Call-out card reveal (items, "ours" paragraph)
    typographic/      Full-bleed quote / title / product-name panels
    scene/            Scene backgrounds, real-footage slots, split frame, dim
    charts/           B=MAP chart (incl. the P81 corner-to-chart reveal), day bar, metric
    hud/              Persistent marker + call tally
    ui/               Wireframe Pluto / Connect / Prism screens (field, chat, lists, shimmer…)
    primitives/       Asset loader, RichText, Chip, Icon, Typewriter
  engine/           ← player, timeline, navigation, HUD fold, validation, dev pages
  motion/presets.ts ← named entrance animations (rise, pop, stamp, slideLeft…)
  theme/            ← design tokens (CSS variables) + motion settings
  assets/files/     ← drop real art here (see below)
```

### Three ideas that keep re-cutting cheap

1. **A panel is a list of layers.** Each layer is plain data, `{ kind: 'callout', label, body }`, placed in a named **area** (`leftPad`, `strip`, `topRight`…). There are no pixel positions in story files.
2. **Timing is automatic.** Layers play in the order they're written, each starting when the previous one finishes (dialogue holds for reading time). The only knobs are `after` (gap), `sync` (start with the previous layer), `at` (absolute) and `hold` (override the duration). `theme.motion.pace` speeds up or slows down the whole story.
3. **Continuity is derived, never stored.** The marker, call tally and frame shape are worked out by folding over the panel list (`engine/hud.ts`). Move a panel and the corner widgets stay correct. Panels have stable **ids**; the visible numbers come from their position.

### Common edits

- **Change a line:** find it in `src/story/…` (the `D` overlay shows the panel id), edit the text. `**word**` stresses a word, `` `Label` `` renders a verbatim UI label, and `[X]` flags a value still to be confirmed.
- **Move, cut or merge panels:** reorder the objects inside a movement file, or reorder whole movements in `story/index.ts`. Then run `npm run check`. It fails on duplicate ids, unknown characters or unknown layer kinds. It also warns when a panel from the original script goes missing; delete that test once the story stops mirroring the script.
- **Add a new kind of layer:** write the component (props = plain data) → register it in `src/layers/index.ts` with its entrance duration and default area → use `{ kind: 'yourKind', … }` in a panel. The types update automatically.
- **Add an interaction:** see `PersonaToggle` (P108, click) and `List` hover cards (P121). Interactive components call `stopPropagation` so they never fight the navigation.

## Replacing assets (theme pass)

Drop files into `src/assets/files/` using the keys listed at **#/assets**. They're picked up automatically; no code changes are needed.

```
src/assets/files/characters/karishma/idle.png     one idle image per character already replaces every placeholder
src/assets/files/characters/karishma/shrug.png    pose-specific art overrides idle for that pose
src/assets/files/scenes/canteen.jpg
src/assets/files/footage/karishma-desk.mp4        video or image
```

Any of png, jpg, webp, svg, gif, avif, mp4 or webm works. Characters are bottom-anchored at a 120:210 aspect ratio, so trim art to the figure.

## Theming (v1)

- `src/theme/neutral.css` holds every colour, font, radius and shadow as CSS variables. A theme is a copy with new values, plus optional overrides of component classes (`.bubble`, `.callout`, `.chip`…).
- `src/theme/index.ts` holds the motion feel: spring, easing, panel fade, global pace.
- `src/motion/presets.ts` defines the named entrances. Retune `stamp` or `rise` once and every panel follows.

The plan for v1: pick a direction from the Figma moodboard → drop in assets → add `theme/<direction>.css` and adjust the motion settings. At that point only presentation changes; the story files stay as they are.

## Known gaps in v0

- Timings (`[X]`, `[N]`, clock times, CALL counts) follow the script's appendix and are flagged where unconfirmed.
- Buyer, seller and colleague names other than Sunvik Corporation are `[placeholders]`.
- There's no sound, no mobile-portrait layout, and no "summary track" page yet.

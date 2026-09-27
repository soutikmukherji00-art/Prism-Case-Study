import { motion } from 'motion/react';
import { useBeat, useReached, useStepper } from '../../engine/BeatContext';
import { enter, paced } from '../../motion/presets';
import { Chip } from '../primitives/Chip';
import { Icon } from '../primitives/Icon';
import { RichText } from '../primitives/RichText';
import { Typewriter, typingDuration } from '../primitives/Typewriter';
import { UIEnter, Window } from './Window';

/* ───────── Field: one labelled input of the old form (P32–38, P47–48) ───────── */
export interface FieldProps {
  label: string;
  app?: string;
  step?: string;
  required?: boolean;
  /** Inline error shown under the input. Clears once `typed` finishes. */
  error?: string;
  /** Pre-filled value. */
  value?: string;
  /** Text typed into the field on the timeline. */
  typed?: string;
  placeholder?: string;
  /** Faded fields below, to show there are more. */
  ghosts?: string[];
}
const TYPE_AT = 0.9;
export const fieldDuration = (p: FieldProps) => 0.7 + (p.typed ? TYPE_AT + typingDuration(p.typed) : 0);

export function Field({ label, app = 'Pluto', step, required, error, value, typed, placeholder = 'Enter a value', ghosts }: FieldProps) {
  const typedDone = useReached(typed ? TYPE_AT + typingDuration(typed) : 0);
  const showError = !!error && !(typed && typedDone);
  return (
    <UIEnter>
      <Window app={app} title="New inquiry">
        {step && <div className="field__step">{step}</div>}
        <div className="field__label">
          <RichText text={label} />
          {required && <span className={showError ? 'field__req' : ''} style={{ opacity: showError ? 1 : 0.35 }}>*</span>}
        </div>
        <div className={`field__input${showError ? ' field__input--error' : ''}`}>
          {typed ? <Typewriter text={typed} offset={TYPE_AT} /> : value ? value : <span className="field__placeholder">{placeholder}</span>}
          {!typed && !value && <span className="caret" />}
        </div>
        {showError && <div className="field__error">{error}</div>}
        {ghosts?.map((g) => (
          <div key={g} className="field__ghost"><span>{g}</span><div /></div>
        ))}
      </Window>
    </UIEnter>
  );
}

/* ───────── Stepper: the multi-step form opening (P31) ───────── */
export interface StepperProps { title: string; steps: number; current: number; app?: string }
export function Stepper({ title, steps, current, app = 'Pluto' }: StepperProps) {
  const n = useStepper(steps, 0.12, 0.3);
  return (
    <UIEnter>
      <Window app={app} title={title}>
        <div className="stepper">
          {Array.from({ length: steps }, (_, i) => (
            <span key={i} style={{ display: 'contents' }}>
              {i > 0 && <span className="stepper__line" />}
              <motion.span className={`stepper__dot${i + 1 === current ? ' stepper__dot--on' : ''}`} animate={{ opacity: i < n ? 1 : 0 }} initial={false}>{i + 1}</motion.span>
            </span>
          ))}
        </div>
        <div className="field__step">Step {current} of {steps}</div>
        {[80, 60, 70, 40].map((w, i) => <div key={i} className="field__ghost"><span className="skel" style={{ width: `${w * 0.4}%` }} /><div /></div>)}
      </Window>
    </UIEnter>
  );
}
export const stepperDuration = (p: StepperProps) => 0.6 + p.steps * 0.12;

/* ───────── Menu: a dropdown with one option ringed (P30) ───────── */
export interface MenuProps { title: string; options: string[]; highlight?: number; app?: string }
export function Menu({ title, options, highlight, app = 'Pluto' }: MenuProps) {
  const { start, instant } = useBeat();
  return (
    <UIEnter>
      <Window app={app} title={title}>
        <div className="menu">
          {options.map((o, i) => (
            <motion.div key={o} className="menu__item" {...enter('drop', start + 0.3 + i * 0.12, instant)}>
              {o}
              {i === highlight && <motion.span className="menu__ring" {...enter('pop', start + 0.9, instant)} />}
            </motion.div>
          ))}
        </div>
      </Window>
    </UIEnter>
  );
}

/* ───────── Modal: upload-a-document ask (P29) ───────── */
export interface ModalProps { title: string; body: string; drop?: string; actions?: string[]; app?: string }
export function Modal({ title, body, drop, actions = ['Cancel', 'Upload'], app = 'Pluto' }: ModalProps) {
  const { start, instant } = useBeat();
  return (
    <UIEnter>
      <Window app={app} title="New inquiry">
        <div style={{ height: 300 }} />
        <div className="modal-back">
          <motion.div className="modal" {...enter('pop', start + 0.3, instant)}>
            <div className="modal__title">{title}</div>
            <div className="modal__body"><RichText text={body} /></div>
            {drop && <div className="modal__drop"><Icon name="upload" size={28} />{drop}</div>}
            <div className="btnrow">
              {actions.map((a, i) => <span key={a} className={`btn${i === 0 ? ' btn--ghost' : ''}`}>{a}</span>)}
            </div>
          </motion.div>
        </div>
      </Window>
    </UIEnter>
  );
}

/* ───────── SubmitBar: greyed submit with an inline error (P49) ───────── */
export interface SubmitBarProps { error: string; label?: string; app?: string }
export function SubmitBar({ error, label = 'Submit', app = 'Pluto' }: SubmitBarProps) {
  const shown = useReached(0.7);
  return (
    <UIEnter>
      <Window app={app} title="Inquiry summary">
        {[70, 50, 60].map((w, i) => <div key={i} className="skel" style={{ width: `${w}%` }} />)}
        <div className="btnrow" style={{ alignItems: 'center', marginTop: 20 }}>
          {shown && <span className="field__error" style={{ marginRight: 'auto' }}>{error}</span>}
          <span className="btn btn--disabled btn--big">{label}</span>
        </div>
      </Window>
    </UIEnter>
  );
}

/* ───────── CursorButton: the cursor travels to a button and clicks (P135) ───────── */
export interface CursorButtonProps { label: string; context?: string; app?: string }
export function CursorButton({ label, context, app = 'Prism' }: CursorButtonProps) {
  const { start, instant } = useBeat();
  const pressed = useReached(1.9);
  return (
    <UIEnter>
      <Window app={app} title="Order">
        {context && <div className="field__label" style={{ fontWeight: 500 }}><RichText text={context} /></div>}
        {[80, 60].map((w, i) => <div key={i} className="skel" style={{ width: `${w}%` }} />)}
        <div className="btnrow" style={{ marginTop: 30, position: 'relative' }}>
          <motion.span className="btn btn--big" animate={{ scale: pressed ? 0.95 : 1 }}>{label}</motion.span>
          <motion.span
            className="cursor"
            style={{ right: 40, bottom: -18 }}
            initial={instant ? false : { x: -380, y: 160, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: instant ? 0 : start + paced(0.5), duration: instant ? 0 : 1.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Icon name="cursor" size={30} stroke={1.6} />
          </motion.span>
        </div>
      </Window>
    </UIEnter>
  );
}
export const cursorButtonDuration = 2.2;

/* ───────── ShimmerForm: every field fills itself (P136 — the panel the document exists for) ───────── */
export interface ShimmerFormProps { title: string; fields: { label: string; value: string }[]; counter?: string; app?: string }
const SHIMMER_AT = 0.5, SHIMMER_DUR = 1.6;
export function ShimmerForm({ title, fields, counter, app = 'Prism' }: ShimmerFormProps) {
  const { start, instant } = useBeat();
  const filled = useStepper(fields.length, SHIMMER_DUR / fields.length, SHIMMER_AT + 0.1);
  const done = useReached(SHIMMER_AT + SHIMMER_DUR + 0.1);
  return (
    <UIEnter>
      <Window app={app} title={title} tools={counter && done ? <Chip tone="good">{counter}</Chip> : undefined}>
        <div className="sf__grid">
          {fields.map((f, i) => (
            <div key={f.label} className="sf__row">
              <span>{f.label}</span>
              <div className={`sf__val${i < filled ? ' sf__val--on' : ''}`}>
                {i < filled && <motion.span initial={instant ? false : { opacity: 0 }} animate={{ opacity: 1 }}>{f.value}</motion.span>}
              </div>
            </div>
          ))}
        </div>
        {!instant && (
          <motion.div
            className="shimmer"
            initial={{ x: '-100%', opacity: 1 }}
            animate={{ x: '120%', opacity: [1, 1, 0] }}
            transition={{ delay: start + paced(SHIMMER_AT), duration: paced(SHIMMER_DUR), ease: 'easeInOut' }}
          />
        )}
      </Window>
    </UIEnter>
  );
}
export const shimmerDuration = SHIMMER_AT + SHIMMER_DUR + 0.6;

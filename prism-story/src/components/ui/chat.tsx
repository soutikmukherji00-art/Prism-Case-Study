import { motion } from 'motion/react';
import { useBeat, useReached, useStepper } from '../../engine/BeatContext';
import { enter, useEnter } from '../../motion/presets';
import { Chip } from '../primitives/Chip';
import { Icon, type IconName } from '../primitives/Icon';
import { RichText } from '../primitives/RichText';
import { UIEnter, Window } from './Window';

/* ───────── Message model shared by every chat surface ───────── */
export interface Msg {
  from: 'me' | 'them' | 'system' | 'ai';
  text?: string;
  kind?: 'text' | 'voice' | 'image' | 'doc' | 'po' | 'rfq';
  who?: string;
  time?: string;
}

export function Message({ m }: { m: Msg }) {
  const kind = m.kind ?? 'text';
  return (
    <div className={`msg msg--${m.from}`}>
      {m.who && <span className="msg__who">{m.who}</span>}
      {kind === 'voice' && <span className="msg__voice">{[8, 14, 6, 16, 10, 18, 7, 12, 15, 9, 13, 6].map((h, i) => <i key={i} style={{ height: h }} />)} <span style={{ font: '600 11px var(--font-mono)', marginLeft: 6 }}>{m.text ?? '0:42'}</span></span>}
      {kind === 'image' && <div className="msg__img" />}
      {(kind === 'doc' || kind === 'po' || kind === 'rfq') && (
        <span className="msg__attach"><Icon name={kind === 'po' ? 'po' : 'doc'} size={22} />{m.text ?? (kind === 'po' ? 'Purchase order.pdf' : 'Document.pdf')}</span>
      )}
      {kind === 'text' && m.text && <RichText text={m.text} />}
      {kind === 'image' && m.text && <div style={{ marginTop: 6 }}><RichText text={m.text} /></div>}
      {m.time && <span className="msg__time">{m.time}</span>}
    </div>
  );
}

/* ───────── PhoneChat: a WhatsApp-style thread on a phone or in a window ───────── */
export interface PhoneChatProps {
  title: string;
  app?: string;
  messages: Msg[];
  device?: 'phone' | 'window';
  /** Messages before this index are already there (history); the rest arrive one by one. */
  startAt?: number;
  gap?: number;
  /** Grey the whole thread out after the last message lands. */
  greyed?: boolean;
}
export const phoneChatDuration = (p: PhoneChatProps) => 0.5 + (p.messages.length - (p.startAt ?? 0)) * (p.gap ?? 0.8);

export function PhoneChat({ title, app = 'WhatsApp', messages, device = 'phone', startAt = 0, gap = 0.8, greyed }: PhoneChatProps) {
  const arrived = useStepper(messages.length - startAt, gap, 0.5);
  const grey = useReached(0.5 + (messages.length - startAt) * gap + 0.2) && greyed;
  const { instant } = useBeat();
  const visible = messages.slice(0, startAt + arrived);
  const list = (
    <div className="chat__list">
      {visible.map((m, i) => (
        <motion.div key={i} style={{ display: 'flex', flexDirection: 'column' }} initial={instant || i < startAt ? false : { opacity: 0, y: 14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
          <Message m={m} />
        </motion.div>
      ))}
    </div>
  );
  const head = (
    <div className="chat__head">
      <span className="chat__avatar" />
      <div><div className="chat__title">{title}</div><div className="chat__app">{app}</div></div>
    </div>
  );
  return (
    <UIEnter center>
      <motion.div animate={{ filter: grey ? 'grayscale(1)' : 'grayscale(0)', opacity: grey ? 0.6 : 1 }} transition={{ duration: 0.8 }} style={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center' }}>
        {device === 'phone' ? (
          <div className="phone">{head}{list}</div>
        ) : (
          <div className="win" style={{ height: '100%' }}>{head}{list}</div>
        )}
      </motion.div>
    </UIEnter>
  );
}

/* ───────── Fragments: the requirement arriving in pieces (P26) ───────── */
export interface FragmentsProps {
  items: { time: string; channel: 'call' | 'voice' | 'email' | 'chat'; text: string }[];
}
const CH_ICON: Record<string, IconName> = { call: 'phone', voice: 'voice', email: 'mail', chat: 'chat' };
export const fragmentsDuration = (p: FragmentsProps) => 0.3 + p.items.length * 0.7;
export function Fragments({ items }: FragmentsProps) {
  const { start, instant } = useBeat();
  return (
    <div className="ui-fill">
      <div className="frags">
        {items.map((it, i) => (
          <motion.div key={i} className="frag" {...enter('rise', start + 0.2 + i * 0.7, instant)}>
            <span className="frag__time">{it.time}</span>
            <span className="frag__text"><Icon name={CH_ICON[it.channel]} size={22} /> <RichText text={it.text} /></span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ───────── ChatInquiry: conversation on the left, structured record on the right ─────────
 * progressive — each field fills when the message it came from arrives (P95)
 * onLast      — no record at all until the last message (the PO) lands (P90, P118)
 * verify      — record arrives already filled, for a single check (P98)
 */
export interface ChatInquiryProps {
  chatTitle: string;
  recordTitle?: string;
  app?: string;
  messages: Msg[];
  fields: { label: string; value: string; at?: number }[];
  mode?: 'progressive' | 'onLast' | 'verify';
  gap?: number;
  startAt?: number;
  counter?: string;
}
export const chatInquiryDuration = (p: ChatInquiryProps) => 0.6 + (p.messages.length - (p.startAt ?? 0)) * (p.gap ?? 0.9) + 0.8;

export function ChatInquiry({ chatTitle, recordTitle = 'Inquiry', app = 'Prism', messages, fields, mode = 'progressive', gap = 0.9, startAt = 0, counter }: ChatInquiryProps) {
  const { instant } = useBeat();
  const arrived = startAt + useStepper(messages.length - startAt, gap, 0.6);
  const allIn = arrived >= messages.length;
  const recordVisible = mode === 'progressive' || allIn;
  const recordReady = useReached(0.6 + (messages.length - startAt) * gap + 0.3);
  return (
    <UIEnter>
      <Window app={app} title={recordTitle}>
        <div className="ci" style={{ margin: '-22px -24px', height: 'calc(100% + 44px)', minHeight: 360 }}>
          <div className="ci__chat">
            <div className="chat__head"><span className="chat__avatar" /><div><div className="chat__title">{chatTitle}</div><div className="chat__app">Connect</div></div></div>
            <div className="chat__list">
              {messages.slice(0, arrived).map((m, i) => (
                <motion.div key={i} style={{ display: 'flex', flexDirection: 'column' }} initial={instant || i < startAt ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <Message m={m} />
                </motion.div>
              ))}
            </div>
          </div>
          <div className="ci__record">
            <div className="ci__recordTitle"><span>{recordTitle}</span>{counter && recordReady && <Chip tone="good">{counter}</Chip>}</div>
            {!recordVisible ? (
              <div className="ci__empty">No form. Just the conversation.</div>
            ) : (
              fields.map((f, i) => {
                const on = mode === 'verify' || mode === 'onLast' ? true : f.at == null ? allIn : arrived > f.at;
                return (
                  <motion.div key={f.label} className="ci__row" initial={instant || mode === 'progressive' ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: instant ? 0 : i * 0.06 }}>
                    <span>{f.label}</span>
                    <span className={`ci__val${on ? ' ci__val--filled' : ''}`}>{on && <motion.span initial={instant ? false : { opacity: 0 }} animate={{ opacity: 1 }}>{f.value}</motion.span>}</span>
                  </motion.div>
                );
              })
            )}
            {mode === 'verify' && allIn && <div className="btnrow" style={{ marginTop: 'auto' }}><span className="btn">Verify &amp; confirm</span></div>}
          </div>
        </div>
      </Window>
    </UIEnter>
  );
}

/* ───────── Nudge: a reminder / AI prompt arriving (P97, P126, P129) ───────── */
export interface NudgeProps {
  from: string;
  text: string;
  tone?: 'reminder' | 'ai' | 'alert';
  context?: string;
  align?: 'center' | 'right' | 'left';
}
export function Nudge({ from, text, tone = 'reminder', context, align = 'center' }: NudgeProps) {
  const anim = useEnter(align === 'right' ? 'slideRight' : 'pop');
  return (
    <div className="ui-fill" style={{ alignItems: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
      <motion.div className={`nudge nudge--${tone}`} {...anim}>
        <span className="nudge__icon"><Icon name={tone === 'ai' ? 'sparkle' : 'bell'} size={18} /></span>
        <div>
          <div className="nudge__from">{from}</div>
          <div className="nudge__text"><RichText text={text} /></div>
          {context && <div className="nudge__ctx">{context}</div>}
        </div>
      </motion.div>
    </div>
  );
}

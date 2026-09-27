import { useEffect, useState } from 'react';
import { useBeat } from '../../engine/BeatContext';
import { theme } from '../../theme';

interface TypewriterProps {
  text: string;
  /** Seconds into the layer before typing starts. */
  offset?: number;
  /** Characters per second. */
  cps?: number;
  caret?: boolean;
}

/** Types `text` out on the layer's timeline. Shows it whole when the panel is instant. */
export function Typewriter({ text, offset = 0, cps = 22, caret = true }: TypewriterProps) {
  const { start, instant } = useBeat();
  const [n, setN] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (instant) {
      setN(text.length);
      return;
    }
    setN(0);
    let iv: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      let i = 0;
      iv = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length && iv) clearInterval(iv);
      }, 1000 / cps);
    }, (start + offset * theme.motion.pace) * 1000);
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
  }, [text, offset, cps, start, instant]);

  return (
    <>
      {text.slice(0, n)}
      {caret && n < text.length && <span className="caret" />}
    </>
  );
}

export const typingDuration = (text: string, cps = 22) => text.length / cps;

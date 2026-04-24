import { useEffect, useRef, useState } from 'react';

const SEQUENCE = [
  { value: 0, position: 'calc(92vh - 100px)' },
  { value: 33, position: '63vh' },
  { value: 80, position: '27vh' },
  { value: 100, position: '10vh' }
];

export default function Preloader({ onDone }) {
  const preloaderRef = useRef(null);
  const percentageRef = useRef(null);
  const [entry, setEntry] = useState({ value: null, mode: null, key: 0 });
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (window.lenis?.stop) window.lenis.stop();

    // The Ahmad / Siddiqui / Portfolio / © branding use .drop-text, which is
    // opacity:0 until .in-view is added. Trigger the drop-in animation manually
    // since the preloader isn't scrolled into — it mounts already on screen.
    const pre = preloaderRef.current;
    if (pre) {
      pre.querySelectorAll('.drop-text').forEach((el) => el.classList.add('in-view'));
    }

    let j = 0;
    let nextKey = 1;
    const timeouts = [];

    const step = () => {
      if (j < SEQUENCE.length) {
        const { value, position } = SEQUENCE[j];

        setEntry((prev) => {
          if (prev.value !== null) {
            // Existing value — fade it out in place.
            return { ...prev, mode: 'fade-up' };
          }
          return prev;
        });

        timeouts.push(
          setTimeout(() => {
            if (percentageRef.current) percentageRef.current.style.top = position;
            setEntry({ value, mode: 'slide-up', key: nextKey++ });
          }, 500)
        );

        j++;
        timeouts.push(setTimeout(step, 1500));
      } else {
        if (pre) pre.style.transform = 'translateY(-100%)';
        timeouts.push(
          setTimeout(() => {
            document.body.style.overflow = 'auto';
            if (window.lenis?.start) window.lenis.start();
            setGone(true);
            onDone?.();
          }, 500)
        );
      }
    };

    // Kick off the first value without the 500ms fade delay.
    if (SEQUENCE[0]) {
      if (percentageRef.current) percentageRef.current.style.top = SEQUENCE[0].position;
      setEntry({ value: SEQUENCE[0].value, mode: 'slide-up', key: nextKey++ });
      j = 1;
      timeouts.push(setTimeout(step, 1500));
    }

    return () => {
      timeouts.forEach(clearTimeout);
      document.body.style.overflow = 'auto';
      if (window.lenis?.start) window.lenis.start();
    };
  }, [onDone]);

  if (gone) return null;

  return (
    <div id="preloader" ref={preloaderRef}>
      <div>
        <div id="branding">
          <p className="drop-text fontpreloader" style={{ padding: 0 }}>Ahmad</p>
        </div>
        <div id="branding4">
          <p className="drop-text fontpreloader" style={{ padding: 0 }}>Siddiqui</p>
        </div>
      </div>
      <div id="branding1">
        <p className="drop-text fontpreloader" style={{ padding: 0 }}>Portfolio</p>
      </div>
      <div id="branding5">
        <p className="drop-text fontpreloader" style={{ padding: 0 }}>&#169;2026</p>
      </div>
      <div className="percentage" id="percentage" ref={percentageRef}>
        {entry.value !== null && (
          <p key={entry.key} className={`percent-text ${entry.mode}`}>{entry.value}</p>
        )}
      </div>
    </div>
  );
}

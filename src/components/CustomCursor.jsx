import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'left', { duration: 0.3, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'top', { duration: 0.3, ease: 'power3' });

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    document.addEventListener('mousemove', onMove);

    const attachHovers = () => {
      const targets = document.querySelectorAll('.textemail');
      targets.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
      return targets;
    };

    const onEnter = () => {
      gsap.to(cursor, { opacity: 1, scale: 1.5, duration: 0.5, ease: 'power3.out' });
    };
    const onLeave = () => {
      gsap.to(cursor, { opacity: 0, scale: 1, duration: 0.5, ease: 'power3.out' });
    };

    let targets = attachHovers();

    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      targets = attachHovers();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      CLICK ME
    </div>
  );
}

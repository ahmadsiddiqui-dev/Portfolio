import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer({ color, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      once: true,
      onEnter: () => el.classList.add('in-view')
    });
    return () => st.kill();
  }, []);

  const s = color ? { color } : undefined;
  return (
    <footer ref={ref} className={className} style={s}>
      <div>
        <p style={s}>Ahmad Siddiqui<br />Software Engineer</p>
      </div>
      <div className="footermbl footer-connect">
        <p style={s} className="footer-connect-label">[LET&apos;S CONNECT]</p>
        <div className="footer-connect-links">
          <a href="https://www.instagram.com/ahmadjavaidsiddiqui" target="_blank" rel="noreferrer" style={s}>IG</a>
          <a href="https://github.com/ahmadsiddiqui-dev" target="_blank" rel="noreferrer" style={s}>GH</a>
          <a href="https://wa.me/919639942318" target="_blank" rel="noreferrer" style={s}>WA</a>
          <a href="https://www.linkedin.com/in/ahmad-javaid-siddiqui-1a811a194" target="_blank" rel="noreferrer" style={s}>LI</a>
        </div>
      </div>
      <div>
        <p style={s}>Designed and Developed <br />by Ahmad Siddiqui</p>
      </div>
    </footer>
  );
}

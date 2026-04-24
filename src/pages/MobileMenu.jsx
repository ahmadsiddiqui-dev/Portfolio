import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TLink from '../components/TLink.jsx';

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { to: '/', letters: ['H', '0', 'M', 'E'], key: 'index' },
  { to: '/work', letters: ['W', 'O', 'R', 'K'], key: 'work' },
  { to: '/about', letters: ['A', 'B', 'O', 'U', 'T'], key: 'about' },
  { to: '/contact', letters: ['C', 'O', 'N', 'T', 'A', 'C', 'T'], key: 'contact' }
];

export default function MobileMenu() {
  const rootRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const prevBg = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    const prevPad = document.body.style.padding;
    document.body.style.backgroundColor = '#464c47';
    document.body.style.color = 'white';
    document.body.style.padding = '0';

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.text span').forEach((span) => {
        ScrollTrigger.create({
          trigger: span,
          start: 'top bottom',
          once: true,
          onEnter: () => span.classList.add('appear')
        });
      });
    }, rootRef);

    const from = sessionStorage.getItem('fromPage');
    const fromKey = from && from.replace(/\.html$/i, '').toLowerCase();
    if (fromKey) {
      const match = rootRef.current?.querySelector(`a[data-key="${fromKey}"]`);
      if (match) {
        setTimeout(() => match.classList.add('active'), 300);
        if (['index', 'work', 'about', 'contact'].includes(fromKey)) {
          match.style.pointerEvents = 'none';
          match.style.cursor = 'default';
        }
      }
    }

    return () => {
      ctx.revert();
      document.body.style.backgroundColor = prevBg;
      document.body.style.color = prevColor;
      document.body.style.padding = prevPad;
    };
  }, []);

  const handleClose = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <div ref={rootRef}>
      <style>{`
        .mobilemenu-scope a {
          text-decoration: none;
          color: white;
          padding: 0;
          letter-spacing: 0;
        }
        .mobilemenu-scope .text { position: relative; }
        .mobilemenu-scope .text a {
          position: relative;
          display: inline-block;
          color: white;
        }
        .mobilemenu-scope .text a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 5px;
          width: 0;
          background: rgb(255, 255, 255);
          transition: all 1s cubic-bezier(0.5, 0.1, 0, 1);
          transition-delay: 1.2s;
        }
        .mobilemenu-scope .text a.active::after { width: 105%; }
        @keyframes mobilemenuFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <div className="mobilemenu-scope">
        <header style={{ color: 'white', opacity: 1, animation: 'mobilemenuFadeIn 1s ease-in-out forwards' }}>
          <div style={{ color: 'white', opacity: 1 }}>
            <TLink to="/" style={{ letterSpacing: 0, color: 'white', position: 'fixed', left: '20px', top: '30px', opacity: 1 }}>
              Ahmad Siddiqui
            </TLink>
          </div>
          <span id="close-pop">×</span>
          <button id="close-popup" onClick={handleClose} style={{ right: '20px', top: '30px', fontSize: '22px' }}>Close</button>
        </header>

        <div style={{ padding: 0, display: 'flex', flexDirection: 'column', position: 'absolute', bottom: '30px', gap: '50px' }}>
          <div style={{ padding: 0 }}>
            {LINKS.map((link) => (
              <div key={link.key} className={link.key === 'index' ? 'text letterspace' : 'text'} style={{ padding: 0, fontSize: '55px' }}>
                <TLink to={link.to} data-key={link.key}>
                  {link.letters.map((ch, i) => (<span key={i}>{ch}</span>))}
                </TLink>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              fontSize: '22px',
              fontWeight: 500,
              animation: 'mobilemenuFadeIn 1.5s ease-in-out forwards'
            }}
          >
            <div style={{ paddingTop: '40px', padding: 0 }}>
              <p style={{ padding: 0 }}>Software <br /> Engineer </p>
            </div>
            <div style={{ padding: 0 }}>
              <p style={{ padding: 0 }}>Based in <br /> Rampur India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

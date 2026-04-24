import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useLocation } from 'react-router-dom';
import TLink from './TLink.jsx';

// QOREEB's ease, registered once so it's referenceable by name below.
gsap.registerPlugin(CustomEase);
if (!CustomEase.get('c1')) CustomEase.create('c1', '0.32, 1, 0.32, 1');

const MenuContext = createContext({
  menuOpen: false,
  openMenu: () => {},
  closeMenu: () => {},
  toggleMenu: () => {}
});

export const useMenu = () => useContext(MenuContext);

const LINKS = [
  { to: '/', text: 'H0ME', key: 'index' },
  { to: '/work', text: 'WORK', key: 'work' },
  { to: '/about', text: 'ABOUT', key: 'about' },
  { to: '/contact', text: 'CONTACT', key: 'contact' }
];

const PATH_TO_KEY = {
  '/': 'index',
  '/work': 'work',
  '/about': 'about',
  '/contact': 'contact'
};

// Clip-path polygon keyframes copied from QOREEB's menu animation. The panel
// opens top-down (a degenerate top edge grows into a full rectangle) and each
// reveal element inside wipes left-to-right (a degenerate left edge grows to
// a full rectangle).
const CLIP_HIDDEN_TOP = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
const CLIP_SHOWN = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
const CLIP_HIDDEN_LEFT = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
const PANEL_EASE = 'c1';
const REVEAL_EASE = 'c1';

export default function MenuOverlayProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef(null);
  const instantCloseRef = useRef(false);
  const location = useLocation();

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((o) => !o);

  // Initialize the closed (clipped) state before first paint so the menu
  // doesn't flash as a black rectangle on mount.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.set(panel, { clipPath: CLIP_HIDDEN_TOP });
    panel.querySelectorAll('.mm-reveal').forEach((el) => {
      gsap.set(el, { clipPath: CLIP_HIDDEN_LEFT });
    });
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const reveals = Array.from(panel.querySelectorAll('.mm-reveal'));

    gsap.killTweensOf([panel, ...reveals]);

    if (menuOpen) {
      // Set the active class BEFORE the reveal starts so the current route's
      // link paints in its off-white color from the first frame — user
      // explicitly didn't want a post-reveal color fade.
      panel.querySelectorAll('.mm-text a').forEach((a) => {
        a.classList.remove('active');
        a.style.pointerEvents = '';
        a.style.cursor = '';
      });
      const activeKey = PATH_TO_KEY[location.pathname];
      if (activeKey) {
        const activeLink = panel.querySelector(`a[data-key="${activeKey}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          activeLink.style.pointerEvents = 'none';
          activeLink.style.cursor = 'default';
        }
      }

      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { clipPath: CLIP_HIDDEN_TOP },
        { clipPath: CLIP_SHOWN, duration: 1, ease: PANEL_EASE }
      );
      tl.fromTo(
        reveals,
        { clipPath: CLIP_HIDDEN_LEFT },
        {
          clipPath: CLIP_SHOWN,
          duration: 3,
          ease: REVEAL_EASE,
          stagger: { each: 0.25 }
        },
        0.3
      );
    } else if (instantCloseRef.current) {
      // Nav-triggered close: page exit overlay is covering, snap back silently.
      instantCloseRef.current = false;
      gsap.set(panel, { clipPath: CLIP_HIDDEN_TOP });
      reveals.forEach((el) => gsap.set(el, { clipPath: CLIP_HIDDEN_LEFT }));
    } else {
      // Manual close (Menu button or same-path link): collapse the panel
      // bottom-up, then reset reveals so the next open wipes cleanly.
      gsap.to(panel, {
        clipPath: CLIP_HIDDEN_TOP,
        duration: 1,
        ease: PANEL_EASE,
        onComplete: () => {
          reveals.forEach((el) => gsap.set(el, { clipPath: CLIP_HIDDEN_LEFT }));
        }
      });
    }
  }, [menuOpen, location.pathname]);

  // Route change → silently close the menu. By the time the navigation fires,
  // the page exit overlay has already swept up and is covering the screen, so
  // the user never sees the menu snap away.
  useEffect(() => {
    if (menuOpen) {
      instantCloseRef.current = true;
      setMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? window.lenis : null;
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <MenuContext.Provider value={{ menuOpen, openMenu, closeMenu, toggleMenu }}>
      {children}

      <style>{`
        .menu-overlay-scope a {
          text-decoration: none;
          color: #e5e5dd;
          padding: 0;
          letter-spacing: 0;
        }
        .menu-overlay-scope .mm-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 0;
        }
        .menu-overlay-scope .mm-text {
          position: relative;
          display: block;
          padding: 0;
          font-family: "T1 Korium", "Big Shoulders Display", "Anton", "PP Neue Montreal", sans-serif;
          font-size: 80px;
          font-weight: 200;
          letter-spacing: -0.03ch;
          line-height: 0.9;
          text-transform: uppercase;
        }
        .menu-overlay-scope .mm-text a {
          position: relative;
          display: inline-block;
          font-family: "T1 Korium", "Big Shoulders Display", "Anton", "PP Neue Montreal", sans-serif;
          color: #e5e5dd;
          opacity: 0.5;
          padding: 0 !important;
        }
        .menu-overlay-scope .mm-text a.active {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .menu-overlay-scope .mm-text {
            font-size: 80px;
          }
        }

        .menu-overlay-scope .menu-overlay-details,
        .menu-overlay-scope .menu-overlay-details * {
          font-family: "JetBrains Mono", "PP Neue Montreal Book", "PP Neue Montreal", monospace !important;
          font-synthesis: none !important;
          -webkit-font-synthesis: none !important;
          -webkit-text-stroke: 0 !important;
        }
        .menu-overlay-scope .menu-overlay-details {
          display: flex;
          flex-direction: column;
          gap: 26px;
          padding: 0;
          color: #e5e5dd;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.3;
        }
        .menu-overlay-scope .mm-detail-block {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding: 0;
        }
        .menu-overlay-scope .mm-detail-label {
          margin: 0;
          padding: 0;
          color: #e5e5dd;
          text-transform: uppercase;
          letter-spacing: 0;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.3;
        }
        .menu-overlay-scope .mm-detail-link {
          color: #e5e5dd !important;
          padding: 0 !important;
          letter-spacing: 0;
          text-transform: uppercase;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.3;
        }
        .menu-overlay-scope .mm-socials {
          display: flex;
          gap: 16px;
          padding: 0;
          margin-top: 8px;
        }
        .menu-overlay-scope .mm-credit-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-top: 12px;
          padding: 0;
        }
        .menu-overlay-scope .mm-credit {
          margin: 0;
          padding: 0;
          color: #e5e5dd;
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: 0;
        }
        .menu-overlay-scope .mm-credit-role {
          text-align: right;
        }
        .menu-overlay-scope .mm-close {
          position: absolute;
          top: 35px;
          right: 20px;
          background: none;
          border: 0;
          padding: 0 !important;
          margin: 0;
          color: #e5e5dd;
          font-family: "JetBrains Mono", "PP Neue Montreal Book", "PP Neue Montreal", monospace;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1.3;
          text-transform: uppercase;
          cursor: pointer;
          -webkit-text-stroke: 0;
          font-synthesis: none;
          -webkit-font-synthesis: none;
        }
        @media (max-width: 1166px) and (min-width: 769px) {
          .menu-overlay-scope .mm-close {
            right: 30px;
          }
        }
      `}</style>

      <div
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100dvh',
          zIndex: 10000,
          pointerEvents: menuOpen ? 'auto' : 'none'
        }}
      >
        {/*
          Single panel — background + content with a clip-path wipe. The panel
          itself animates top-down on open; each .mm-reveal child animates a
          left-to-right wipe on top of that, staggered 0.3s.
        */}
        <div
          ref={panelRef}
          className="menu-overlay-scope"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#000000',
            color: '#e5e5dd',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '0 20px 30px 20px',
            boxSizing: 'border-box',
            willChange: 'clip-path',
            clipPath: CLIP_HIDDEN_TOP
          }}
        >
          <button
            type="button"
            className="mm-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            [CLOSE]
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '50px', padding: 0 }}>
            <div className="mm-links">
              {LINKS.map((link) => (
                <div
                  key={link.key}
                  className="mm-text mm-reveal"
                  style={{ clipPath: CLIP_HIDDEN_LEFT, willChange: 'clip-path' }}
                >
                  <TLink
                    to={link.to}
                    data-key={link.key}
                    onClick={() => {
                      // Same-path clicks don't fire the page exit overlay, so
                      // animate the menu closed here. Cross-path clicks are
                      // handled by the route-change effect which closes silently
                      // while the exit overlay is covering the screen.
                      if (link.to === location.pathname) closeMenu();
                    }}
                  >
                    {link.text}
                  </TLink>
                </div>
              ))}
            </div>

            {(() => {
              const DETAIL_FONT = {
                fontFamily: '"JetBrains Mono", "PP Neue Montreal", monospace',
                fontSynthesis: 'none',
                WebkitFontSynthesis: 'none'
              };
              const REVEAL = { clipPath: CLIP_HIDDEN_LEFT, willChange: 'clip-path' };
              return (
                <div className="menu-overlay-details" style={DETAIL_FONT}>
                  <div className="mm-detail-block" style={DETAIL_FONT}>
                    <p
                      className="mm-detail-label mm-reveal"
                      style={{ ...DETAIL_FONT, ...REVEAL }}
                    >
                      WANT TO WORK TOGETHER
                    </p>
                    <a
                      className="mm-detail-link mm-reveal"
                      href="mailto:ahmadsiddiqui909@gmail.com"
                      style={{ ...DETAIL_FONT, ...REVEAL }}
                    >
                      hello@ahmadjavaidsiddiqui.com
                    </a>
                  </div>

                  <div className="mm-detail-block" style={DETAIL_FONT}>
                    <p
                      className="mm-detail-label mm-reveal"
                      style={{ ...DETAIL_FONT, ...REVEAL }}
                    >
                      [LET&apos;S CONNECT]
                    </p>
                    <div
                      className="mm-socials mm-reveal"
                      style={{ ...DETAIL_FONT, ...REVEAL }}
                    >
                      <a
                        className="mm-detail-link"
                        href="https://www.instagram.com/ahmadjavaidsiddiqui"
                        target="_blank"
                        rel="noreferrer"
                        style={DETAIL_FONT}
                      >
                        IG
                      </a>
                      <a
                        className="mm-detail-link"
                        href="https://wa.me/919639942318"
                        target="_blank"
                        rel="noreferrer"
                        style={DETAIL_FONT}
                      >
                        WA
                      </a>
                      <a
                        className="mm-detail-link"
                        href="https://github.com/ahmadsiddiqui-dev"
                        target="_blank"
                        rel="noreferrer"
                        style={DETAIL_FONT}
                      >
                        GH
                      </a>
                      <a
                        className="mm-detail-link"
                        href="https://www.linkedin.com/in/ahmad-javaid-siddiqui-1a811a194"
                        target="_blank"
                        rel="noreferrer"
                        style={DETAIL_FONT}
                      >
                        LI
                      </a>
                    </div>
                  </div>

                  <div className="mm-credit-row" style={DETAIL_FONT}>
                    <p className="mm-credit" style={DETAIL_FONT}>
                      DESIGNED AND DEVELOPED
                      <br />
                      BY AHMAD SIDDIQUI
                    </p>
                    <p className="mm-credit mm-credit-role" style={DETAIL_FONT}>
                      SOFTWARE
                      <br />
                      ENGINEER
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </MenuContext.Provider>
  );
}

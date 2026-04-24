import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Map each route to the body background color that route renders against, so
// the exit overlay matches the destination page and there's no contrasty
// flash when it fades out. Keep these in sync with the per-page
// `document.body.style.backgroundColor` overrides (Contact, ProjectPage,
// MobileMenu) and the base `body { background-color }` in css.css.
const PAGE_BG = {
  '/': '#e5e5dd',
  '/work': '#e5e5dd',
  '/about': '#e5e5dd',
  '/contact': '#e5e5dd',
  '/projectpage': '#464c47',
  '/mobilemenu': '#464c47'
};
const colorForPath = (path) => PAGE_BG[path] ?? '#e1dfdd';

// Laptop / desktop view = wider than the tablet breakpoint used in padcss.css
// (`@media (max-width: 1166px)`). On laptop the exit overlay is forced black
// regardless of destination; mobile/tablet keep the destination-matched color.
const isLaptopView = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(min-width: 1167px)').matches;
const overlayColor = (path) => (isLaptopView() ? '#000000' : colorForPath(path));

const PageTransitionContext = createContext({ navigateWithTransition: () => {} });

export const usePageTransition = () => useContext(PageTransitionContext);

export default function PageTransition({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const exitRef = useRef(null);

  useEffect(() => {
    // Jump the new page to the top immediately on route change, underneath
    // the exit overlay, so content starts from the top when the overlay fades.
    if (window.lenis?.scrollTo) {
      window.lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }

    const exit = exitRef.current;
    let resetId;
    let raf1 = 0;
    let raf2 = 0;
    if (exit) {
      if (exit.classList.contains('active')) {
        // Came from a link click — overlay is covering the screen. Fade it
        // out instead of sliding it back down, but wait two animation frames
        // first so the new page has definitely mounted AND painted a frame.
        // Without this delay the fade can start before the new page paints,
        // briefly exposing the browser's default paint (reads as a black
        // flicker) or a half-rendered page under the semi-transparent
        // overlay.
        exit.style.transition = 'none';
        exit.style.opacity = '1';
        raf1 = requestAnimationFrame(() => {
          raf2 = requestAnimationFrame(() => {
            exit.style.transition = 'opacity 0.6s ease';
            exit.style.opacity = '0';
          });
        });
        resetId = setTimeout(() => {
          // Silently reset: disable transitions, move offscreen, restore opacity.
          exit.style.transition = 'none';
          exit.classList.remove('active');
          exit.style.opacity = '1';
          exit.style.backgroundColor = overlayColor(location.pathname);
          // Force reflow then hand control back to CSS.
          void exit.offsetHeight;
          exit.style.transition = '';
        }, 700);
      } else {
        exit.style.backgroundColor = colorForPath(location.pathname);
        exit.classList.remove('active');
      }
    }

    return () => {
      clearTimeout(resetId);
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [location.pathname]);

  const navigateWithTransition = useCallback(
    (to) => {
      if (!to) return;
      const samePath = to === location.pathname;
      if (samePath) {
        if (window.lenis) {
          window.lenis.scrollTo(0, {
            duration: 1.8,
            easing: (t) => -(Math.cos(Math.PI * t) - 1) / 2
          });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }
      const exit = exitRef.current;
      if (exit) {
        exit.style.backgroundColor = overlayColor(to);
        exit.classList.add('active');
      }
      setTimeout(() => {
        navigate(to);
      }, 1000);
    },
    [navigate, location.pathname]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateWithTransition }}>
      <div id="page-exit-transition" ref={exitRef}></div>
      {children}
    </PageTransitionContext.Provider>
  );
}

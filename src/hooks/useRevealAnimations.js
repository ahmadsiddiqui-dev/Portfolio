import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useRevealAnimations(rootRef, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const root = rootRef?.current ?? document;

    // Fire CREATIVE / DEVELOPER blur reveal (Home) and PROJECTS blur reveal
    // (Work) immediately on mount so they play first, before any other
    // animations on the page.
    const leadSpans = (rootRef?.current ?? document).querySelectorAll(
      '.letstart .text span, .qline-w1 span'
    );
    leadSpans.forEach((s) => s.classList.add('appear'));

    // All other reveals hold back until ~50% through the 1.6s blur (≈800ms)
    // so the blur leads and the rest cascades in behind it.
    const REVEAL_GATE_MS = 800;

    // Scroll-linked parallax on .img-container .portimage runs immediately
    // (outside the 800ms reveal gate) so the image is locked to scroll
    // progress on first paint — no visible jump when the gate timer fires.
    const parallaxCtx = gsap.context(() => {
      gsap.utils.toArray('.img-container').forEach((section) => {
        const img = section.querySelector('.portimage');
        if (!img) return;
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        gsap.fromTo(
          img,
          { y: 0 },
          {
            y: isMobile ? -160 : -80,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );
      });
    }, root);

    let ctx;
    const gateTimer = setTimeout(() => {
      ctx = gsap.context(() => {
        // .drop-text — the classic text cascade blocks.
        gsap.utils.toArray('.drop-text').forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            once: true,
            onEnter: () => el.classList.add('in-view')
          });
        });

        // .drop-text1 — same pattern, lighter animation defined in CSS.
        gsap.utils.toArray('.drop-text1').forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            once: true,
            onEnter: () => el.classList.add('in-view')
          });
        });

        // .text span letter cascade — excludes .letstart .text span (already
        // triggered above) and About .qline spans (handled as group below)
        // so the qoreeb wave order isn't disturbed by per-span triggers.
        gsap.utils.toArray('.text span').forEach((span) => {
          if (span.closest('.letstart')) return;
          if (span.closest('.qline')) return;
          ScrollTrigger.create({
            trigger: span,
            start: 'top bottom',
            once: true,
            onEnter: () => span.classList.add('appear')
          });
        });

        // About heading qoreeb reveal — fire all spans in qline-1..3 together
        // when qline-1 enters viewport (top group), and qline-4..5 together
        // when qline-4 enters (bottom group). Per-letter wave order comes
        // from animation-delay in design-system.css.
        const fireGroup = (triggerEl, lineSelectors) => {
          if (!triggerEl) return;
          ScrollTrigger.create({
            trigger: triggerEl,
            start: 'top bottom',
            once: true,
            onEnter: () => {
              lineSelectors.forEach((sel) => {
                root.querySelectorAll(`${sel} span`).forEach((s) =>
                  s.classList.add('appear')
                );
              });
            }
          });
        };
        fireGroup(root.querySelector('.qline-1'), ['.qline-1', '.qline-2', '.qline-3']);
        fireGroup(root.querySelector('.qline-4'), ['.qline-4', '.qline-5']);
        fireGroup(root.querySelector('.qline-6'), ['.qline-6']);
        fireGroup(root.querySelector('.qline-home-gym'), ['.qline-home-gym']);
        fireGroup(root.querySelector('.qline-home-travelling'), ['.qline-home-travelling']);
        fireGroup(root.querySelector('.qline-home-music'), ['.qline-home-music']);

        // AHMAD / SIDDIQUI Qoreeb blur reveal — fire all letters across both
        // h1.as.as-reveal in the same #ass container together so the wave
        // order (line 1 → line 2 → line 1 remainder → line 2 remainder)
        // plays as one sequence per the staggered animation-delays in CSS.
        // Trigger fires when the container's top reaches 85% from the top
        // of the viewport — i.e., the user has actually scrolled it well
        // into view (not just the first pixel peeking from below).
        gsap.utils.toArray('#ass, .me-ahmad').forEach((container) => {
          ScrollTrigger.create({
            trigger: container,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              container
                .querySelectorAll('h1.as-reveal .aslet, .arrow-down')
                .forEach((s) => s.classList.add('appear'));
            }
          });
        });

        // .spanemail letter cascade.
        gsap.utils.toArray('.spanemail').forEach((span) => {
          ScrollTrigger.create({
            trigger: span,
            start: 'top bottom',
            once: true,
            onEnter: () => span.classList.add('appear')
          });
        });

        // .textemail underline.
        gsap.utils.toArray('.textemail').forEach((container) => {
          ScrollTrigger.create({
            trigger: container,
            start: 'top bottom',
            once: true,
            onEnter: () => container.classList.add('in-view')
          });
        });

        // .text1 image reveal — the sliding cover on top of portfolio images.
        gsap.utils.toArray('.text1').forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: 'top 80%',
            once: true,
            onEnter: () => {
              const cover = section.querySelector('.imganimations');
              const coverSoft = section.querySelector('.imganimationss');
              if (cover) cover.style.animation = 'slideIn 1.5s cubic-bezier(1, 0.2, 0.2, 1) forwards';
              if (coverSoft) coverSoft.style.animation = 'slideInw 1.5s cubic-bezier(1, 0.2, 0.2, 1) forwards';
              const homeImg = section.querySelector('.imganimationhome');
              if (homeImg) homeImg.style.animation = 'scaleImg 1.5s cubic-bezier(1, 0.2, 0.2, 1) forwards';
            }
          });
        });

        // Scroll-linked parallax on .text1 .imganimation, smoothed by Lenis.
        gsap.utils.toArray('.text1').forEach((section) => {
          if (section.classList.contains('no-parallax')) return;
          const img = section.querySelector('.imganimation');
          if (!img) return;
          const isMobile = window.matchMedia('(max-width: 768px)').matches;
          // On mobile, switch to translate-based parallax so the gym/etc.
          // images visibly scroll inside their boxes — objectPosition pans
          // alone don't read on the small mobile crop.
          const useTranslate = section.classList.contains('parallax-y') || isMobile;
          if (useTranslate) {
            gsap.fromTo(
              img,
              { y: 0 },
              {
                y: -50,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1
                }
              }
            );
          } else {
            gsap.fromTo(
              img,
              { objectPosition: 'center 0%' },
              {
                objectPosition: 'center 100%',
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1
                }
              }
            );
          }
        });

        // ProjectPage horizontal scroll — pin .image-scroll-wrapper and
        // translate it horizontally as the user scrolls vertically.
        gsap.utils.toArray('.image-scroll-wrapper').forEach((wrap) => {
          if (window.matchMedia('(max-width: 1166px)').matches) return;
          gsap.to(wrap, {
            x: () => -(wrap.scrollWidth - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: wrap,
              start: 'top top',
              end: () => '+=' + (wrap.scrollWidth - window.innerWidth),
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1
            }
          });
        });

        // Re-refresh once every <img> has loaded so scrollWidth is final.
        const imgs = (rootRef?.current ?? document).querySelectorAll('img');
        let pending = imgs.length;
        if (pending) {
          imgs.forEach((img) => {
            if (img.complete) {
              if (--pending === 0) ScrollTrigger.refresh();
            } else {
              img.addEventListener('load', () => {
                if (--pending === 0) ScrollTrigger.refresh();
              }, { once: true });
              img.addEventListener('error', () => {
                if (--pending === 0) ScrollTrigger.refresh();
              }, { once: true });
            }
          });
        }

      }, root);

      // Refresh after the gate opens so onEnter runs for elements already
      // in viewport.
      ScrollTrigger.refresh();
    }, REVEAL_GATE_MS);

    const refreshOnLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', refreshOnLoad);

    return () => {
      clearTimeout(gateTimer);
      window.removeEventListener('load', refreshOnLoad);
      ctx?.revert();
      parallaxCtx?.revert();
    };
  }, [rootRef, enabled]);
}

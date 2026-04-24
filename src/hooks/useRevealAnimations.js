import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useRevealAnimations(rootRef, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const root = rootRef?.current ?? document;

    // Fire CREATIVE / DEVELOPER blur reveal immediately on mount so it
    // plays first, before any other animations on the page.
    const letstartSpans = (rootRef?.current ?? document).querySelectorAll(
      '.letstart .text span'
    );
    letstartSpans.forEach((s) => s.classList.add('appear'));

    // All other reveals hold back until ~50% through the 1.6s blur (≈800ms)
    // so the blur leads and the rest cascades in behind it.
    const REVEAL_GATE_MS = 800;

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
        // triggered above) so CREATIVE/DEVELOPER isn't double-triggered.
        gsap.utils.toArray('.text span').forEach((span) => {
          if (span.closest('.letstart')) return;
          ScrollTrigger.create({
            trigger: span,
            start: 'top bottom',
            once: true,
            onEnter: () => span.classList.add('appear')
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
          const useTranslate = section.classList.contains('parallax-y');
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

        // Scroll-linked parallax on .img-container .portimage.
        gsap.utils.toArray('.img-container').forEach((section) => {
          const img = section.querySelector('.portimage');
          if (!img) return;
          gsap.fromTo(
            img,
            { y: 0 },
            {
              y: -80,
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
    };
  }, [rootRef, enabled]);
}

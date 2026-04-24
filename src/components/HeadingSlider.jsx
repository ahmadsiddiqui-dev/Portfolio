import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HEADINGS = ['GYM', 'MUSIC', 'TRAVELLING'];
const REPEATS_DESKTOP = 10;
const BLOCK = HEADINGS.length;

export default function HeadingSlider({ onActiveChange }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const isMobile = window.innerWidth <= 768;
    const repeats = isMobile ? 1 : REPEATS_DESKTOP;
    const middleStart = BLOCK * Math.floor(repeats / 2);

    let tabs = [];
    let current = isMobile ? 0 : middleStart;
    let allowTransition = false;

    const buildTrack = () => {
      track.innerHTML = '';
      const frag = document.createDocumentFragment();
      for (let r = 0; r < repeats; r++) {
        HEADINGS.forEach((txt, idx) => {
          const div = document.createElement('div');
          div.className = 'head-item';
          div.dataset.idx = String(idx);
          [...txt].forEach((ch, i) => {
            const span = document.createElement('span');
            span.textContent = ch;
            span.style.animationDelay = `${i * 0.08}s`;
            div.appendChild(span);
          });
          frag.appendChild(div);
        });
      }
      track.appendChild(frag);
      tabs = Array.from(track.querySelectorAll('.head-item'));
    };

    const getOffset = (idx) => {
      let offset = 0;
      for (let i = 0; i < idx; i++) {
        const el = tabs[i];
        const cs = getComputedStyle(el);
        offset += el.offsetWidth + parseInt(cs.marginLeft) + parseInt(cs.marginRight);
      }
      return offset;
    };

    const activate = (i) => {
      current = i;
      const realIdx = Number(tabs[i].dataset.idx);
      tabs.forEach((t) => t.classList.remove('active'));
      tabs[i].classList.add('active');
      setActiveIdx(realIdx);
      onActiveChange?.(realIdx);

      const offset = getOffset(i);
      track.style.transition = allowTransition
        ? 'transform .8s cubic-bezier(0.62,0.05,0.01,0.99)'
        : 'none';
      requestAnimationFrame(() => {
        track.style.transform = `translateX(-${offset}px)`;
      });
    };

    const onClick = (e) => {
      const target = e.target.closest('.head-item');
      if (!target) return;
      const i = tabs.indexOf(target);
      if (i < 0) return;
      allowTransition = true;
      activate(i);
    };

    const onTransitionEnd = () => {
      const total = tabs.length;
      if (current < BLOCK || current >= total - BLOCK) {
        allowTransition = false;
        const middleIdx = middleStart + (current % BLOCK);
        activate(middleIdx);
      }
    };

    buildTrack();
    activate(current);
    track.addEventListener('click', onClick);
    track.addEventListener('transitionend', onTransitionEnd);

    const st = ScrollTrigger.create({
      trigger: viewport,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        tabs.forEach((t) => t.classList.add('animate'));
      }
    });

    return () => {
      track.removeEventListener('click', onClick);
      track.removeEventListener('transitionend', onTransitionEnd);
      st.kill();
    };
  }, [onActiveChange]);

  return (
    <div className="headings-viewport" id="headingSection" ref={viewportRef}>
      <div className="headings-track" id="headTrack" ref={trackRef}></div>
    </div>
  );
}

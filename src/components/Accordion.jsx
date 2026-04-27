import { useRef, useState } from 'react';

export default function Accordion({ items }) {
  const [active, setActive] = useState(0);
  const bodyRefs = useRef([]);

  const toggle = (idx) => {
    setActive((cur) => (cur === idx ? -1 : idx));
  };

  return (
    <div className="accordion">
      <style>{`
        /* Android tap-highlight + focus ring + selection: kill every blue
         * overlay/glow Android Chrome paints on tap. Scoped to the
         * accordion header tree only. pointer-events:none on inner children
         * forces the tap target to be the header itself (one element to
         * style instead of three). */
        .accordion .accordion-header,
        .accordion .accordion-header * {
          -webkit-tap-highlight-color: rgba(0,0,0,0) !important;
          -webkit-user-select: none !important;
          user-select: none !important;
          touch-action: manipulation;
          outline: none !important;
        }
        .accordion .accordion-header > * {
          pointer-events: none;
        }
        .accordion .accordion-header:focus,
        .accordion .accordion-header:focus-visible,
        .accordion .accordion-header:active {
          outline: none !important;
          background-color: transparent !important;
          box-shadow: none !important;
        }
        @media (max-width: 768px) {
          .accordion .toggle {
            font-family: "JetBrains Mono", "PP Neue Montreal Book", "PP Neue Montreal", monospace !important;
            font-weight: 100 !important;
            font-size: 27px !important;
          }
          html.is-ios .accordion .toggle {
            -webkit-text-stroke: 0 !important;
            -webkit-font-smoothing: antialiased !important;
            font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif !important;
            font-weight: 300 !important;
          }
        }
      `}</style>
      {items.map((item, idx) => {
        const isActive = active === idx;
        const body = bodyRefs.current[idx];
        const maxHeight = isActive && body ? body.scrollHeight + 'px' : '0px';
        return (
          <div key={idx} className={isActive ? 'accordion-item active' : 'accordion-item'}>
            <div
              className="accordion-header"
              onClick={() => toggle(idx)}
              style={{ WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
            >
              <p className="number hideme" style={{ fontSize: '22px', WebkitTapHighlightColor: 'transparent' }}>{String(idx + 1).padStart(2, '0')}</p>
              <div className="title" style={{ WebkitTapHighlightColor: 'transparent' }}>{item.title}</div>
              <p
                className="toggle"
                style={{
                  fontSize: '30px',
                  paddingLeft: 0,
                  paddingRight: 0,
                  margin: 0,
                  marginRight: 0,
                  lineHeight: 1,
                  transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
                  transformOrigin: '50% 50%',
                  transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                +
              </p>
            </div>
            <div
              className="accordion-body"
              ref={(el) => { bodyRefs.current[idx] = el; }}
              style={{
                maxHeight,
                paddingTop: isActive ? '10px' : 0,
                paddingBottom: isActive ? '100px' : 0
              }}
            >
              <p className={item.className || ''}>{item.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

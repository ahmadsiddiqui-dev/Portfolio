import TLink from './TLink.jsx';
import { useMenu } from './MenuOverlay.jsx';

const UNDERLINE = {
  textDecoration: 'underline',
  textDecorationThickness: '1px',
  textUnderlineOffset: '10px'
};

export default function Header({ current = 'home', color, animated = false, extraStyle }) {
  const { openMenu } = useMenu();
  const styleFor = (name) => (current === name ? { ...UNDERLINE, color } : color ? { color } : undefined);

  return (
    <header
      className={animated ? 'headeranimation' : undefined}
      style={{ color, ...(extraStyle || {}) }}
    >
      <div className="navbar">
        <TLink to="/" id="nav" style={{ zIndex: 10001, ...(color ? { color } : {}) }}>Ahmad Siddiqui</TLink>
      </div>
      <div className="navbw" style={color ? { color } : undefined}>
        <p style={color ? { color } : undefined}> Software<br />Engineer</p>
        <p style={color ? { color } : undefined}>Based in Rampur<br /> India</p>
      </div>
      <div className="menu" style={color ? { color } : undefined}>
        <div style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <TLink to="/" className={current === 'home' ? 'hideme' : 'waah hideme'} style={styleFor('home')}>Home,</TLink>
        </div>
        <div className={current === 'work' ? 'hideme' : 'waah hideme'} style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <TLink to="/work" style={styleFor('work')}>Work,</TLink>
        </div>
        <div className={current === 'about' ? 'hideme' : 'waah hideme'} style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <TLink to="/about" style={styleFor('about')}>About,</TLink>
        </div>
        <div className={current === 'contact' ? 'hideme' : 'waah hideme'} style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <TLink to="/contact" style={styleFor('contact')}>Contact</TLink>
        </div>
        <div className="laptophide pad" style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <a
            onClick={(e) => { e.preventDefault(); openMenu(); }}
            style={{
              cursor: 'pointer',
              fontFamily: '"JetBrains Mono", "PP Neue Montreal Book", "PP Neue Montreal", monospace',
              fontSize: '14px',
              fontWeight: 400,
              letterSpacing: 0,
              lineHeight: 1.3,
              textTransform: 'uppercase',
              fontSynthesis: 'none',
              WebkitFontSynthesis: 'none',
              ...(color ? { color } : {})
            }}
          >
            [MENU]
          </a>
        </div>
      </div>
    </header>
  );
}

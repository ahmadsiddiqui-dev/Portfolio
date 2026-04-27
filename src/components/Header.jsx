import TLink from './TLink.jsx';
import { useMenu } from './MenuOverlay.jsx';

export default function Header({ current = 'home', color, animated = false, extraStyle }) {
  const { openMenu } = useMenu();
  const linkStyle = color ? { color } : undefined;

  return (
    <header
      className={animated ? 'headeranimation' : undefined}
      style={{ color, ...(extraStyle || {}) }}
    >
      <div className="navbar">
        <TLink to="/" id="nav" style={{ zIndex: 10001, ...(color ? { color } : {}) }}>Ahmad Siddiqui</TLink>
      </div>
      <div className="navbw" style={color ? { color } : undefined}>
        <p style={color ? { color } : undefined}>Software Engineer</p>
        <p style={color ? { color } : undefined}>Based in Rampur, India</p>
      </div>
      <div className="menu" style={color ? { color } : undefined}>
        <div style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <TLink to="/" className={'nav-link hideme' + (current === 'home' ? ' active' : '')} style={linkStyle}>[Home]</TLink>
        </div>
        <div style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <TLink to="/work" className={'nav-link hideme' + (current === 'work' ? ' active' : '')} style={linkStyle}>[Work]</TLink>
        </div>
        <div style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <TLink to="/about" className={'nav-link hideme' + (current === 'about' ? ' active' : '')} style={linkStyle}>[About]</TLink>
        </div>
        <div style={{ paddingLeft: 0, ...(color ? { color } : {}) }}>
          <TLink to="/contact" className={'nav-link hideme' + (current === 'contact' ? ' active' : '')} style={linkStyle}>[Contact]</TLink>
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

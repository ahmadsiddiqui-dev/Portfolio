import { useEffect, useRef } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TLink from '../components/TLink.jsx';
import useRevealAnimations from '../hooks/useRevealAnimations.js';

export default function Work() {
  const rootRef = useRef(null);
  useRevealAnimations(rootRef);

  useEffect(() => {
    sessionStorage.setItem('fromPage', 'work');
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#e5e5dd';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <div className="design-system" ref={rootRef}>
      <Header current="work" />

      <main>
        <div className="mblwork" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '190px', paddingTop: '100px', width: '100%' }}>
          <div className="div9" style={{ paddingLeft: '20px', paddingTop: '267px' }}>
            <div className="drop-wrap"><p className="drop-text point" style={{ width: '50px' }}>01/</p></div>
          </div>
          <div className="fornumprop">
            <div className="text mbltext qline qline-w1" style={{ paddingTop: '275px', paddingBottom: '5px' }}>
              <span>P</span><span>R</span><span>O</span><span>J</span><span>E</span><span>C</span><span>T</span><span>S</span>
            </div>
            <div className="drop-wrap hideme"><p className="drop-text formbl01">01</p></div>
            <div className="drop-wrap laptophide"><p className="drop-text formbl02">01</p></div>
          </div>
        </div>
        <br /><br />

        <div className="mblportfolioname" style={{ display: 'flex', flexDirection: 'row', padding: 0, paddingBottom: '200px', paddingLeft: '20px' }}>
          <div className="left" style={{ flex: 1, position: 'sticky' }}>
            <div className="div10" style={{ paddingBottom: '20px', paddingTop: '50px' }}>
              <TLink to="/projectpage">
                <div className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                  {['a','h','m','a','d'].map((c, i) => (<span key={i} className="spanemail" style={{ lineHeight: 1 }}>{c}</span>))}
                </div>
                <div className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                  {['s','i','d','d','i','q','u','i'].map((c, i) => (<span key={i} className="spanemail" style={{ lineHeight: 1 }}>{c}</span>))}
                </div>
              </TLink>
            </div>
            <div className="divd1 divd2mbl" style={{ fontSize: '40px', paddingLeft: '140px', paddingTop: '15px' }}>
              <div className="drop-wrap"><p className="drop-text">PORTFOLIO &#169;2026</p></div>
            </div>
            <div className="divd1 divd1mbl" style={{ paddingLeft: '140px', flexDirection: 'column', paddingTop: '30px', textTransform: 'uppercase' }}>
              <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px' }}>A personal portfolio website</p></div>
              <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: '0.08s' }}>designed and developed using </p></div>
              <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: '0.16s' }}>React, GSAP, Lenis, and Three.js.</p></div>
            </div>
          </div>

          <div className="img-container" style={{ flex: 2, overflow: 'hidden', marginTop: '70px', position: 'relative' }}>
            <img src={`${import.meta.env.BASE_URL}projectimg.jpg`} alt="" className="portimage" style={{ objectFit: 'fill' }} />
            <div className="laptophide" style={{ position: 'absolute', zIndex: 5, top: 157, left: 98 }}>
              <TLink to="/projectpage">
                <p className="see-more-btn" style={{ fontSize: '22px', backgroundColor: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px', borderRadius: '50%', paddingTop: 50 }}>
                  See<br /> more
                </p>
              </TLink>
            </div>
          </div>
        </div>

        <div className="div9 foremainmar" style={{ paddingBottom: '80px', gap: '200px' }}>
          <div className="drop-wrap"><p className="drop-text">02/</p></div>
          <div className="mblwanttowork" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="drop-wrap"><p className="drop-text">WANT TO WORK</p></div>
            <div className="drop-wrap"><p className="drop-text">TOGETHER?</p></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '300px' }}>SEND ME A</p></div>
            <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '300px' }}>MESSAGE</p></div>
          </div>
        </div>

        <div className="div10 hideme" style={{ paddingLeft: '35px' }}>
          <a className="hoverunderline" href="mailto:ahmadsiddiqui909@mail.com" target="_blank" rel="noreferrer">
            <div className="textemail">
              {'hello@ahmadjav'.split('').map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
            <div className="textemail">
              {'aidsiddiqui.com'.split('').map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
          </a>
        </div>

        <div className="div10 div101" style={{ paddingLeft: '35px' }}>
          <a className="hoverunderline" href="mailto:ahmadsiddiqui909@mail.com" target="_blank" rel="noreferrer">
            <div className="textemail">{['h','e','l','l','0','@'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
            <div className="textemail">{['a','h','m','a','d'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
            <div className="textemail">{['j','a','v','a','i','d'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
            <div className="textemail">{['s','i','d','d','i','q','u','i'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
            <div className="textemail">{['.','c','o','m'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

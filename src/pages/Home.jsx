import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Preloader from '../components/Preloader.jsx';
import TLink from '../components/TLink.jsx';
import useRevealAnimations from '../hooks/useRevealAnimations.js';

// Module-level flag: resets on full page reload (so preloader plays on refresh),
// persists across SPA route changes (so going Work → Home doesn't replay it).
let preloaderShown = false;

export default function Home() {
  const [ready, setReady] = useState(preloaderShown);
  const rootRef = useRef(null);
  useRevealAnimations(rootRef, ready);

  useEffect(() => {
    if (ready) {
      preloaderShown = true;
      sessionStorage.setItem('fromPage', 'index');
      // Preloader hid body overflow and content was covered — remeasure so
      // ScrollTriggers fire at the right positions now that content is visible.
      const t = setTimeout(() => ScrollTrigger.refresh(), 50);
      return () => clearTimeout(t);
    }
  }, [ready]);

  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#e5e5dd';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}

      <div
        id="content"
        className="design-system"
        ref={rootRef}
        style={{
          padding: 0,
          display: 'block',
          opacity: 1,
          visibility: ready ? 'visible' : 'hidden'
        }}
      >
        <Header current="home" animated extraStyle={{ paddingLeft: '20px' }} />

        <div className="letstart" style={{ padding: '140px 0px 0px 40px', color: 'black' }}>
          <div className="text" style={{ margin: '10px 0px 10px 0px', marginLeft: '-8px' }}>
            <span>C</span><span>R</span><span>E</span><span>A</span>
            <span className="emargin" >T</span>
            <span>I</span><span>V</span><span>E</span>
          </div>
          <div className="text homedevel" style={{ margin: '10px 0px 20px 0px', marginLeft: '-8px' }}>
            <span>D</span><span>E</span><span>V</span><span>E</span><span>L</span>
            <span className="emargin" >O</span>
            <span>P</span><span>E</span><span>R</span>
          </div>
          <div
            className="divd1 divd1mbl laptophide"
            style={{
              flexDirection: 'column',
              textTransform: 'uppercase',
              color: 'black',
              marginBottom: '35px',
              marginTop: '20px'
            }}
          >
            <div className="drop-wrap">
              <p className="drop-text divd1mbl" style={{ fontSize: '20px', padding: 0 }}>I SUPPORT DESIGNERS</p>
            </div>
            <div className="drop-wrap">
              <p className="drop-text divd1mbl" style={{ fontSize: '20px', animationDelay: '0.08s' }}>AND AGENCIES WITH </p>
            </div>
            <div className="drop-wrap">
              <p className="drop-text divd1mbl" style={{ fontSize: '20px', animationDelay: '0.16s' }}>CREATIVE DEVELOPMENT</p>
            </div>
          </div>
          <div className="text1 memain" style={{ width: '565px' }}>
            <img src="/finalmehome.jpg" alt="" className="imganimationhome memain laptophide" />
            <img src="/newme.jpg" alt="" className="imganimationhome memain hideme" />
            <div className="imganimationss" style={{ height: '250px' }}></div>
          </div>

          <div className="laptophide" style={{ display: 'flex', flexDirection: 'row', marginBottom: '180px' }}>
            <div className="laptophide" id="ass">
              <div className="ass laptophide">
                <h1 className="as">AHMAD</h1>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
                <div><h1 className="as laptophide">SIDDIQUI</h1></div>
                <div>
                  <h1 className="laptophide" style={{ paddingLeft: '35px', fontSize: '60px', marginTop: '-10px', fontWeight: 500 }}>↓</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="div3 arrowdiv" style={{ marginTop: '-150px' }}>
          <div className="text" style={{ height: '100px', width: '150px', display: 'flex', paddingLeft: '16px' }}>
            <span>↓</span>
          </div>
          <div id="sup">
            <p className="sup">I SUPPORT DESIGNERS<br /> AND AGENCIES WITH<br /> CREATIVE DEVELOPMENT</p>
          </div>
          <div id="ass">
            <div className="ass"><h1 className="as">AHMAD</h1></div>
            <div><h1 className="as">SIDDIQUI</h1></div>
          </div>
        </div>

        <div className="containermain" style={{ paddingLeft: '40px' }}>
          <div className="masterdiv" style={{ fontWeight: 500 }}>
            <div className="maindiv1">
              <div className="drop-wrap">
                <p className="drop-text1" id="nosize" style={{ width: '100px', fontWeight: 500 }}>01/</p>
              </div>
            </div>
            <div className="maindiv2 hideme" style={{ paddingLeft: '40px', textTransform: 'uppercase', fontWeight: 400 }}>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">Passionate about software technologies. I love</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">working at the intersection of creativity</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">and user friendly interfaces. I develop</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">AI driven web and mobile apps with LLMs.</p></div></div>
              <br /><br /><br />
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">When I'm not building or exploring new</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text" id="textsize">web experiences, I'm probably</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text" id="textsize"> at gym or travelling.</p></div></div>
            </div>
            <div className="maindiv2 laptophide" style={{ paddingLeft: '40px', textTransform: 'uppercase', fontWeight: 400 }}>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">Passionate about software</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">software technologies. I </p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">love working at the </p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">intersection of creativity</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize"> and user friendly interfaces.</p></div></div>
              {/* <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">.</p></div></div> */}
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">I develop AI driven web</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize"> and mobile apps with LLMs.</p></div></div>
              <br /><br /><br />
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">When I'm not building or</p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize"> exploring new web </p></div></div>
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">experiences, I'm probably at </p></div></div>
              {/* <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize"> </p></div></div> */}
              <div className="maindiv1"><div className="drop-wrap"><p className="drop-text1" id="textsize">gym or travelling.</p></div></div>
            </div>
          </div>
          <div className="maindiv3">
            <div>
              <div className="diva hideme"><div className="drop-wrap"><p className="drop-text hideme" id="nosize">Software Engineer developing</p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text hideme" id="nosize">AI driven and scalable</p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text hideme" id="nosize">applications</p></div></div>
            </div>
            <div>
              <div className="diva laptophide"><div className="drop-wrap"><p className="drop-text1 laptophide" id="nosize">Software Engineer developing</p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text laptophide" id="nosize">AI driven and scalable applications.</p></div></div>
            </div>
            <div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">With a background in software engineering, </p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">I collaborate closely with teams to </p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">build scalable applications for </p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">web and mobile platforms. I’ve</p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">worked on several projects where I</p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">translated ideas into efficient, </p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">high performance solutions. </p></div></div>
              <br /><br />
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">My experience includes developing </p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">mobile applications using Flutter </p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">and React Native, integrating APIs, </p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">and leveraging AI/LLMs to </p></div></div>
              <div className="diva"><div className="drop-wrap"><p className="drop-text" id="nosize">solve real-world problems. </p></div></div>
              <div className="divg1">
                <div className="drop-wrap"><TLink to="/about" className="drop-text" id="nosize">More about me and services</TLink></div>
              </div>
            </div>
          </div>
        </div>

        <div className="div9" style={{ paddingBottom: '40px' }}>
          <div className="drop-wrap"><p className="drop-text">02/</p></div>
          <div className="mblwanttowork2" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="drop-wrap"><p className="drop-text">RECENT</p></div>
            <div className="drop-wrap"><p className="drop-text">PROJECT</p></div>
          </div>
          <div className="hideme" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '100px' }}>CREATIVE</p></div>
            <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '100px' }}>DEVELOPMENT</p></div>
          </div>
        </div>

        <div
          className="mblportfolioname"
          style={{ display: 'flex', flexDirection: 'row', padding: 0, paddingBottom: '200px', paddingLeft: '20px' }}
        >
          <div className="left" style={{ flex: 1, position: 'sticky' }}>
            <div className="div10" style={{ paddingBottom: '20px', paddingTop: '50px' }}>
              <TLink to="/projectpage">
                <div className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                  <span className="spanemail" style={{ lineHeight: 1 }}>a</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>h</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>m</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>a</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>d</span>
                </div>
                <div className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                  <span className="spanemail" style={{ lineHeight: 1 }}>s</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>i</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>d</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>d</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>i</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>q</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>u</span>
                  <span className="spanemail" style={{ lineHeight: 1 }}>i</span>
                </div>
              </TLink>
            </div>
            <div className="divd1 divd2mbl" style={{ fontSize: '40px', paddingLeft: '140px', paddingTop: '15px' }}>
              <div className="drop-wrap"><p className="drop-text">PORTFOLIO &#169;2026</p></div>
            </div>
            <div className="divd1 divd1mbl" style={{ paddingLeft: '140px', flexDirection: 'column', paddingTop: '30px', textTransform: 'uppercase' }}>
              <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px' }}>A personal portfolio website</p></div>
              <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: '0.08s' }}>designed and developed using </p></div>
              <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: '0.16s' }}>HTML, CSS, and JavaScript.</p></div>
            </div>
          </div>

          <div className="img-container" style={{ flex: 2, overflow: 'hidden', marginTop: '70px', position: 'relative' }}>
            <img src="/projectimg.jpg" alt="" className="portimage" style={{ objectFit: 'fill' }} />
            <div className="laptophide" style={{ position: 'absolute', zIndex: 5, top: 157, left: 98 }}>
              <TLink to="/projectpage">
                <p style={{ fontSize: '22px', backgroundColor: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px', borderRadius: '50%', paddingTop: 50 }}>
                  See<br /> more
                </p>
              </TLink>
            </div>
          </div>
        </div>

        <div
          className="homehobby hideme foremainmar"
          style={{ display: 'flex', flexDirection: 'row', paddingBottom: '50px', paddingLeft: '40px', paddingTop: '200px' }}
        >
          <div className="div9" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="drop-wrap"><p className="drop-text point1" style={{ padding: 0 }}>03/</p></div>
            <div className="mblwanttowork laptophide" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="drop-wrap laptophide"><p className="drop-text laptophide">ABOUT ME</p></div>
            </div>
          </div>
          <div className="veryem">
            <div className="text textpadi" style={{ display: 'flex', marginTop: '5px', paddingBottom: '10px', marginLeft: '150px', marginBottom: '10px' }}>
              <span>G</span><span>Y</span><span>M</span><span>,</span>
            </div>
            <div className="text1 homeobbyimage" style={{ height: '300px', width: '600px', left: 152 }}>
              <img src="/gymtry.jpg" alt="" className="imganimation homeobbyimage2" />
              <div className="imganimations"></div>
            </div>
            <div className="text textpadi" style={{ display: 'flex', paddingBottom: '10px', marginTop: '20px', paddingLeft: '150px' }}>
              <span>T</span><span>R</span><span>A</span><span>V</span><span>E</span><span>L</span><span>L</span><span>I</span><span>N</span>
              <span style={{ animationDelay: '1s' }}>G</span>
              <span style={{ animationDelay: '1.1s' }}>,</span>
            </div>
            <div className="text" style={{ display: 'flex', margin: '15px', marginLeft: '150px' }}>
              <span>M</span><span>U</span><span>S</span><span>I</span><span>C</span><span>.</span>
            </div>
          </div>
          <div className="div9 hideme" style={{ padding: 0 }}>
            <div className="drop-wrap"><p className="drop-text hideme" style={{ padding: 0 }}>ABOUT ME</p></div>
          </div>
        </div>

        <div className="homehobbycontent" style={{ display: 'flex', flexDirection: 'row', gap: '70px' }}>
          <div className="divd1 homehobbycontent2 hideme" style={{ paddingLeft: '235px', flexDirection: 'column', paddingTop: '20px', paddingBottom: '200px' }}>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>My hobbies going to the gym, traveling, and</p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>listening to music fill much of my free time.</p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>The gym keeps me fit and focused, travel fuels</p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>my curiosity, and music brings emotional</p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>balance. Together, they help me unwind, stay</p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>inspired, and make the most of my leisure</p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>moments.</p></div>
          </div>
          <div className="divd1 homehobbycontent2 laptophide" style={{ paddingLeft: '235px', flexDirection: 'column', paddingTop: '20px', paddingBottom: '200px' }}>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>My hobbies going to the gym,</p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}> traveling, and listening to </p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>music fill much of my free time. </p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}> The gym keeps me fit and </p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>focused, travel fuels my</p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>curiosity, and music brings </p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>emotional balance. Together, </p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>they help me unwind, </p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>stay inspired, and make the </p></div>
            <div className="drop-wrap"><p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>most of my leisure moments.</p></div>
          </div>
          <div>
            <div className="drop-wrap moream" style={{ display: 'flex', paddingTop: '150px' }}>
              <p className="drop-text fonth" style={{ fontSize: '22px', paddingLeft: 0 }}>
                <TLink to="/about" className="fonth" style={{ fontSize: '22px', textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '30px', lineHeight: 4 }}>
                  More about me
                </TLink>
              </p>
            </div>
          </div>
        </div>

        <div className="div9 foremainmar" style={{ paddingBottom: '80px', gap: '200px' }}>
          <div className="drop-wrap"><p className="drop-text">04/</p></div>
          <div className="mblwanttowork" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="drop-wrap"><p className="drop-text">WANT TO WORK</p></div>
            <div className="drop-wrap"><p className="drop-text">TOGETHER?</p></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '300px' }}>SEND ME A</p></div>
            <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '300px' }}>MESSAGE</p></div>
          </div>
        </div>

        <div className="div10 hideme" style={{ width: '1040px', paddingLeft: '35px' }}>
          <a href="mailto:ahmadsiddiqui909@mail.com" target="_blank" rel="noreferrer">
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
            <div className="textemail">
              {['h', 'e', 'l', 'l', '0', '@'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
            <div className="textemail">
              {['a', 'h', 'm', 'a', 'd'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
            <div className="textemail">
              {['j', 'a', 'v', 'a', 'i', 'd'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
            <div className="textemail">
              {['s', 'i', 'd', 'd', 'i', 'q', 'u', 'i'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
            <div className="textemail">
              {['.', 'c', 'o', 'm'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
          </a>
        </div>

        <Footer />
      </div>
    </>
  );
}

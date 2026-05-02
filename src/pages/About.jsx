import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Accordion from '../components/Accordion.jsx';
import HeadingSlider from '../components/HeadingSlider.jsx';
import TLink from '../components/TLink.jsx';
import Hobby3DBoundary from '../components/Hobby3DBoundary.jsx';
import useRevealAnimations from '../hooks/useRevealAnimations.js';

// Lazy-load the 3D model component so the About page can render and
// paint before three.js + @react-three/drei + GLB loaders are downloaded
// and parsed. On mobile this is what makes the page show up immediately
// instead of staying blank while the WebGL stack initialises.
const Hobby3DModel = lazy(() => import('../components/Hobby3DModel.jsx'));

// Fallback image rendered if WebGL / three.js / GLB load fails (iOS Safari
// can fail in any of those steps). Keeps the page from going blank. Uses
// smaller images (gymtry.jpg 1.3 MB / music.jpg 126 KB) — gym2.png at
// 6.7 MB was too heavy and caused iPhone to show nothing while loading.
// Static image fallback (rendered when WebGL is unavailable, or when the
// 3D model errors out). gymtry.jpg + music.jpg are both already loaded
// elsewhere on the site, so they're typically warm in cache by the time
// the user reaches About.
function HobbyFallback({ activeType }) {
  const src = activeType === 'dumbbell'
    ? `${import.meta.env.BASE_URL}gymtry.jpg`
    : `${import.meta.env.BASE_URL}music.jpg`;
  return (
    <img
      src={src}
      alt={activeType}
      loading="eager"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        backgroundColor: '#d8d8d0'
      }}
    />
  );
}

const UNDERLINE = { textDecoration: 'underline', textDecorationThickness: '1px', textUnderlineOffset: '10px' };

// Some environments (iOS Safari with Lockdown Mode, very old browsers,
// virtualised setups, etc.) silently fail to provide a WebGL context.
// Feature-detect at module load: if WebGL isn't actually available, skip
// the 3D model entirely and render the static image instead. This is a
// truer test than UA sniffing — Chrome on iPhone supports WebGL even
// when Safari is locked down.
const SUPPORTS_WEBGL = (() => {
  if (typeof document === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(
      c.getContext('webgl2') ||
      c.getContext('webgl') ||
      c.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
})();

export default function About() {
  const rootRef = useRef(null);
  useRevealAnimations(rootRef);
  const [activeTab, setActiveTab] = useState(0);
  const hobbyType = activeTab === 0 ? 'dumbbell' : activeTab === 1 ? 'headphones' : 'travel';

  useEffect(() => {
    sessionStorage.setItem('fromPage', 'about');
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#e5e5dd';
    return () => {
      document.body.style.backgroundColor = prevBg;
    };
  }, []);

  useEffect(() => {
    if (!SUPPORTS_WEBGL) return;
    const base = import.meta.env.BASE_URL;
    const ctrl = new AbortController();
    ['dumble.glb', 'headphones.glb', 'travel.glb'].forEach((name) => {
      fetch(`${base}models/${name}`, { signal: ctrl.signal }).catch(() => {});
    });
    return () => ctrl.abort();
  }, []);

  return (
    <div ref={rootRef} className="about-page-scope design-system">
      <style>{`
        .about-page-scope .diva1 .drop-text,
        .about-page-scope .accordion-body p,
        .about-page-scope .text-content p,
        .about-page-scope .divd1.divd1mbl .drop-text,
        .about-page-scope .accordion .title,
        .about-page-scope .text-content h4,
        .about-page-scope .div9 .drop-text {
          font-family: "JetBrains Mono", "PP Neue Montreal Book", "PP Neue Montreal", monospace !important;
          font-weight: 300 !important;
          line-height: 1.2 !important;
          letter-spacing: -0.03ch !important;
          text-transform: uppercase !important;
          font-synthesis: none;
          -webkit-font-synthesis: none;
        }
        html.is-ios .about-page-scope .diva1 .drop-text,
        html.is-ios .about-page-scope .accordion-body p,
        html.is-ios .about-page-scope .accordion-body,
        html.is-ios .about-page-scope .text-content p,
        html.is-ios .about-page-scope .text-content,
        html.is-ios .about-page-scope .divd1.divd1mbl .drop-text,
        html.is-ios .about-page-scope .accordion .title,
        html.is-ios .about-page-scope .text-content h4,
        html.is-ios .about-page-scope .div9 .drop-text,
        html.is-ios .about-page-scope footer,
        html.is-ios .about-page-scope footer * {
          -webkit-text-stroke: 0 !important;
        }
        .about-page-scope .accordion .title,
        .about-page-scope .text-content h4,
        .about-page-scope .div9 .drop-text {
          font-weight: 500 !important;
        }
        .about-page-scope .text,
        .about-page-scope .text span,
        .about-page-scope .head-item,
        .about-page-scope .head-item span {
          font-family: "T1 Korium", "Big Shoulders Display", "Anton", "PP Neue Montreal", sans-serif !important;
          font-weight: 400 !important;
          letter-spacing: 0 !important;
          line-height: 0.98 !important;
        }
        .about-page-scope .textemail,
        .about-page-scope .textemail .spanemail {
          font-family: "T1 Korium", "Big Shoulders Display", "Anton", "PP Neue Montreal", sans-serif !important;
          font-weight: 200 !important;
          letter-spacing: -0.03ch !important;
          line-height: 1.1 !important;
        }
        .about-page-scope .text span {
          margin-top: -0.22em !important;
          margin-bottom: 0 !important;
        }
        .about-page-scope .imganimations,
        .about-page-scope .imganimationss {
          background-color: #e5e5dd !important;
        }
        @media (max-width: 768px) {
          .about-page-scope .text span {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          .about-page-scope .text {
            margin-bottom: -0.15em !important;
          }
        }
        .about-page-scope #nav {
          font-family: "T1 Korium", "Big Shoulders Display", "PP Neue Montreal", sans-serif !important;
          font-weight: 300 !important;
          letter-spacing: 0.02em !important;
          text-transform: uppercase !important;
        }
        @media (min-width: 1167px) {
          .about-page-scope #nav {
            font-size: 32px !important;
            font-weight: 200 !important;
            letter-spacing: 0.05em !important;
          }
        }
        .about-page-scope .navbw,
        .about-page-scope .navbw p,
        .about-page-scope .menu,
        .about-page-scope .menu a {
          font-family: "JetBrains Mono", "PP Neue Montreal Book", "PP Neue Montreal", monospace !important;
          font-weight: 400 !important;
          letter-spacing: -0.03ch !important;
          text-transform: uppercase !important;
          font-synthesis: none;
          -webkit-font-synthesis: none;
        }
        .about-page-scope .textemail {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }
        .about-page-scope .textemail + .textemail {
          margin-top: -0.25em !important;
        }
        @media (max-width: 768px) {
          .about-page-scope .textemail {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .about-page-scope .textemail,
          .about-page-scope .textemail .spanemail {
            line-height: 0.75 !important;
          }
          .about-page-scope .img-container {
            height: 400px !important;
            overflow: hidden !important;
          }
          .about-page-scope .img-container .portimage {
            height: 130% !important;
            width: 100% !important;
          }
        }
        @media (max-width: 768px) {
          .about-page-scope .textemail {
            margin: 0 !important;
          }
          .about-page-scope .textemail + .textemail {
            margin-top: -0.25em !important;
          }
          .about-page-scope .head-item {
            margin-top: 0 !important;
            margin-bottom: -0.15em !important;
          }
          .about-page-scope .div10 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .about-page-scope .mblportfolioname {
            padding-bottom: 20px !important;
          }
          .about-page-scope .div9.foremainmar {
            padding-bottom: 0 !important;
            gap: 0 !important;
          }
        }
        .about-page-scope .textemail .spanemail {
          line-height: 1.1 !important;
        }
        .about-page-scope .text,
        .about-page-scope .head-item,
        .about-page-scope .textemail,
        .about-page-scope .textemail .spanemail {
          font-size: clamp(62px, 20vw, 180px) !important;
        }
        @media (max-width: 768px) {
          .about-page-scope .text,
          .about-page-scope .head-item,
          .about-page-scope .textemail,
          .about-page-scope .textemail .spanemail {
            font-size: 80px !important;
          }
        }
        .about-page-scope .imageaboutab {
          perspective: 1200px;
        }
        .about-page-scope .imageaboutab {
          width: 100% !important;
          max-width: 800px !important;
          height: 700px !important;
          position: relative !important;
          margin: 0 auto !important;
        }
        .about-page-scope .imageaboutab .hobby-3d {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          touch-action: none;
        }
        .about-page-scope .imageaboutab .hobby-3d.active {
          opacity: 1;
          pointer-events: auto;
          z-index: 5;
        }
        @media (max-width: 1166px) {
          .about-page-scope .imageaboutab {
            height: 500px !important;
          }
        }
        @media (max-width: 768px) {
          .about-page-scope .imageaboutab {
            height: 280px !important;
            max-width: 100% !important;
            margin-top: 30px !important;
            margin-bottom: 0 !important;
          }
          /* Mobile: let vertical scroll pass through the canvas so the page
           * is scrollable when the model is on screen. OrbitControls still
           * handles horizontal swipe for rotation. */
          .about-page-scope .imageaboutab .hobby-3d,
          .about-page-scope .imageaboutab .hobby-3d canvas {
            touch-action: pan-y !important;
          }
        }
        .about-page-scope .imageaboutab .hobby-3d canvas {
          touch-action: none !important;
          pointer-events: auto !important;
        }
        @media (max-width: 1166px) {
          .about-page-scope .imageaboutab .hobby-3d {
            width: 100%;
            height: 500px;
          }
        }
        @media (max-width: 768px) {
          .about-page-scope .imageaboutab .hobby-3d {
            height: 280px;
          }
        }
        .about-page-scope footer,
        .about-page-scope footer * {
          font-family: "JetBrains Mono", "PP Neue Montreal Book", "PP Neue Montreal", monospace !important;
          font-weight: 500 !important;
          letter-spacing: -0.03ch !important;
          text-transform: uppercase !important;
          font-synthesis: none;
          -webkit-font-synthesis: none;
        }
        @media (max-width: 768px) {
          .about-page-scope footer,
          .about-page-scope footer * {
            font-size: 17px !important;
          }
        }
        .about-page-scope .footer-connect {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .about-page-scope .footer-connect-links {
          display: flex;
          gap: 12px;
        }
        .about-page-scope .footer-connect-links a {
          text-decoration: underline !important;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }
        .about-page-scope .diva1 .drop-text,
        .about-page-scope .accordion-body p,
        .about-page-scope .text-content p,
        .about-page-scope .divd1.divd1mbl .drop-text {
          font-size: 14px !important;
        }
        @media (max-width: 768px) {
          .about-page-scope .accordion .title,
          .about-page-scope .text-content h4,
          .about-page-scope .div9 .drop-text {
            font-size: 17px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1166px) {
          .about-page-scope .diva1 .drop-text,
          .about-page-scope .accordion-body p,
          .about-page-scope .text-content p,
          .about-page-scope .divd1.divd1mbl .drop-text {
            font-size: 15px !important;
          }
        }
        @media (min-width: 1167px) {
          .about-page-scope .diva1 .drop-text,
          .about-page-scope .accordion-body p,
          .about-page-scope .text-content p,
          .about-page-scope .divd1.divd1mbl .drop-text {
            font-size: 17px !important;
          }
        }
      `}</style>
      <Header current="about" animated />

      <div className="mblaboutpage1" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '190px' }}>
        <div className="div9" style={{ paddingTop: '367px', paddingLeft: '20px' }}>
          <div className="drop-wrap"><p className="drop-text point">01/</p></div>
        </div>
        <div className="mblaboutpage2" style={{ paddingTop: '365px', gap: 0 }}>
          <div>
            <div className="text qline qline-1" style={{ padding: 0 }}>
              <span>P</span><span>A</span><span>S</span><span>S</span><span>I</span><span>O</span><span>N</span><span>A</span>
              <span className="emargin">T</span>
              <span>E</span>
            </div>
            <div className="text qline qline-2" style={{ padding: 0 }}>
              <span>C</span><span>R</span><span>E</span><span>A</span>
              <span className="emargin">T</span>
              <span>I</span><span>V</span><span>E</span>
            </div>
            <div className="text qline qline-3" style={{ padding: 0, marginBottom: '20px' }}>
              <span>D</span><span>E</span><span>V</span><span>E</span><span>L</span>
              <span className="emargin">O</span>
              <span>P</span><span>E</span><span>R</span>
            </div>
            <div className="text1 mblfirst parallax-y" style={{ paddingLeft: '40px' }}>
              <img src={`${import.meta.env.BASE_URL}about-cover.jpg`} alt="" className="imganimation" />
              <div className="imganimations"></div>
            </div>
            <div className="text qline qline-4" style={{ padding: 0, paddingTop: '20px' }}>
              <span>B</span><span>A</span><span>S</span><span>E</span><span>D</span>
              <span style={{ color: '#e5e5dd' }}>-</span>
              <span>I</span><span>N</span>
            </div>
            <div className="text qline qline-5" style={{ padding: 0 }}>
              <span>R</span><span>A</span><span>M</span><span>P</span><span>U</span><span>R</span>
            </div>
          </div>
          <div className="emergency">
            <div className="diva1 ajor" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="drop-wrap hideme"><p className="drop-text" id="nosize">A journey of curiosity </p></div>
              <div className="drop-wrap hideme"><p className="drop-text" id="nosize">and explorations</p></div>
              <div className="drop-wrap laptophide"><p className="drop-text" id="nosize">A journey of curiosity and explorations</p></div>
            </div>
            <div className="diva1 mblpassion" style={{ display: 'flex', flexDirection: 'column', fontSize: '25px' }}>
              <div className="drop-wrap"><p className="drop-text" id="nosize">I’m passionate about building scalable</p></div>
              <div className="drop-wrap"><p className="drop-text" id="nosize">applications and always strive to</p></div>
              <div className="drop-wrap"><p className="drop-text" id="nosize">balance performance with usability.</p></div>
              <div className="drop-wrap"><p className="drop-text" id="nosize">Whether working independently or as</p></div>
              <div className="drop-wrap"><p className="drop-text" id="nosize">part of a team, I focus on delivering</p></div>
              <div className="drop-wrap"><p className="drop-text" id="nosize">solutions that are not only robust but</p></div>
              <div className="drop-wrap formar" style={{ marginBottom: '70px' }}><p className="drop-text" id="nosize">also efficient and scalable.</p></div>
              <div className="drop-wrap"><p className="drop-text" id="nosize">Each project is an opportunity to</p></div>
              <div className="drop-wrap"><p className="drop-text" id="nosize">learn and apply new technologies</p></div>
              <div className="drop-wrap"><p className="drop-text" id="nosize">across domains including AI,</p></div>
              <div className="drop-wrap formar" style={{ marginBottom: '70px' }}><p className="drop-text" id="nosize">mobile development, and systems design.</p></div>
              <div className="text1 mblme" style={{ padding: 0, height: '550px', width: '360px' }}>
                <img src={`${import.meta.env.BASE_URL}meabout.jpg`} alt="" className="imganimation mblme" style={{ height: '550px', width: '355px' }} />
                <div className="imganimations mblme" style={{ height: '550px' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mblaboutpage3" style={{ display: 'flex', justifyContent: 'flex-start', gap: '200px', paddingBottom: '100px', paddingTop: '300px' }}>
        <div className="div9" style={{ paddingLeft: '20px', paddingBottom: '78px' }}>
          <div className="drop-wrap"><p className="drop-text point" style={{ paddingRight: '15px' }}>02/</p></div>
        </div>
        <div className="text qline qline-6" style={{ padding: '7px 0px 0px 25px' }}>
          <span>S</span><span>E</span><span>R</span><span>V</span><span>I</span><span>C</span><span>E</span><span>S</span>
        </div>
      </div>

      <div className="div8" style={{ paddingBottom: '300px', paddingLeft: '310px' }}>
        <Accordion
          items={[
            {
              title: 'Mobile & Web App Development',
              body: 'I design, develop, and maintain scalable mobile and web applications using modern technologies, focusing on performance and user experience.'
            },
            {
              title: 'AI Integration & APIs',
              className: 'fontp',
              body: 'I integrate AI/LLM capabilities and third-party APIs to build intelligent features and enhance application functionality.'
            },
            {
              title: 'Interaction Design / Animation',
              body: 'I create smooth interactions and animations that improve usability and deliver engaging user experiences.'
            },
            {
              title: 'Creative Development',
              body: 'I craft visually engaging interfaces and implement creative solutions that combine design and technology for impactful digital experiences.'
            }
          ]}
        />
      </div>

      <div className="div9">
        <div className="drop-wrap"><p className="drop-text">03/</p></div>
        <div className="mblwanttowork" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="drop-wrap"><p className="drop-text">PERSONAL</p></div>
          <div className="drop-wrap"><p className="drop-text">INTREST</p></div>
        </div>
        <div className="hideme" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="drop-wrap"><p className="drop-text hideme">DRAG</p></div>
          <div className="drop-wrap"><p className="drop-text hideme">AROUND</p></div>
        </div>
      </div>

      <HeadingSlider onActiveChange={setActiveTab} />

      <div className="content">
        <div className="textabout">
          <div className={'text-content' + (activeTab === 0 ? ' active' : '')} data-idx="0">
            <h4>Strength &amp; Discipline</h4>
            <p>Hitting the gym is part of my daily rhythm. I focus on strength training and fitness, which helps me stay grounded, energized, and focused both physically and mentally.</p>
          </div>
          <div className={'text-content' + (activeTab === 1 ? ' active' : '')} data-idx="1">
            <h4>Beats &amp; Balance</h4>
            <p>Music keeps me motivated. Whether it’s focus playlists during work, high-energy tracks at the gym, or laid-back evening tunes, I enjoy discovering sounds that match every mood.</p>
          </div>
          <div className={'text-content' + (activeTab === 2 ? ' active' : '')} data-idx="2">
            <h4>New Places, Fresh Perspectives</h4>
            <p>Travelling inspires me. I love exploring new cultures, cuisines, and landscapes-whether it’s a weekend road trip or a long adventure. Every journey brings a new story and viewpoint.</p>
          </div>
        </div>
        <div className="imageaboutab">
          <div data-lenis-prevent className="hobby-3d active">
            {SUPPORTS_WEBGL ? (
              <Hobby3DBoundary
                fallback={<HobbyFallback activeType={hobbyType} />}
              >
                <Suspense fallback={<HobbyFallback activeType={hobbyType} />}>
                  <Hobby3DModel activeType={hobbyType} />
                </Suspense>
              </Hobby3DBoundary>
            ) : (
              <HobbyFallback activeType={hobbyType} />
            )}
          </div>
        </div>
      </div>

      <div className="div9" style={{ paddingBottom: '40px' }}>
        <div className="drop-wrap"><p className="drop-text">04/</p></div>
        <div className="mblwanttowork2" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="drop-wrap"><p className="drop-text">SEE LATEST</p></div>
          <div className="drop-wrap"><p className="drop-text">PROJECT</p></div>
        </div>
        <div className="hideme" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '100px' }}>CREATIVE</p></div>
          <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '100px' }}>DEVELOPMENT</p></div>
        </div>
      </div>

      <div className="mblportfolioname" style={{ display: 'flex', flexDirection: 'row', padding: 0, paddingBottom: '80px', paddingLeft: '20px' }}>
        <div className="left" style={{ flex: 1, position: 'sticky' }}>
          <div className="div10" style={{ paddingBottom: '20px', paddingTop: '50px' }}>
            <TLink to="/projectpage/notee-ai">
              <div className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                {['n', 'o', 't', 'e', 'e'].map((c, i) => (<span key={i} className="spanemail" style={{ lineHeight: 1 }}>{c}</span>))}
              </div>
              <div className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                {['A', 'I', '-', 'A', 'P', 'P'].map((c, i) => (<span key={i} className="spanemail" style={{ lineHeight: 1 }}>{c}</span>))}
              </div>
            </TLink>
          </div>
          <div className="divd1 divd1mbl" style={{ paddingLeft: '15px', flexDirection: 'column', paddingTop: '30px', textTransform: 'uppercase' }}>
            <div className="drop-wrap"><p className="drop-text divd1mbl first-desc-mbl" style={{ fontSize: '22px' }}>An AI-powered voice note-taking</p></div>
            <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: '0.08s' }}>app that turns recordings into </p></div>
            <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: '0.16s' }}>transcripts, summaries, and study tools.</p></div>
          </div>
        </div>

        <div className="img-container notee-cover" style={{ flex: 2, overflow: 'hidden', marginTop: '70px', position: 'relative' }}>
          <img src={`${import.meta.env.BASE_URL}new1project.jpg`} alt="" className="portimage" style={{ objectFit: 'cover' }} decoding="async" />
          <div className="laptophide" style={{ position: 'absolute', zIndex: 5, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <TLink to="/projectpage/notee-ai">
              <p className="see-more-btn" style={{ fontSize: '18px', backgroundColor: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center', width: '130px', height: '130px', borderRadius: '50%', paddingTop: 45 }}>
                See<br /> more
              </p>
            </TLink>
          </div>
        </div>
      </div>

      <div className="mblportfolioname" style={{ display: 'flex', flexDirection: 'row', padding: 0, paddingBottom: '80px', paddingLeft: '20px' }}>
        <div className="left" style={{ flex: 1, position: 'sticky' }}>
          <div className="div10" style={{ paddingBottom: '20px', paddingTop: '50px' }}>
            <TLink to="/projectpage/portfolio">
              <div className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                {['a', 'h', 'm', 'a', 'd'].map((c, i) => (<span key={i} className="spanemail" style={{ lineHeight: 1 }}>{c}</span>))}
              </div>
              <div className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                {['s', 'i', 'd', 'd', 'i', 'q', 'u', 'i'].map((c, i) => (<span key={i} className="spanemail" style={{ lineHeight: 1 }}>{c}</span>))}
              </div>
            </TLink>
          </div>
          <div className="divd1 divd1mbl" style={{ paddingLeft: '15px', flexDirection: 'column', paddingTop: '30px', textTransform: 'uppercase' }}>
            <div className="drop-wrap"><p className="drop-text divd1mbl first-desc-mbl" style={{ fontSize: '22px' }}>A personal portfolio website</p></div>
            <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: '0.08s' }}>designed and developed using </p></div>
            <div className="drop-wrap"><p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: '0.16s' }}>React, GSAP, Lenis, and Three.js.</p></div>
          </div>
        </div>

        <div className="img-container" style={{ flex: 2, overflow: 'hidden', marginTop: '70px', position: 'relative' }}>
          <img src={`${import.meta.env.BASE_URL}new2project.jpg`} alt="" className="portimage" style={{ objectFit: 'cover' }} decoding="async" />
          <div className="laptophide" style={{ position: 'absolute', zIndex: 5, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <TLink to="/projectpage/portfolio">
              <p className="see-more-btn" style={{ fontSize: '18px', backgroundColor: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center', width: '130px', height: '130px', borderRadius: '50%', paddingTop: 45 }}>
                See<br /> more
              </p>
            </TLink>
          </div>
        </div>
      </div>

      <div className="div9 foremainmar" style={{ paddingBottom: '30px', gap: '200px' }}>
        <div className="drop-wrap"><p className="drop-text">05/</p></div>
        <div className="mblwanttowork" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="drop-wrap"><p className="drop-text">WANT TO WORK</p></div>
          <div className="drop-wrap"><p className="drop-text">TOGETHER?</p></div>
        </div>
        <div className="hideme" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '300px' }}>SEND ME A</p></div>
          <div className="drop-wrap"><p className="drop-text hideme" style={{ paddingLeft: '300px' }}>MESSAGE</p></div>
        </div>
      </div>

      <div className="div10 hideme" style={{ paddingLeft: '35px' }}>
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
          <div className="textemail">{['h', 'e', 'l', 'l', '0', '@'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          <div className="textemail">{['a', 'h', 'm', 'a', 'd'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          <div className="textemail">{['j', 'a', 'v', 'a', 'i', 'd'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          <div className="textemail">{['s', 'i', 'd', 'd', 'i', 'q', 'u', 'i'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          <div className="textemail">{['.', 'c', 'o', 'm'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
        </a>
      </div>

      <Footer />
    </div>
  );
}

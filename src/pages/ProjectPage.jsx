import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TLink from '../components/TLink.jsx';
import useRevealAnimations from '../hooks/useRevealAnimations.js';

export default function ProjectPage() {
  const rootRef = useRef(null);
  const navigate = useNavigate();
  useRevealAnimations(rootRef);

  useEffect(() => {
    sessionStorage.setItem('fromPage', 'projectpage');
    document.body.classList.add('projectpage');
    const prevBg = document.body.style.backgroundColor;
    const prevColor = document.body.style.color;
    document.body.style.backgroundColor = '#464c47';
    document.body.style.color = 'white';
    return () => {
      document.body.classList.remove('projectpage');
      document.body.style.backgroundColor = prevBg;
      document.body.style.color = prevColor;
    };
  }, []);

  const handleClose = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  return (
    <div ref={rootRef} className="design-system">
      <div id="popup-content">
        <span id="close-pop">×</span>
        <button className="waah drop-text2" id="close-popup" onClick={handleClose}>Close</button>

        <div className="divpop">
          <div className="drop-wrap"><p className="drop-text2 fontproject">Case study</p></div>
          <div className="drop-wrap">
            <TLink to="/" className="visitclass hideme" style={{ color: 'white' }}>
              <p className="drop-text2">Visit live link</p>
            </TLink>
          </div>
          <div className="drop-wrap"><p className="drop-text2 fontproject">Portfolio&#169;2026</p></div>
        </div>

        <div className="mainpopdiv">
          <div className="mainpopdiv2">
            <div style={{ padding: 0, fontWeight: 500 }}>
              <div className="mainpopdiv3 hideme">
                <div className="divd1 projectdivda" style={{ paddingLeft: '1px', flexDirection: 'column', paddingTop: '120px' }}>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0 }}>The site features interactive sections such as </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.05s' }}>project galleries, animated page transitions, </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.10s' }}>and tab-based 3D model interactions on the </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.15s' }}>About page. React powers the component logic </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.20s' }}>and routing, while GSAP and ScrollTrigger </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.25s' }}>drive the blur-reveal letter cascades, parallax </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.30s' }}>effects, and image covers throughout. Lenis </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.35s' }}>handles the buttery smooth scrolling, and </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.40s' }}>Three.js renders the interactive 3D models. </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.45s' }}>The result feels fluid and modern across </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.50s' }}>mobile, tablet, and desktop.</p></div>
                </div>
              </div>
              <div className="mainpopdiv3 laptophide">
                <div className="divd1 projectdivda" style={{ paddingLeft: '1px', flexDirection: 'column', paddingTop: '120px' }}>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0 }}>The site features interactive</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.05s' }}>sections such as project galleries,</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.10s' }}>animated page transitions, and</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.15s' }}>tab-based 3D model interactions</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.20s' }}>on the About page. React powers</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.25s' }}>the component logic and routing,</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.30s' }}>while GSAP and ScrollTrigger drive</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.35s' }}>blur-reveal letter cascades,</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.40s' }}>parallax effects, and image covers</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.45s' }}>throughout. Lenis handles the</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.50s' }}>smooth scrolling, and Three.js</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.55s' }}>renders the interactive 3D models.</p></div>
                </div>
              </div>
            </div>

            <div className="drop-wrap">
              <TLink to="/" className="visitclass2 laptophide" style={{ color: 'white' }}>
                <p className="drop-text2">Visit live link</p>
              </TLink>
            </div>

            <div className="projectinfodiv hideme">
              <p className="underdiv">PROJECT INFO</p>
              <div className="underdiv inforow">
                <span>Role</span>
                <span>Design &amp; Development</span>
              </div>
              <div className="underdiv inforow">
                <span>Year</span>
                <span>2025</span>
              </div>
            </div>
            <div className="projectinfodiv laptophide">
              <p className="underdiv">PROJECT INFO</p>
              <div className="underdiv inforow">
                <span>Role</span>
                <span>Design &amp; Development</span>
              </div>
              <div className="underdiv inforow">
                <span>Year</span>
                <span>2025</span>
              </div>
            </div>
          </div>

          <div className="image-scroll-wrapper text1 hideme">
            <div className="maindiv333" style={{ padding: 0 }}>
              <img src={`${import.meta.env.BASE_URL}projectportfolio1.png`} alt="" className="imganimationsss" style={{ padding: 0 }} />
            </div>
            <div className="maindiv333">
              <img src={`${import.meta.env.BASE_URL}projectportfolio2.png`} alt="" />
              <div className="maindiv333"><img src={`${import.meta.env.BASE_URL}projectportfolio3.png`} alt="" /></div>
              <div className="maindiv333"><img src={`${import.meta.env.BASE_URL}projectportfolio4.png`} alt="" /></div>
              <div className="maindiv333"><img src={`${import.meta.env.BASE_URL}projectportfolio5.png`} alt="" /></div>
            </div>
          </div>
        </div>

        <div className="laptophide projectphotos">
          {['projectportfolio1','projectportfolio2','projectportfolio3','projectportfolio4','projectportfolio5'].map((n) => (
            <div key={n} className="photodiv">
              <img className="imgproj" src={`${import.meta.env.BASE_URL}${n}.png`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

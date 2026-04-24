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
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.05s' }}>project galleries, a smooth scroll experience, </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.10s' }}>and tab-based content transitions. </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.15s' }}>JavaScript handles the dynamic behavior </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.20s' }}>and enhances user experience, while </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.25s' }}>CSS ensures modern styling and layout</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.30s' }}>consistency across devices.</p></div>
                </div>
              </div>
              <div className="mainpopdiv3 laptophide">
                <div className="divd1 projectdivda" style={{ paddingLeft: '1px', flexDirection: 'column', paddingTop: '120px' }}>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0 }}>The site features interactive</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.05s' }}>sections such as project</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.10s' }}>galleries, a smooth, scroll</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.15s' }}> experience and tab-based </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.20s' }}>content transitions. JavaScript</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.25s' }}>handles the dynamic behavior </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.30s' }}>and enhances user experience, </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.35s' }}>while CSS ensures modern</p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.40s' }}> styling and layout consistency </p></div>
                  <div className="drop-wrap"><p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: '0.45s' }}>across devices.</p></div>
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
                <span>2026</span>
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
                <span>2026</span>
              </div>
            </div>
          </div>

          <div className="image-scroll-wrapper text1 hideme">
            <div className="maindiv333" style={{ padding: 0 }}>
              <img src={`${import.meta.env.BASE_URL}img1.png`} alt="" className="imganimationsss" style={{ padding: 0 }} />
            </div>
            <div className="maindiv333">
              <img src={`${import.meta.env.BASE_URL}img2.png`} alt="" />
              <div className="maindiv333"><img src={`${import.meta.env.BASE_URL}img3.png`} alt="" /></div>
              <div className="maindiv333"><img src={`${import.meta.env.BASE_URL}img4.png`} alt="" /></div>
              <div className="maindiv333"><img src={`${import.meta.env.BASE_URL}img5.png`} alt="" /></div>
              <div className="maindiv333"><img src={`${import.meta.env.BASE_URL}img6.png`} alt="" /></div>
              <div className="maindiv333"><img src={`${import.meta.env.BASE_URL}img7.png`} alt="" /></div>
            </div>
          </div>
        </div>

        <div className="laptophide projectphotos">
          {['img1','img2','img3','img4','img5','img6','img7'].map((n) => (
            <div key={n} className="photodiv">
              <img className="imgproj" src={`${import.meta.env.BASE_URL}${n}.png`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

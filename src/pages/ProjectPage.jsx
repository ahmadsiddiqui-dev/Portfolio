import { useEffect, useRef } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import TLink from '../components/TLink.jsx';
import useRevealAnimations from '../hooks/useRevealAnimations.js';
import { findProjectBySlug, projects } from '../data/projects.js';

export default function ProjectPage() {
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const project = findProjectBySlug(slug);
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

  if (!project) {
    return <Navigate to={`/projectpage/${projects[0].slug}`} replace />;
  }

  const handleClose = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate('/');
  };

  const visitLive = (className) => (
    project.liveUrl?.startsWith('http') ? (
      <a href={project.liveUrl} target="_blank" rel="noreferrer" className={className} style={{ color: 'white' }}>
        <p className="drop-text2">Visit live link</p>
      </a>
    ) : (
      <TLink to={project.liveUrl || '/'} className={className} style={{ color: 'white' }}>
        <p className="drop-text2">Visit live link</p>
      </TLink>
    )
  );

  return (
    <div ref={rootRef} className="design-system">
      <div id="popup-content">
        <span id="close-pop">×</span>
        <button className="waah drop-text2" id="close-popup" onClick={handleClose}>Close</button>

        <div className="divpop">
          <div className="drop-wrap"><p className="drop-text2 fontproject">Case study</p></div>
          {project.liveUrl && (
            <div className="drop-wrap">{visitLive('visitclass hideme')}</div>
          )}
          <div className="drop-wrap"><p className="drop-text2 fontproject">{project.label}</p></div>
        </div>

        <div className="mainpopdiv">
          <div className="mainpopdiv2">
            <div style={{ padding: 0, fontWeight: 500 }}>
              <div className="mainpopdiv3 hideme">
                <div className="divd1 projectdivda" style={{ paddingLeft: '1px', flexDirection: 'column', paddingTop: '120px' }}>
                  {project.caseStudyDesktop.map((line, i) => (
                    <div key={i} className="drop-wrap">
                      <p className="drop-text projectinfotext" style={{ fontSize: project.caseStudyDesktopFontSize || '30px', paddingLeft: 0, animationDelay: `${i * 0.05}s` }}>{line}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mainpopdiv3 laptophide">
                <div className="divd1 projectdivda" style={{ paddingLeft: '1px', flexDirection: 'column', paddingTop: '120px' }}>
                  {project.caseStudyMobile.map((line, i) => (
                    <div key={i} className="drop-wrap">
                      <p className="drop-text projectinfotext" style={{ fontSize: '30px', paddingLeft: 0, animationDelay: `${i * 0.05}s` }}>{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {project.liveUrl && (
              <div className="drop-wrap">{visitLive('visitclass2 laptophide')}</div>
            )}

            <div className={`projectinfodiv hideme${project.projectInfoTightTop ? ' tight-pt' : ''}${project.projectInfoWideUnderline ? ' wide-underline' : ''}`}>
              <p className="underdiv">PROJECT INFO</p>
              <div className="underdiv inforow">
                <span>Role</span>
                <span>{project.role}</span>
              </div>
              <div className="underdiv inforow">
                <span>Year</span>
                <span>{project.year}</span>
              </div>
            </div>
            <div className="projectinfodiv laptophide">
              <p className="underdiv">PROJECT INFO</p>
              <div className="underdiv inforow">
                <span>Role</span>
                <span>{project.role}</span>
              </div>
              <div className="underdiv inforow">
                <span>Year</span>
                <span>{project.year}</span>
              </div>
            </div>
          </div>

          <div
            className="image-scroll-wrapper text1 hideme"
            style={project.imagesDesktopPaddingLeft ? { paddingLeft: project.imagesDesktopPaddingLeft } : undefined}
          >
            {project.images.map((src, i) => (
              <div key={src} className="maindiv333" style={i === 0 ? { padding: 0 } : undefined}>
                <img
                  src={`${import.meta.env.BASE_URL}${src}`}
                  alt=""
                  className={i === 0 ? 'imganimationsss' : undefined}
                  style={i === 0 ? { padding: 0 } : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="laptophide projectphotos">
          {project.images.map((src) => (
            <div key={src} className="photodiv">
              <img className="imgproj" src={`${import.meta.env.BASE_URL}${src}`} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

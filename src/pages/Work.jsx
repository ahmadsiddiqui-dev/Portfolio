import { useEffect, useRef } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TLink from '../components/TLink.jsx';
import useRevealAnimations from '../hooks/useRevealAnimations.js';
import { projects } from '../data/projects.js';
import { androidImage } from '../utils/androidImage.js';

const pad2 = (n) => String(n).padStart(2, '0');

export default function Work() {
  const rootRef = useRef(null);
  useRevealAnimations(rootRef);

  useEffect(() => {
    sessionStorage.setItem('fromPage', 'work');
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#e5e5dd';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  const ctaNumber = '02';

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
            <div className="drop-wrap hideme"><p className="drop-text formbl01">{pad2(projects.length)}</p></div>
            <div className="drop-wrap laptophide"><p className="drop-text formbl02">{pad2(projects.length)}</p></div>
          </div>
        </div>

        <div className="projects-intro" style={{ paddingLeft: '300px', paddingTop: '60px', paddingBottom: '40px', maxWidth: '900px', textTransform: 'uppercase' }}>
          {[
            'A focused selection of products',
            'I’ve designed and shipped — from',
            'AI-driven mobile apps to interactive',
            'web experiences.',
          ].map((line, i) => (
            <div key={i} className="drop-wrap">
              <p className="drop-text" style={{ fontSize: '16px', lineHeight: 1.4, animationDelay: `${i * 0.08}s` }}>{line}</p>
            </div>
          ))}
        </div>

        {projects.map((project) => (
          <div
            key={project.slug}
            className="mblportfolioname"
            style={{ display: 'flex', flexDirection: 'row', padding: 0, paddingBottom: '80px', paddingLeft: '20px' }}
          >
            <div className="left" style={{ flex: 1, position: 'sticky' }}>
              <div className="div10" style={{ paddingBottom: '20px', paddingTop: '50px' }}>
                <TLink to={`/projectpage/${project.slug}`}>
                  {project.nameLines.map((line, i) => (
                    <div key={i} className="textemail" style={{ display: 'flex', fontSize: '125px', fontWeight: 500 }}>
                      {line.split('').map((c, j) => (
                        <span key={j} className="spanemail" style={{ lineHeight: 1 }}>{c}</span>
                      ))}
                    </div>
                  ))}
                </TLink>
              </div>
              <div className="divd1 divd1mbl" style={{ paddingLeft: '15px', flexDirection: 'column', paddingTop: '30px', textTransform: 'uppercase' }}>
                {project.descriptionLines.map((line, i) => (
                  <div key={i} className="drop-wrap">
                    <p className="drop-text divd1mbl" style={{ fontSize: '22px', animationDelay: `${i * 0.08}s` }}>{line}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`img-container${project.slug === 'notee-ai' ? ' notee-cover' : ''}`} style={{ flex: 2, overflow: 'hidden', marginTop: '70px', position: 'relative' }}>
              {project.coverImageMobile ? (
                <picture>
                  <source media="(max-width: 768px)" srcSet={`${import.meta.env.BASE_URL}${project.coverImageMobile}`} />
                  <img src={`${import.meta.env.BASE_URL}${androidImage(project.coverImage, project.coverImageAndroid || project.coverImage)}`} alt="" className="portimage" style={{ objectFit: 'fill' }} decoding="async" />
                </picture>
              ) : (
                <img src={`${import.meta.env.BASE_URL}${androidImage(project.coverImage, project.coverImageAndroid || project.coverImage)}`} alt="" className="portimage" style={{ objectFit: 'fill' }} decoding="async" />
              )}
              <div className="laptophide" style={{ position: 'absolute', zIndex: 5, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <TLink to={`/projectpage/${project.slug}`}>
                  <p className="see-more-btn" style={{ fontSize: '18px', backgroundColor: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center', width: '130px', height: '130px', borderRadius: '50%', paddingTop: 45 }}>
                    See<br /> more
                  </p>
                </TLink>
              </div>
            </div>
          </div>
        ))}

        <div className="div9 foremainmar" style={{ paddingBottom: '80px', gap: '200px' }}>
          <div className="drop-wrap"><p className="drop-text">{ctaNumber}/</p></div>
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

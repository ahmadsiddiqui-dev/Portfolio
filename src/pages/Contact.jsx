import { useEffect, useRef } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import useRevealAnimations from '../hooks/useRevealAnimations.js';

export default function Contact() {
  const rootRef = useRef(null);
  useRevealAnimations(rootRef);

  useEffect(() => {
    sessionStorage.setItem('fromPage', 'contact');
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#e5e5dd';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  return (
    <div className="design-system" ref={rootRef}>
      <Header current="contact" animated />

      <main className="forcontactmain">
        <div>
          <p id="sm" style={{ paddingBottom: '80px' }}>SEND ME A MESSAGE</p>
        </div>

        <div className="div10 hideme">
          <a
            className="formbl"
            href="mailto:ahmadsiddiqui909@gmail.com"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <div className="textemail">
              {'hello@ahmadjav'.split('').map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
            <div className="textemail" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {'aidsiddiqui.com'.split('').map((c, i) => (<span key={i} className="spanemail">{c}</span>))}
            </div>
          </a>
        </div>

        <div className="div10 div101 contactemail" style={{ paddingBottom: '100px' }}>
          <a
            className="formbl"
            href="mailto:ahmadsiddiqui909@gmail.com"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <div className="textemail">{['h','e','l','l','0','@'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
            <div className="textemail">{['a','h','m','a','d'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
            <div className="textemail">{['j','a','v','a','i','d'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
            <div className="textemail">{['s','i','d','d','i','q','u','i'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
            <div className="textemail">{['.','c','o','m'].map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          </a>
        </div>

        <div
          className="divf1 contactsocialme"
          style={{ display: 'flex', flexDirection: 'column', paddingTop: '200px', paddingBottom: '80px', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="drop-wrap"><p className="drop-text" id="nosize nos">OR CONNECT WITH</p></div>
          <div className="drop-wrap"><p className="drop-text" id="nosize nos">ME ON SOCIALS</p></div>
        </div>

        <div className="div10 forcontactinsta" style={{ paddingBottom: '50px' }}>
          <a href="https://www.instagram.com/ahmadjavaidsiddiqui" target="_blank" rel="noreferrer">
            <div className="textemail">{'instagram'.split('').map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          </a>
          <a href="https://github.com/ahmadsiddiqui-dev" target="_blank" rel="noreferrer">
            <div className="textemail">{'github'.split('').map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          </a>
          <a href="https://wa.me/919639942318" target="_blank" rel="noreferrer">
            <div className="textemail">{'whatsapp'.split('').map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          </a>
          <a href="https://www.linkedin.com/in/ahmad-javaid-siddiqui-1a811a194" target="_blank" rel="noreferrer">
            <div className="textemail">{'linkedin'.split('').map((c, i) => (<span key={i} className="spanemail">{c}</span>))}</div>
          </a>
        </div>
      </main>

      <Footer className="footercontact" />
    </div>
  );
}

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import 'lenis/dist/lenis.css';
import './styles/css.css';
import './styles/css2.css';
import './styles/mblcss.css';
import './styles/padcss.css';
import './styles/design-system.css';

// iOS (iPhone/iPad) WebKit renders glyphs thinner than Android Blink.
// Tag <html> with .is-ios so we can thicken text only on iOS via CSS.
const ua = navigator.userAgent || '';
const isIOS =
  /iPad|iPhone|iPod/.test(ua) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
if (isIOS) document.documentElement.classList.add('is-ios');

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

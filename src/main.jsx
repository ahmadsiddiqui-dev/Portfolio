import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { projects } from './data/projects.js';

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

// Android Chrome aggressively evicts decoded image bitmaps under memory
// pressure. Tag <html> with .is-android so component logic can swap in
// pre-shrunk cover-image variants (1200px / 50% quality) for those phones
// only — iOS/desktop keep the full-resolution originals.
const isAndroid = /Android/i.test(ua);
if (isAndroid) document.documentElement.classList.add('is-android');

// Preload + decode all parallax cover images at app start so they're fully
// ready before the user scrolls. Without this, on slower networks the
// parallax tween updates `transform` before the bitmap has decoded, which
// reads as the cover image "stopping" between scroll positions on Android.
// Android pulls the pre-shrunk variants only — no point downloading the
// full-resolution originals there.
const base = import.meta.env.BASE_URL;
const coverImages = isAndroid
  ? [
      ...projects.map((p) => p.coverImageAndroid || p.coverImage),
      ...projects.map((p) => p.coverImageMobile).filter(Boolean),
      'about-cover.jpg',
      'meabout.jpg'
    ]
  : [
      ...projects.map((p) => p.coverImage),
      ...projects.map((p) => p.coverImageMobile).filter(Boolean),
      'about-cover.jpg',
      'meabout.jpg',
      'new1project.jpg',
      'new2project.jpg'
    ];
[...new Set(coverImages)].forEach((src) => {
  const img = new Image();
  img.src = `${base}${src}`;
  if (img.decode) img.decode().catch(() => {});
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
);

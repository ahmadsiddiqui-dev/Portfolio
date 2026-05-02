import { Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll.jsx';
import PageTransition from './components/PageTransition.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import MenuOverlayProvider from './components/MenuOverlay.jsx';
import Home from './pages/Home.jsx';
import Work from './pages/Work.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import MobileMenu from './pages/MobileMenu.jsx';

export default function App() {
  return (
    <SmoothScroll>
      <PageTransition>
        <MenuOverlayProvider>
          <CustomCursor />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projectpage/:slug" element={<ProjectPage />} />
            <Route path="/mobilemenu" element={<MobileMenu />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </MenuOverlayProvider>
      </PageTransition>
    </SmoothScroll>
  );
}

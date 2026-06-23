import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { ScrollTrigger } from '@/animations/gsap';

import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import CustomCursor from '@/components/Layout/CustomCursor';
import PageTransition from '@/components/UI/PageTransition';

import Home from '@/pages/Home';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

const ScrollRestoration: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <Router>
        <ScrollRestoration />
        <CustomCursor />
        <div className="app-container">
          <Header />
          <PageTransition>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projekty" element={<Projects />} />
                <Route path="/kontakt" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </PageTransition>
          <Footer />
        </div>
      </Router>
    </ReactLenis>
  );
};

export default App;

import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WaitlistModal from './WaitlistModal';

export default function Layout() {
  const [navOnLight, setNavOnLight] = useState(true);
  const [hideNav, setHideNav] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Handle smooth scroll for hash links if they exist
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll('section[data-bg]');
      const navbarCheckPointY = 50;
      
      let activeSection = null;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= navbarCheckPointY && rect.bottom >= navbarCheckPointY) {
          activeSection = sections[i];
          break;
        }
      }

      if (activeSection) {
        const bg = activeSection.getAttribute('data-bg');
        setNavOnLight(bg === 'light');
        
        const shouldHide = activeSection.getAttribute('data-hide-nav') === 'true';
        setHideNav(shouldHide);
      } else {
        setNavOnLight(true);
        setHideNav(false);
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // Run on mount

    return () => window.removeEventListener('scroll', update);
  }, [location.pathname]); // Re-run when path changes

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navOnLight={navOnLight} hideNav={hideNav} onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <main className="flex-1">
        <Outlet context={{ openWaitlist: () => setIsWaitlistOpen(true) }} />
      </main>
      <Footer />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </div>
  );
}

import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '@/animations/gsap';
import './PageTransition.scss';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const curtainRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(curtain, { scaleY: 0, transformOrigin: 'top center' });
      return;
    }

    const tl = gsap.timeline();

    tl.set(curtain, { scaleY: 0, transformOrigin: 'top center', display: 'block' })
      .to(curtain, {
        scaleY: 1,
        duration: 0.6,
        ease: 'arch.inOut',
      })
      .set(curtain, { transformOrigin: 'bottom center' })
      .to(curtain, {
        scaleY: 0,
        duration: 0.6,
        ease: 'arch.inOut',
        delay: 0.08,
      })
      .set(curtain, { display: 'none' });

    return () => { tl.kill(); };
  }, [location.pathname]);

  return (
    <>
      {children}
      <div
        ref={curtainRef}
        className="page-curtain"
        aria-hidden="true"
        style={{ display: 'none' }}
      />
    </>
  );
};

export default PageTransition;

import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger } from '@/animations/gsap';
import { MOTION } from '@/animations/motionConfig';
import { profile } from '@/content/portfolio';
import './Header.scss';

const NAV_LINKS = [
  { to: '/', label: 'Studio', ariaLabel: 'Strona główna — Studio' },
  { to: '/projekty', label: 'Projekty', ariaLabel: 'Portfolio projektów' },
  { to: '/kontakt', label: 'Kontakt', ariaLabel: 'Strona kontaktowa' },
] as const;

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: MOTION.nav.showDuration, ease: 'arch.out' }
      ).fromTo(
        navRef.current?.querySelectorAll('li') ?? [],
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'arch.out' },
        '-=0.3'
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    let scrolled = false;

    const trigger = ScrollTrigger.create({
      start: `top -${MOTION.nav.scrollThreshold}`,
      onUpdate: self => {
        const isScrolled = self.scroll() > MOTION.nav.scrollThreshold;
        if (isScrolled !== scrolled) {
          scrolled = isScrolled;
          headerRef.current?.classList.toggle('scrolled', isScrolled);
        }

        if (self.direction === 1 && self.scroll() > 200) {
          gsap.to(headerRef.current, {
            yPercent: -110,
            duration: MOTION.nav.hideDuration,
            ease: 'arch.inOut',
            overwrite: true,
          });
        } else {
          gsap.to(headerRef.current, {
            yPercent: 0,
            duration: MOTION.nav.showDuration,
            ease: 'arch.out',
            overwrite: true,
          });
        }
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="header" role="banner">
      <div className="header__inner container--wide">
        <Link
          ref={logoRef}
          to="/"
          className="header__logo"
          aria-label={`${profile.studio} — Strona główna`}
        >
          <span className="header__logo-text">{profile.mark}</span>
          <span className="header__logo-dot" aria-hidden="true" />
        </Link>

        <nav
          ref={navRef}
          id="main-nav"
          className={`header__nav${menuOpen ? ' is-open' : ''}`}
          aria-label="Nawigacja główna"
        >
          <ul role="list">
            {NAV_LINKS.map(({ to, label, ariaLabel }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`header__nav-link${location.pathname === to ? ' is-active' : ''}`}
                  aria-label={ariaLabel}
                  aria-current={location.pathname === to ? 'page' : undefined}
                >
                  <span className="header__nav-label">{label}</span>
                  <span className="header__nav-line" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={`header__menu-btn${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
        >
          <span className="header__menu-bar" aria-hidden="true" />
          <span className="header__menu-bar" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default Header;

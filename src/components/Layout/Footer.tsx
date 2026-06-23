import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '@/animations/gsap';
import { profile } from '@/content/portfolio';
import './Footer.scss';

const CTA_TEXT = 'Lorem ipsum.';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer__cta-title .word',
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.05,
          ease: 'arch.out',
          scrollTrigger: {
            trigger: '.footer__cta',
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        '.footer__bottom-content',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'arch.out',
          scrollTrigger: {
            trigger: '.footer__bottom',
            start: 'top 95%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer" role="contentinfo">
      <section className="footer__cta" aria-label="Sekcja kontaktowa">
        <div className="container">
          <p className="eyebrow footer__cta-label">Kontakt</p>
          <h2 className="footer__cta-title" aria-label={CTA_TEXT}>
            {CTA_TEXT.split('').map((char, i) => (
              <span key={i} className="clip-text" aria-hidden="true">
                <span className="word">{char.trim() === '' ? ' ' : char}</span>
              </span>
            ))}
          </h2>
          <a
            href={`mailto:${profile.email}`}
            className="footer__cta-email"
            aria-label={`Wyślij email na ${profile.email}`}
          >
            {profile.email}
          </a>
        </div>
      </section>

      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <div className="footer__brand">
              <Link to="/" className="footer__logo" aria-label={`${profile.studio} — strona główna`}>
                {profile.studio}
              </Link>
              <p className="footer__tagline">{profile.location}</p>
            </div>

            <nav className="footer__links" aria-label="Linki w stopce">
              <ul role="list">
                <li>
                  <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer"
                     className="footer__social-link" aria-label="Instagram — nowe okno">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href={profile.social.behance} target="_blank" rel="noopener noreferrer"
                     className="footer__social-link" aria-label="Behance — nowe okno">
                    Behance
                  </a>
                </li>
                <li>
                  <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"
                     className="footer__social-link" aria-label="LinkedIn — nowe okno">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>

            <p className="footer__copy text-mono text-muted">
              &copy; {new Date().getFullYear()} {profile.studio}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, revealSection, lineReveal } from '@/animations/gsap';
import { DURATION, MOTION } from '@/animations/motionConfig';
import AnimatedText from '@/components/UI/AnimatedText';
import ProjectIndex from '@/components/UI/ProjectIndex';
import MagneticButton from '@/components/UI/MagneticButton';
import NoiseBackground from '@/components/UI/NoiseBackground';
import { profile, projects, processSteps, metrics } from '@/content/portfolio';
import './Home.scss';

const Home: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: MOTION.hero.titleDelay });

      tl.fromTo('.hero__eyebrow > *',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: DURATION.slow, stagger: 0.08, ease: 'arch.out' },
        0
      )
      .fromTo('.hero__line-inner',
        { yPercent: 115 },
        { yPercent: 0, duration: DURATION.cinematic, stagger: 0.1, ease: 'arch.out' },
        0.15
      )
      .fromTo('.hero__intro > *',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: DURATION.slow, stagger: 0.1, ease: 'arch.out' },
        0.9
      )
      .fromTo('.hero__banner',
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: DURATION.cinematic, ease: 'arch.inOut' },
        0.5
      )
      .fromTo('.hero__scroll',
        { opacity: 0 },
        { opacity: 1, duration: DURATION.base, ease: 'arch.out' },
        1.4
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      revealSection('.about', '.about__text-content > *', { stagger: 0.1 });
      revealSection('.about', '.about__visual', { delay: 0.15 });
      revealSection('.about__metrics', '.metric-item', { stagger: 0.08 });
      revealSection('.process', '.process__step', { stagger: 0.12 });
      lineReveal('.process', '.process__line');
      revealSection('.featured', '.featured__header > *', { stagger: 0.1 });
    });

    return () => ctx.revert();
  }, []);

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="home">
      <section className="hero" ref={heroRef} aria-label="Sekcja główna">
        <div className="container--wide hero__inner">
          <div className="hero__head">
            <div className="hero__eyebrow">
              <span className="text-mono text-muted">{profile.studio}</span>
              <span className="hero__eyebrow-line" aria-hidden="true" />
              <span className="text-mono text-muted">{profile.location}</span>
            </div>

            <h1 className="hero__title" aria-label="Lorem ipsum dolor">
              <span className="hero__line" aria-hidden="true">
                <span className="hero__line-inner">Lorem</span>
              </span>
              <span className="hero__line" aria-hidden="true">
                <span className="hero__line-inner">ipsum</span>
              </span>
              <span className="hero__line hero__line--accent" aria-hidden="true">
                <span className="hero__line-inner">dolor</span>
              </span>
            </h1>
          </div>

          <div className="hero__intro">
            <p className="hero__bio">{profile.intro}</p>
            <MagneticButton
              variant="outline"
              onClick={() => window.scrollTo({ top: window.innerHeight * 0.92, behavior: 'smooth' })}
              aria-label="Przewiń w dół"
            >
              Eksploruj
            </MagneticButton>
          </div>

          <div className="hero__banner banner banner--hero" aria-hidden="true">
            <NoiseBackground intensity={0.03} />
            <span className="hero__banner-tag text-mono">{profile.role}</span>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span className="hero__scroll-label text-mono">Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      <section className="about section" aria-labelledby="about-heading">
        <div className="container about__grid">
          <div className="about__text">
            <div className="about__text-content">
              <p className="eyebrow about__label">Pracownia</p>
              <AnimatedText
                as="h2"
                id="about-heading"
                text="Lorem ipsum dolor sit amet"
                className="about__heading"
                scrollStart="top 85%"
              />
              <p className="about__bio">{profile.biography}</p>
              <MagneticButton variant="outline">
                <Link to="/kontakt" aria-label="Przejdź do kontaktu">
                  Skontaktuj się
                </Link>
              </MagneticButton>
            </div>

            <div className="about__metrics" aria-label="Statystyki">
              {metrics.map(({ value, label }) => (
                <div key={label} className="metric-item">
                  <span className="metric-item__value">{value}</span>
                  <span className="metric-item__label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about__visual">
            <div className="about__banner banner banner--portrait" aria-hidden="true">
              <span className="about__banner-tag text-mono">{profile.role}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured section" aria-labelledby="featured-heading">
        <div className="container">
          <div className="featured__header">
            <p className="eyebrow">Projekty</p>
            <AnimatedText
              as="h2"
              id="featured-heading"
              text="Wybrane realizacje"
              className="featured__heading"
            />
            <MagneticButton variant="ghost">
              <Link to="/projekty" aria-label="Zobacz wszystkie projekty">
                Wszystkie →
              </Link>
            </MagneticButton>
          </div>

          <ProjectIndex items={featuredProjects} />
        </div>
      </section>

      <section className="process section" aria-labelledby="process-heading">
        <div className="container">
          <div className="process__header">
            <p className="eyebrow">Proces</p>
            <AnimatedText
              as="h2"
              id="process-heading"
              text="Metoda pracy"
              className="process__heading"
            />
          </div>

          <div className="process__steps" role="list">
            <div className="process__line" aria-hidden="true" />
            {processSteps.map(step => (
              <article key={step.number} className="process__step" role="listitem">
                <span className="process__step-num text-mono">{step.number}</span>
                <h3 className="process__step-title">{step.title}</h3>
                <p className="process__step-desc">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { gsap } from '@/animations/gsap';
import AnimatedText from '@/components/UI/AnimatedText';
import ProjectIndex from '@/components/UI/ProjectIndex';
import { projects } from '@/content/portfolio';
import type { Project } from '@/content/portfolio';
import './Projects.scss';

const ALL_CATEGORIES = ['Wszystkie', ...Array.from(new Set(projects.map(p => p.category)))] as const;

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Wszystkie');

  const filtered: Project[] =
    activeFilter === 'Wszystkie'
      ? projects
      : projects.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-page__header > *',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'arch.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="projects-page">
      <div className="container">
        <header className="projects-page__header">
          <p className="eyebrow">Portfolio</p>
          <AnimatedText
            as="h1"
            text="Indeks realizacji"
            className="projects-page__title"
            immediate
            delay={0.1}
          />
          <p className="projects-page__desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur et.
          </p>
        </header>

        <nav className="projects-page__filters" aria-label="Filtruj projekty">
          <ul role="list">
            {ALL_CATEGORIES.map(cat => (
              <li key={cat}>
                <button
                  className={`filter-btn${activeFilter === cat ? ' is-active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                  aria-pressed={activeFilter === cat}
                  aria-label={`Filtruj: ${cat}`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {filtered.length > 0 ? (
          <ProjectIndex key={activeFilter} items={filtered} />
        ) : (
          <p className="projects-page__empty text-muted">
            Brak projektów w tej kategorii.
          </p>
        )}
      </div>
    </div>
  );
};

export default Projects;

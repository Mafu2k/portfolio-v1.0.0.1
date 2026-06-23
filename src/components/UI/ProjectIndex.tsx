import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from '@/animations/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import type { Project } from '@/content/portfolio';
import './ProjectIndex.scss';

interface ProjectIndexProps {
  items: Project[];
  to?: string;
}

const ProjectIndex: React.FC<ProjectIndexProps> = ({ items, to = '/projekty' }) => {
  const rootRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    const preview = previewRef.current;
    if (!root || !preview) return;
    if (prefersReduced || window.matchMedia('(hover: none)').matches) return;

    gsap.set(preview, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      autoAlpha: 0,
      scale: 0.92,
    });

    const xTo = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'arch.out' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'arch.out' });

    const show = () => gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'arch.out' });
    const hide = () => gsap.to(preview, { autoAlpha: 0, scale: 0.92, duration: 0.4, ease: 'arch.out' });
    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const rows = root.querySelectorAll<HTMLElement>('.index__row');
    rows.forEach(row => {
      row.addEventListener('mouseenter', show);
      row.addEventListener('mouseleave', hide);
    });
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      rows.forEach(row => {
        row.removeEventListener('mouseenter', show);
        row.removeEventListener('mouseleave', hide);
      });
      window.removeEventListener('mousemove', onMove);
    };
  }, [prefersReduced, items]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.index__row',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: 'arch.out',
          scrollTrigger: { trigger: root, start: 'top 85%' },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [items]);

  return (
    <div className="index-wrap">
      <ul ref={rootRef} className="index" role="list">
        {items.map(project => (
          <li key={project.id} className="index__item" role="listitem">
            <Link
              to={to}
              className="index__row"
              aria-label={`Projekt: ${project.title}`}
              data-cursor-label="Zobacz"
            >
              <span className="index__num text-mono">{project.index}</span>
              <span className="index__title">{project.title}</span>
              <span className="index__cat">{project.category}</span>
              <span className="index__year text-mono">{project.year}</span>
              <span className="index__thumb banner banner--wide" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      <div ref={previewRef} className="index__preview banner banner--tall" aria-hidden="true" />
    </div>
  );
};

export default ProjectIndex;

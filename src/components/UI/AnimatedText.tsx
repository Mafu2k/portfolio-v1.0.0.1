import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { STAGGER, DURATION } from '@/animations/motionConfig';
import './AnimatedText.scss';

interface AnimatedTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  id?: string;
  className?: string;
  staggerMultiplier?: number;
  scrollStart?: string;
  immediate?: boolean;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  as: Tag = 'h2',
  id,
  className = '',
  staggerMultiplier = 1,
  scrollStart = 'top 88%',
  immediate = false,
  delay = 0,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = container.querySelectorAll<HTMLSpanElement>('.anim-word');

    if (prefersReduced) {
      gsap.set(words, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const animProps = {
        yPercent: 0,
        opacity: 1,
        duration: DURATION.slow,
        stagger: STAGGER.normal * staggerMultiplier,
        ease: 'arch.out',
        delay,
      };

      if (immediate) {
        gsap.fromTo(words, { yPercent: 115, opacity: 0 }, animProps);
      } else {
        gsap.fromTo(words, { yPercent: 115, opacity: 0 }, {
          ...animProps,
          scrollTrigger: {
            trigger: container,
            start: scrollStart,
            once: true,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, [text, prefersReduced, staggerMultiplier, scrollStart, immediate, delay]);

  const words = text.split(' ');

  const Component = Tag as React.ElementType;

  return (
    <Component ref={containerRef} id={id} className={`animated-text ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="anim-word-clip" aria-hidden="true">
          <span className="anim-word">{word}</span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Component>
  );
};

export default AnimatedText;

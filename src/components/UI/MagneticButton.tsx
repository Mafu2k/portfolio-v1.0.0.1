import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from '@/animations/gsap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import './MagneticButton.scss';

type ButtonVariant = 'outline' | 'solid' | 'ghost';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  variant?: ButtonVariant;
  strength?: number;
  disabled?: boolean;
  'aria-label'?: string;
  'data-cursor-label'?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  type = 'button',
  href,
  variant = 'ghost',
  strength = 0.3,
  disabled = false,
  'aria-label': ariaLabel,
  'data-cursor-label': cursorLabel,
}) => {
  const elRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReduced) return;
    const el = elRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;

    gsap.to(el, { x, y, duration: 0.8, ease: 'arch.out', overwrite: true });
    gsap.to(inner, { x: x * 0.4, y: y * 0.4, duration: 0.8, ease: 'arch.out', overwrite: true });
  }, [strength, prefersReduced]);

  const onMouseEnter = useCallback((e: MouseEvent) => {
    if (prefersReduced) return;
    const fill = fillRef.current;
    if (!fill) return;

    const { left, top, width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    gsap.fromTo(fill,
      { clipPath: `circle(0% at ${x + width / 2}px ${y + height / 2}px)` },
      { clipPath: `circle(150% at ${x + width / 2}px ${y + height / 2}px)`, duration: 0.5, ease: 'arch.out' }
    );
  }, [prefersReduced]);

  const onMouseLeave = useCallback((e: MouseEvent) => {
    if (prefersReduced) return;
    const el = elRef.current;
    const inner = innerRef.current;
    const fill = fillRef.current;
    if (!el || !inner || !fill) return;

    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'arch.elastic', overwrite: true });
    gsap.to(inner, { x: 0, y: 0, duration: 0.9, ease: 'arch.elastic', overwrite: true });

    const { left, top, width, height } = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    gsap.to(fill, {
      clipPath: `circle(0% at ${x + width / 2}px ${y + height / 2}px)`,
      duration: 0.4,
      ease: 'arch.inOut',
    });
  }, [prefersReduced]);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [onMouseMove, onMouseEnter, onMouseLeave]);

  const classes = `magnetic-btn magnetic-btn--${variant} ${className}`.trim();
  const sharedProps = {
    className: classes,
    'aria-label': ariaLabel,
    'data-cursor-label': cursorLabel,
    'aria-disabled': disabled || undefined,
  };

  const content = (
    <>
      <span ref={innerRef} className="magnetic-btn__inner">{children}</span>
      <span ref={fillRef} className="magnetic-btn__fill" aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <a
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...sharedProps}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={elRef as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      {...sharedProps}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default MagneticButton;

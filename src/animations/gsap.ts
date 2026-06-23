import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create('arch.out', '0.16, 1, 0.3, 1');
CustomEase.create('arch.inOut', '0.76, 0, 0.24, 1');
CustomEase.create('arch.elastic', '0.34, 1.56, 0.64, 1');
CustomEase.create('arch.expo', '0.19, 1, 0.22, 1');

gsap.defaults({
  ease: 'arch.out',
  duration: 0.9,
});

ScrollTrigger.defaults({
  toggleActions: 'play none none none',
});

export function revealSection(
  trigger: Element | string,
  targets: Element | string | NodeListOf<Element>,
  options: {
    delay?: number;
    stagger?: number;
    y?: number;
    duration?: number;
  } = {}
) {
  const { delay = 0, stagger = 0.08, y = 48, duration = 1 } = options;

  return gsap.fromTo(
    targets,
    { y, opacity: 0, willChange: 'transform, opacity' },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'arch.out',
      delay,
      clearProps: 'willChange',
      scrollTrigger: {
        trigger,
        start: 'top 82%',
      },
    }
  );
}

export function revealWords(
  container: Element,
  options: { delay?: number; stagger?: number } = {}
) {
  const { delay = 0, stagger = 0.06 } = options;
  const words = container.querySelectorAll('.word');

  return gsap.fromTo(
    words,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 1.1,
      stagger,
      ease: 'arch.out',
      delay,
      scrollTrigger: {
        trigger: container,
        start: 'top 88%',
      },
    }
  );
}

export function parallaxImage(
  trigger: Element,
  target: Element,
  intensity = 14
) {
  return gsap.to(target, {
    yPercent: intensity,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.4,
    },
  });
}

export function clipReveal(
  trigger: Element,
  target: Element,
  options: { delay?: number; duration?: number } = {}
) {
  const { delay = 0, duration = 1.2 } = options;

  return gsap.fromTo(
    target,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration,
      ease: 'arch.inOut',
      delay,
      scrollTrigger: {
        trigger,
        start: 'top 82%',
      },
    }
  );
}

export function lineReveal(
  trigger: Element | string,
  target: Element | string
) {
  return gsap.fromTo(
    target,
    { scaleX: 0, transformOrigin: 'left center' },
    {
      scaleX: 1,
      duration: 1.4,
      ease: 'arch.out',
      scrollTrigger: {
        trigger,
        start: 'top 85%',
      },
    }
  );
}

export { gsap, ScrollTrigger, CustomEase };

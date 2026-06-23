export const DURATION = {
  instant:   0,
  fast:      0.3,
  base:      0.6,
  slow:      0.9,
  slower:    1.2,
  cinematic: 1.8,
} as const;

export const STAGGER = {
  tight:  0.04,
  normal: 0.08,
  loose:  0.12,
  wide:   0.2,
} as const;

export const EASE = {
  out:     'arch.out',
  inOut:   'arch.inOut',
  elastic: 'arch.elastic',
  expo:    'arch.expo',
  linear:  'none',
} as const;

export const SCROLL_START = {
  late:   'top 90%',
  normal: 'top 82%',
  early:  'top 70%',
  center: 'top 50%',
} as const;

export const MOTION = {
  hero: {
    titleDelay:    0.2,
    subtitleDelay: 1.0,
    ctaDelay:      1.4,
  },
  page: {
    entryDuration: 1.2,
    exitDuration:  0.8,
  },
  card: {
    hoverScale:    1.03,
    hoverDuration: 0.6,
    imageScrub:    1.5,
  },
  cursor: {
    lerp:          0.14,
    hoverScale:    1.4,
    hoverDuration: 0.35,
  },
  nav: {
    hideDuration:    0.4,
    showDuration:    0.5,
    scrollThreshold: 80,
  },
} as const;

import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import './NoiseBackground.scss';

interface NoiseBackgroundProps {
  className?: string;
  intensity?: number;
}

const NoiseBackground: React.FC<NoiseBackgroundProps> = ({
  className = '',
  intensity = 0.035,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 220;
    const h = 220;
    canvas.width = w;
    canvas.height = h;

    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;
    const alpha = (intensity * 255) | 0;

    for (let i = 0; i < data.length; i += 4) {
      const v = (Math.random() * 255) | 0;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = alpha;
    }

    ctx.putImageData(imageData, 0, 0);
  }, [intensity, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div className={`noise-bg ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="noise-bg__canvas" />
    </div>
  );
};

export default NoiseBackground;

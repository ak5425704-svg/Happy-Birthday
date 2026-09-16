import { useEffect, useRef } from 'react';

interface SmokeParticle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  maxAlpha: number;
  rotation: number;
  vRot: number;
  growth: number;
}

export function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(28, Math.floor((width * height) / 38000));
    const particles: SmokeParticle[] = [];

    const createParticle = (initialY?: number): SmokeParticle => {
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : Math.random() * height,
        radius: Math.random() * 120 + 80,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -Math.random() * 0.4 - 0.15, // float upwards gently
        alpha: 0,
        maxAlpha: Math.random() * 0.05 + 0.02, // very subtle smoky grey
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.003,
        growth: Math.random() * 0.05 + 0.02,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient background glow points
      const radial = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.8
      );
      radial.addColorStop(0, 'rgba(25, 25, 32, 0.4)');
      radial.addColorStop(0.5, 'rgba(12, 12, 16, 0.2)');
      radial.addColorStop(1, 'rgba(8, 8, 10, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Draw smoke clouds
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.radius += p.growth;

        // Smooth fade-in then fade-out
        if (p.alpha < p.maxAlpha && p.y > height * 0.3) {
          p.alpha += 0.0008;
        } else if (p.y < height * 0.3) {
          p.alpha -= 0.0006;
        }

        if (p.alpha < 0 || p.y < -p.radius || p.x < -p.radius || p.x > width + p.radius) {
          particles[i] = createParticle(height + p.radius);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, p.radius);
        g.addColorStop(0, `rgba(180, 185, 205, ${p.alpha * 1.2})`);
        g.addColorStop(0.4, `rgba(130, 135, 150, ${p.alpha * 0.6})`);
        g.addColorStop(0.7, `rgba(80, 85, 95, ${p.alpha * 0.2})`);
        g.addColorStop(1, 'rgba(30, 32, 40, 0)');

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      {/* Cinematic subtle top and bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080a] via-transparent to-[#08080a] opacity-80" />
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-transparent to-[#050507]/90" />
    </div>
  );
}

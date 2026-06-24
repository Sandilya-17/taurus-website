import { useEffect, useRef } from 'react';

export default function Truck3D({ style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId, t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      t += 0.015;
      ctx.clearRect(0, 0, W, H);

      // Road
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#1E3A8A';
      ctx.fillRect(0, H * 0.72, W, H * 0.28);
      ctx.restore();

      // Road lines (animated)
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = '#F97316';
      ctx.lineWidth = 2;
      ctx.setLineDash([30, 20]);
      ctx.lineDashOffset = -(t * 80) % 50;
      ctx.beginPath();
      ctx.moveTo(0, H * 0.78);
      ctx.lineTo(W, H * 0.78);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // Draw truck body using isometric perspective
      const cx = W / 2 + Math.sin(t * 0.5) * 20;
      const cy = H * 0.55;
      const scale = Math.min(W, H) * 0.0025;

      // Shadow
      ctx.save();
      ctx.globalAlpha = 0.2;
      const shadowGrd = ctx.createRadialGradient(cx, H * 0.74, 0, cx, H * 0.74, 80 * scale);
      shadowGrd.addColorStop(0, 'rgba(0,0,0,0.5)');
      shadowGrd.addColorStop(1, 'transparent');
      ctx.fillStyle = shadowGrd;
      ctx.ellipse(cx, H * 0.74, 80 * scale, 20 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      const truck = (x, y, s) => {
        // Trailer body
        ctx.save();
        // Side face
        ctx.fillStyle = '#1E3A8A';
        ctx.beginPath();
        ctx.moveTo(x - 90*s, y - 30*s);
        ctx.lineTo(x + 30*s, y - 30*s);
        ctx.lineTo(x + 30*s, y + 30*s);
        ctx.lineTo(x - 90*s, y + 30*s);
        ctx.closePath();
        ctx.fill();
        // Top face
        ctx.fillStyle = '#2563EB';
        ctx.beginPath();
        ctx.moveTo(x - 90*s, y - 30*s);
        ctx.lineTo(x + 30*s, y - 30*s);
        ctx.lineTo(x + 45*s, y - 42*s);
        ctx.lineTo(x - 75*s, y - 42*s);
        ctx.closePath();
        ctx.fill();
        // Front face
        ctx.fillStyle = '#142247';
        ctx.beginPath();
        ctx.moveTo(x + 30*s, y - 30*s);
        ctx.lineTo(x + 45*s, y - 42*s);
        ctx.lineTo(x + 45*s, y + 18*s);
        ctx.lineTo(x + 30*s, y + 30*s);
        ctx.closePath();
        ctx.fill();

        // Taurus logo stripe on trailer
        ctx.fillStyle = '#F97316';
        ctx.fillRect(x - 88*s, y - 5*s, 116*s, 4*s);

        // TAURUS text on trailer
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.font = `bold ${Math.round(9*s)}px Space Grotesk, Inter`;
        ctx.fillText('TAURUS LOGISTICS', x - 80*s, y + 18*s);

        // Cab
        ctx.fillStyle = '#0D1F3C';
        ctx.beginPath();
        ctx.moveTo(x + 30*s, y - 30*s);
        ctx.lineTo(x + 72*s, y - 30*s);
        ctx.lineTo(x + 72*s, y + 30*s);
        ctx.lineTo(x + 30*s, y + 30*s);
        ctx.closePath();
        ctx.fill();

        // Cab top
        ctx.fillStyle = '#1E3A8A';
        ctx.beginPath();
        ctx.moveTo(x + 30*s, y - 30*s);
        ctx.lineTo(x + 72*s, y - 30*s);
        ctx.lineTo(x + 87*s, y - 42*s);
        ctx.lineTo(x + 45*s, y - 42*s);
        ctx.closePath();
        ctx.fill();

        // Cab right face
        ctx.fillStyle = '#091829';
        ctx.beginPath();
        ctx.moveTo(x + 72*s, y - 30*s);
        ctx.lineTo(x + 87*s, y - 42*s);
        ctx.lineTo(x + 87*s, y + 18*s);
        ctx.lineTo(x + 72*s, y + 30*s);
        ctx.closePath();
        ctx.fill();

        // Windshield
        ctx.fillStyle = 'rgba(96,165,250,0.3)';
        ctx.beginPath();
        ctx.moveTo(x + 72*s, y - 26*s);
        ctx.lineTo(x + 86*s, y - 38*s);
        ctx.lineTo(x + 86*s, y - 12*s);
        ctx.lineTo(x + 72*s, y - 6*s);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(96,165,250,0.5)';
        ctx.lineWidth = s;
        ctx.stroke();

        // Headlights
        ctx.fillStyle = '#FDE68A';
        ctx.beginPath();
        ctx.arc(x + 86*s, y + 8*s, 3*s, 0, Math.PI*2);
        ctx.fill();
        // Light beam
        const beamGrd = ctx.createLinearGradient(x + 86*s, y + 8*s, x + 140*s, y + 8*s);
        beamGrd.addColorStop(0, 'rgba(253,230,138,0.4)');
        beamGrd.addColorStop(1, 'transparent');
        ctx.fillStyle = beamGrd;
        ctx.beginPath();
        ctx.moveTo(x + 86*s, y + 6*s);
        ctx.lineTo(x + 140*s, y - 2*s);
        ctx.lineTo(x + 140*s, y + 18*s);
        ctx.closePath();
        ctx.fill();

        // Wheels (6 wheels)
        const wheels = [
          { wx: x - 70*s, wy: y + 30*s },
          { wx: x - 42*s, wy: y + 30*s },
          { wx: x + 5*s, wy: y + 30*s },
          { wx: x + 50*s, wy: y + 30*s },
          { wx: x + 63*s, wy: y + 30*s },
        ];
        wheels.forEach(({ wx, wy }) => {
          ctx.fillStyle = '#0A1628';
          ctx.beginPath();
          ctx.arc(wx, wy, 12*s, 0, Math.PI*2);
          ctx.fill();
          ctx.strokeStyle = '#374151';
          ctx.lineWidth = 2*s;
          ctx.stroke();
          // Rim
          ctx.strokeStyle = '#9CA3AF';
          ctx.lineWidth = 1.5*s;
          ctx.beginPath();
          ctx.arc(wx, wy, 7*s, 0, Math.PI*2);
          ctx.stroke();
          // Hub
          ctx.fillStyle = '#D1D5DB';
          ctx.beginPath();
          ctx.arc(wx, wy, 2.5*s, 0, Math.PI*2);
          ctx.fill();
        });

        ctx.restore();
      };

      truck(cx, cy, scale * 40);

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block', ...style }} />;
}

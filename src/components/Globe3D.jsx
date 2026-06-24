import { useEffect, useRef } from 'react';

export default function Globe3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      const size = Math.min(canvas.offsetWidth, canvas.offsetHeight);
      canvas.width = size;
      canvas.height = size;
    };
    resize();

    // Approx. city coords (lon, lat) → sphere points
    const cities = [
      { name: 'Accra', lon: -0.2, lat: 5.6 },
      { name: 'Lagos', lon: 3.4, lat: 6.5 },
      { name: 'Abidjan', lon: -4.0, lat: 5.3 },
      { name: 'Dakar', lon: -17.4, lat: 14.7 },
      { name: 'Kumasi', lon: -1.6, lat: 6.7 },
      { name: 'London', lon: -0.1, lat: 51.5 },
      { name: 'Dubai', lon: 55.3, lat: 25.2 },
      { name: 'Beijing', lon: 116.4, lat: 39.9 },
      { name: 'NY', lon: -74.0, lat: 40.7 },
    ];

    // Routes (city index pairs)
    const routes = [
      [0,1],[1,2],[2,3],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[1,5],[1,6]
    ];

    const toSphere = (lon, lat, r) => {
      const lonR = (lon * Math.PI) / 180;
      const latR = (lat * Math.PI) / 180;
      return {
        x: r * Math.cos(latR) * Math.cos(lonR),
        y: r * Math.sin(latR),
        z: r * Math.cos(latR) * Math.sin(lonR),
      };
    };

    const rotateY = (p, a) => ({
      x: p.x * Math.cos(a) + p.z * Math.sin(a),
      y: p.y,
      z: -p.x * Math.sin(a) + p.z * Math.cos(a),
    });

    const project = (p, W, H, fov = 600) => {
      const scale = fov / (fov + p.z + W * 0.5);
      return {
        x: p.x * scale + W / 2,
        y: -p.y * scale + H / 2,
        visible: p.z + W * 0.5 > 0,
        scale,
      };
    };

    const drawArc = (p1, p2, W, H, col, alpha) => {
      const mid = {
        x: (p1.x + p2.x) * 0.5,
        y: (p1.y + p2.y) * 0.5,
        z: (p1.z + p2.z) * 0.5,
      };
      const len = Math.sqrt(mid.x ** 2 + mid.y ** 2 + mid.z ** 2);
      const R = W * 0.35;
      const curve = { x: (mid.x / len) * R * 1.35, y: (mid.y / len) * R * 1.35, z: (mid.z / len) * R * 1.35 };
      const cp = project(curve, W, H);
      const pp1 = project(p1, W, H);
      const pp2 = project(p2, W, H);
      if (!pp1.visible && !pp2.visible) return;
      ctx.save();
      ctx.globalAlpha = alpha * 0.65;
      ctx.strokeStyle = col;
      ctx.lineWidth = 0.8;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(pp1.x, pp1.y);
      ctx.quadraticCurveTo(cp.x, cp.y, pp2.x, pp2.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const R = W * 0.35;
      t += 0.004;
      ctx.clearRect(0, 0, W, H);

      // Glow
      const grd = ctx.createRadialGradient(W/2, H/2, R*0.1, W/2, H/2, R*1.1);
      grd.addColorStop(0, 'rgba(37,99,235,0.12)');
      grd.addColorStop(0.5, 'rgba(37,99,235,0.05)');
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(W/2, H/2, R*1.1, 0, Math.PI*2);
      ctx.fill();

      // Draw latitude lines
      for (let lat = -75; lat <= 75; lat += 25) {
        const latR = (lat * Math.PI) / 180;
        const rLat = R * Math.cos(latR);
        const yLat = -R * Math.sin(latR);
        const steps = 80;
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        let first = true;
        for (let i = 0; i <= steps; i++) {
          const lon = (i / steps) * 2 * Math.PI + t;
          const px = rLat * Math.cos(lon);
          const pz = rLat * Math.sin(lon);
          const pp = project({ x: px, y: yLat + H/2 - H/2, z: pz }, W, H);
          const bx = px * Math.cos(t) + pz * Math.sin(t);
          const bz = -px * Math.sin(t) + pz * Math.cos(t);
          if (bz + W * 0.5 > 0) {
            if (first) { ctx.moveTo(pp.x, pp.y); first = false; }
            else ctx.lineTo(pp.x, pp.y);
          } else first = true;
        }
        ctx.stroke();
        ctx.restore();
      }

      // Draw longitude lines
      for (let lon = 0; lon < 360; lon += 30) {
        const lonR = ((lon + t * 57.3) * Math.PI) / 180;
        ctx.save();
        ctx.globalAlpha = 0.08;
        ctx.strokeStyle = '#2563EB';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 5) {
          const latR = (lat * Math.PI) / 180;
          let p = {
            x: R * Math.cos(latR) * Math.cos(lonR),
            y: R * Math.sin(latR),
            z: R * Math.cos(latR) * Math.sin(lonR),
          };
          if (p.z + W * 0.5 > 0) {
            const pp = project(p, W, H);
            if (first) { ctx.moveTo(pp.x, pp.y); first = false; }
            else ctx.lineTo(pp.x, pp.y);
          } else first = true;
        }
        ctx.stroke();
        ctx.restore();
      }

      // Globe sphere outline
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(W/2, H/2, R, 0, Math.PI*2);
      ctx.stroke();
      ctx.restore();

      // Rotate & project cities
      const rotated = cities.map(c => {
        const sp = toSphere(c.lon, c.lat, R);
        return { ...rotateY(sp, t), name: c.name };
      });

      // Draw routes
      routes.forEach(([a, b]) => {
        const p1 = rotated[a], p2 = rotated[b];
        drawArc(p1, p2, W, H, '#F97316', 0.7);
      });

      // Draw cities
      rotated.forEach(p => {
        const pp = project(p, W, H);
        if (!pp.visible) return;
        const s = Math.max(2.5, pp.scale * 4);
        ctx.save();
        ctx.globalAlpha = pp.scale;
        ctx.fillStyle = '#60A5FA';
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, s, 0, Math.PI*2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(96,165,250,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pp.x, pp.y, s * 2, 0, Math.PI*2);
        ctx.stroke();
        if (pp.scale > 0.7) {
          ctx.fillStyle = 'rgba(255,255,255,0.7)';
          ctx.font = `${Math.round(9 * pp.scale)}px Inter`;
          ctx.fillText(p.name, pp.x + s + 4, pp.y + 3);
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

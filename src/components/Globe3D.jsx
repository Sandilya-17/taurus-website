import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Ports Taurus/APL-style network actually serves
const PORTS = [
  { name: 'Accra', lat: 5.6, lon: -0.19, hq: true },
  { name: 'Tema', lat: 5.62, lon: -0.0 },
  { name: 'Lagos', lat: 6.45, lon: 3.39 },
  { name: 'Abidjan', lat: 5.31, lon: -4.03 },
  { name: 'Dakar', lat: 14.69, lon: -17.45 },
  { name: 'Lomé', lat: 6.13, lon: 1.22 },
  { name: 'Rotterdam', lat: 51.92, lon: 4.48 },
  { name: 'Shanghai', lat: 31.23, lon: 121.47 },
  { name: 'Dubai', lat: 25.2, lon: 55.27 },
  { name: 'New York', lat: 40.71, lon: -74.0 },
];

const ROUTES = [
  [0, 2], [0, 3], [0, 4], [0, 5], [0, 1],
  [0, 6], [0, 7], [0, 8], [0, 9], [2, 6], [3, 6],
];

function latLonToVec3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Build a great-circle-ish arc between two points, lifted outward
function buildArcCurve(p1, p2, radius) {
  const d = p1.distanceTo(p2);
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  const liftAmount = radius * (0.25 + d / radius * 0.18);
  mid.normalize().multiplyScalar(radius + liftAmount);
  return new THREE.QuadraticBezierCurve3(p1, mid, p2);
}

export default function Globe3D({ height = '100%' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height_ = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height_, 0.1, 100);
    camera.position.set(0, 0.15, 5.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height_);
    mount.appendChild(renderer.domElement);

    const RADIUS = 1.7;
    const group = new THREE.Group();
    group.rotation.z = 0.2;
    scene.add(group);

    // ── Wireframe sphere (graticule look) ──
    const sphereGeo = new THREE.SphereGeometry(RADIUS, 48, 32);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x2a4a6e,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireSphere = new THREE.Mesh(sphereGeo, wireMat);
    group.add(wireSphere);

    // ── Solid inner sphere for depth / occlusion ──
    const innerGeo = new THREE.SphereGeometry(RADIUS * 0.992, 48, 32);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x070d17 });
    group.add(new THREE.Mesh(innerGeo, innerMat));

    // ── Continent dot field (procedural land mask via simple lat/lon land approximation) ──
    // Lightweight landmass approximation using a coarse point-in-region test.
    const isLand = (lat, lon) => {
      // Very rough continent silhouettes for a stylized dot-globe (not geographically perfect).
      if (lat > -35 && lat < 37 && lon > -18 && lon < 52) return true; // Africa
      if (lat > 36 && lat < 71 && lon > -10 && lon < 40) return true; // Europe
      if (lat > 5 && lat < 55 && lon > 40 && lon < 145) return true; // Asia
      if (lat > -45 && lat < 5 && lon > 95 && lon < 155) return true; // SE Asia/Oceania edge
      if (lat > 7 && lat < 72 && lon > -168 && lon < -52) return true; // N. America
      if (lat > -55 && lat < 7 && lon > -82 && lon < -34) return true; // S. America
      if (lat < -10 && lat > -45 && lon > 112 && lon < 154) return true; // Australia
      return false;
    };

    const dotPositions = [];
    const dotCount = 2600;
    for (let i = 0; i < dotCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const lat = 90 - Math.acos(2 * v - 1) * 180 / Math.PI;
      const lon = 360 * u - 180;
      if (isLand(lat, lon)) {
        const p = latLonToVec3(lat, lon, RADIUS * 1.001);
        dotPositions.push(p.x, p.y, p.z);
      }
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x6b8caa,
      size: 0.018,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    group.add(dots);

    // ── Port markers ──
    const portGroup = new THREE.Group();
    const portMeshes = [];
    PORTS.forEach((port) => {
      const pos = latLonToVec3(port.lat, port.lon, RADIUS * 1.01);
      const size = port.hq ? 0.028 : 0.016;
      const color = port.hq ? 0xe8c77e : 0xc9601a;
      const geo = new THREE.SphereGeometry(size, 12, 12);
      const mat = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);
      portGroup.add(mesh);
      portMeshes.push(mesh);

      // Halo ring
      const ringGeo = new THREE.RingGeometry(size * 1.8, size * 2.2, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      portGroup.add(ring);
    });
    group.add(portGroup);

    // ── Shipping lane arcs ──
    const arcGroup = new THREE.Group();
    const arcLines = [];
    ROUTES.forEach(([aIdx, bIdx]) => {
      const a = latLonToVec3(PORTS[aIdx].lat, PORTS[aIdx].lon, RADIUS * 1.005);
      const b = latLonToVec3(PORTS[bIdx].lat, PORTS[bIdx].lon, RADIUS * 1.005);
      const curve = buildArcCurve(a, b, RADIUS);
      const points = curve.getPoints(64);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color: 0xc9601a, transparent: true, opacity: 0.45 });
      const line = new THREE.Line(geo, mat);
      arcGroup.add(line);
      arcLines.push({ curve, points });

      // Traveling pulse dot along the arc
      const pulseGeo = new THREE.SphereGeometry(0.014, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffe1b3 });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      pulse.userData = { curve, t: Math.random(), speed: 0.08 + Math.random() * 0.06 };
      arcGroup.add(pulse);
      arcLines[arcLines.length - 1].pulse = pulse;
    });
    group.add(arcGroup);

    // ── Lighting ──
    const ambient = new THREE.AmbientLight(0x8899aa, 0.7);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(3, 2, 4);
    scene.add(dirLight);

    // ── Outer glow sprite ──
    const glowCanvas = document.createElement('canvas');
    glowCanvas.width = 256; glowCanvas.height = 256;
    const gctx = glowCanvas.getContext('2d');
    const grad = gctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, 'rgba(201,96,26,0.35)');
    grad.addColorStop(0.5, 'rgba(201,96,26,0.08)');
    grad.addColorStop(1, 'rgba(201,96,26,0)');
    gctx.fillStyle = grad;
    gctx.fillRect(0, 0, 256, 256);
    const glowTex = new THREE.CanvasTexture(glowCanvas);
    const glowMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false });
    const glowSprite = new THREE.Sprite(glowMat);
    glowSprite.scale.set(RADIUS * 5, RADIUS * 5, 1);
    scene.add(glowSprite);

    // ── Interaction: drag to rotate ──
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let rotVelY = 0.0014;
    let rotVelX = 0;

    const onPointerDown = (e) => { isDragging = true; prevX = e.clientX; prevY = e.clientY; };
    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotVelY = dx * 0.0006;
      rotVelX = dy * 0.0006;
      group.rotation.y += dx * 0.005;
      group.rotation.x += dy * 0.005;
      group.rotation.x = Math.max(-0.6, Math.min(0.6, group.rotation.x));
      prevX = e.clientX; prevY = e.clientY;
    };
    const onPointerUp = () => { isDragging = false; };

    mount.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    mount.style.cursor = 'grab';

    // ── Resize handling ──
    const handleResize = () => {
      width = mount.clientWidth;
      height_ = mount.clientHeight;
      if (width === 0 || height_ === 0) return;
      camera.aspect = width / height_;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height_);
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // ── Animate ──
    let frameId;
    const animate = () => {
      if (!isDragging) {
        group.rotation.y += rotVelY;
        group.rotation.x += rotVelX;
        rotVelX *= 0.94;
        rotVelY += (0.0014 - rotVelY) * 0.02;
      }

      arcLines.forEach(({ curve, pulse }) => {
        pulse.userData.t += pulse.userData.speed * 0.01;
        if (pulse.userData.t > 1) pulse.userData.t = 0;
        const pos = curve.getPoint(pulse.userData.t);
        pulse.position.copy(pos);
      });

      portMeshes.forEach((m, i) => {
        const s = 1 + Math.sin(Date.now() * 0.002 + i) * 0.12;
        m.scale.setScalar(s);
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mount.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      renderer.dispose();
      sphereGeo.dispose(); innerGeo.dispose(); dotGeo.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height, touchAction: 'none' }} />;
}

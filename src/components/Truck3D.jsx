import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function buildTruck() {
  const truck = new THREE.Group();

  const navyMat = new THREE.MeshStandardMaterial({ color: 0x0f2240, roughness: 0.45, metalness: 0.35 });
  const amberMat = new THREE.MeshStandardMaterial({ color: 0xc9601a, roughness: 0.4, metalness: 0.3 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0a1320, roughness: 0.6, metalness: 0.2 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x6b8caa, roughness: 0.15, metalness: 0.6, transparent: true, opacity: 0.55 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xc7ccd2, roughness: 0.25, metalness: 0.85 });
  const lightMat = new THREE.MeshStandardMaterial({ color: 0xffe1b3, emissive: 0xffcd80, emissiveIntensity: 1.6 });

  // ── Trailer body ──
  const trailerGeo = new THREE.BoxGeometry(2.7, 0.9, 0.78);
  const trailer = new THREE.Mesh(trailerGeo, navyMat);
  trailer.position.set(-0.55, 0.62, 0);
  trailer.castShadow = true;
  truck.add(trailer);

  // Trailer amber stripe
  const stripeGeo = new THREE.BoxGeometry(2.72, 0.1, 0.79);
  const stripe = new THREE.Mesh(stripeGeo, amberMat);
  stripe.position.set(-0.55, 0.42, 0);
  truck.add(stripe);

  // Trailer underframe
  const underGeo = new THREE.BoxGeometry(2.5, 0.12, 0.6);
  const under = new THREE.Mesh(underGeo, darkMat);
  under.position.set(-0.5, 0.12, 0);
  truck.add(under);

  // ── Cab ──
  const cabLowerGeo = new THREE.BoxGeometry(0.78, 0.55, 0.76);
  const cabLower = new THREE.Mesh(cabLowerGeo, navyMat);
  cabLower.position.set(1.15, 0.45, 0);
  cabLower.castShadow = true;
  truck.add(cabLower);

  const cabUpperGeo = new THREE.BoxGeometry(0.7, 0.42, 0.74);
  const cabUpper = new THREE.Mesh(cabUpperGeo, navyMat);
  cabUpper.position.set(1.1, 0.92, 0);
  truck.add(cabUpper);

  // Windshield
  const windGeo = new THREE.BoxGeometry(0.06, 0.32, 0.66);
  const wind = new THREE.Mesh(windGeo, glassMat);
  wind.position.set(1.46, 0.95, 0);
  truck.add(wind);

  // Side window
  const sideWinGeo = new THREE.BoxGeometry(0.6, 0.26, 0.04);
  const sideWinL = new THREE.Mesh(sideWinGeo, glassMat);
  sideWinL.position.set(1.05, 0.95, 0.39);
  truck.add(sideWinL);
  const sideWinR = sideWinL.clone();
  sideWinR.position.z = -0.39;
  truck.add(sideWinR);

  // Hood / bumper
  const bumperGeo = new THREE.BoxGeometry(0.18, 0.18, 0.82);
  const bumper = new THREE.Mesh(bumperGeo, chromeMat);
  bumper.position.set(1.58, 0.2, 0);
  truck.add(bumper);

  // Grille
  const grilleGeo = new THREE.BoxGeometry(0.04, 0.34, 0.6);
  const grille = new THREE.Mesh(grilleGeo, darkMat);
  grille.position.set(1.52, 0.46, 0);
  truck.add(grille);

  // Headlights
  [0.3, -0.3].forEach((z) => {
    const lightGeo = new THREE.BoxGeometry(0.05, 0.1, 0.12);
    const light = new THREE.Mesh(lightGeo, lightMat);
    light.position.set(1.55, 0.42, z);
    truck.add(light);
  });

  // Exhaust stack
  const stackGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 8);
  const stack = new THREE.Mesh(stackGeo, chromeMat);
  stack.position.set(0.78, 0.95, 0.36);
  truck.add(stack);

  // Connector between cab and trailer
  const connGeo = new THREE.BoxGeometry(0.3, 0.08, 0.5);
  const conn = new THREE.Mesh(connGeo, darkMat);
  conn.position.set(0.6, 0.32, 0);
  truck.add(conn);

  // ── Wheels ──
  const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 20);
  const hubGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.17, 12);
  const wheelPositions = [
    [-1.55, 0.22], [-1.15, 0.22], [-0.35, 0.22], [0.05, 0.22], [1.25, 0.22],
  ];
  const wheels = [];
  wheelPositions.forEach(([x]) => {
    const wheel = new THREE.Mesh(wheelGeo, darkMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.position.set(x, 0.22, 0.42);
    truck.add(wheel);
    const wheel2 = wheel.clone();
    wheel2.position.z = -0.42;
    truck.add(wheel2);
    const hub = new THREE.Mesh(hubGeo, chromeMat);
    hub.rotation.x = Math.PI / 2;
    hub.position.set(x, 0.22, 0.44);
    truck.add(hub);
    const hub2 = hub.clone();
    hub2.position.z = -0.44;
    truck.add(hub2);
    wheels.push(wheel, wheel2, hub, hub2);
  });

  truck.userData.wheels = wheels;
  truck.userData.headlights = [];
  return truck;
}

export default function Truck3D({ height = '100%' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height_ = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height_, 0.1, 100);
    camera.position.set(4.6, 1.7, 3.6);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height_);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // ── Road plane ──
    const roadGeo = new THREE.PlaneGeometry(40, 6);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x0b1626, roughness: 0.9 });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.y = 0;
    road.receiveShadow = true;
    scene.add(road);

    // Road centerline dashes
    const dashGroup = new THREE.Group();
    for (let i = -20; i < 20; i++) {
      const dashGeo = new THREE.PlaneGeometry(0.5, 0.06);
      const dashMat = new THREE.MeshBasicMaterial({ color: 0xc9601a, transparent: true, opacity: 0.55 });
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.position.set(i * 0.9, 0.002, 0);
      dashGroup.add(dash);
    }
    scene.add(dashGroup);

    // ── Truck ──
    const truck = buildTruck();
    truck.position.y = 0;
    scene.add(truck);

    // ── Lighting ──
    const ambient = new THREE.AmbientLight(0x8aa0b8, 0.55);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xfff2e0, 1.1);
    keyLight.position.set(4, 6, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x5b7dff, 0.4);
    rimLight.position.set(-4, 2, -3);
    scene.add(rimLight);

    // Headlight beam glow (cab front)
    const beamGeo = new THREE.ConeGeometry(0.9, 2.4, 16, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({ color: 0xffe1b3, transparent: true, opacity: 0.07, side: THREE.DoubleSide });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.rotation.z = Math.PI / 2;
    beam.position.set(2.6, 0.4, 0);
    scene.add(beam);

    const resizeObserver = new ResizeObserver(() => {
      width = mount.clientWidth;
      height_ = mount.clientHeight;
      if (width === 0 || height_ === 0) return;
      camera.aspect = width / height_;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height_);
    });
    resizeObserver.observe(mount);

    let frameId;
    let t = 0;
    const animate = () => {
      t += 0.0095;
      truck.position.y = Math.sin(t * 2.4) * 0.012;
      truck.rotation.z = Math.sin(t * 2.4) * 0.004;
      truck.userData.wheels.forEach((w) => { w.rotation.y += 0.18; });
      dashGroup.children.forEach((d) => {
        d.position.x -= 0.05;
        if (d.position.x < -18) d.position.x += 36;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height }} />;
}

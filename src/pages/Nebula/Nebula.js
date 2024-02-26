import React, { useEffect, useRef } from 'react';
import './Nebula.css';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Nebula() {
  const mountRef = useRef(null); // This ref will point to the div where the Three.js scene is mounted

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // Consider using the div size instead

    mountRef.current.appendChild(renderer.domElement); // Attach the renderer to the DOM

    // OrbitControls (optional)
    const controls = new OrbitControls(camera, renderer.domElement);

    // Basic Three.js scene content (e.g., a simple cube)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} /> {/* This div will contain the Three.js scene */}
      <h1 className='h1'>HI</h1>
      <h1><Link to='/'>HOME PAGE</Link></h1>
    </div>
  );
}

export default Nebula;
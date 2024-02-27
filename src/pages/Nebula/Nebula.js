import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Nebula.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import CloudAsset from '../../assets/cloud-model.fbx'

function Nebula() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // Lighting (adjust as necessary for your model)
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.add(directionalLight);

    // FBX Model Loader
    const loader = new FBXLoader();
    loader.load(CloudAsset, (object) => {
      // Adjust the model position, scale, etc., as necessary
      object.position.set(0, 0, 0);
      object.scale.set(0.1, 0.1, 0.1); // Scale down if the model is too large
      scene.add(object);
    }, undefined, function (error) {
      console.error(error);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Only required if controls.enableDamping = true, or if controls.autoRotate = true
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} />
      <h1 className='h1'>HI</h1>
      <h1><Link to='/'>HOME PAGE</Link></h1>
    </div>
  );
}

export default Nebula;
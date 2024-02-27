import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Nebula.css';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function Nebula() {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Basic scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasRef.current.appendChild(renderer.domElement);

        // Post-processing
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        composer.addPass(bloomPass);

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Optional: for smoother camera movements, if needed
        controls.dampingFactor = 0.1;
        controls.enableZoom = true; // You can disable this too if you don't want users to zoom
        controls.enableRotate = false; // Prevents users from rotating the camera
        controls.enablePan = false; // Prevents users from panning (moving) the camera

        // Particles
        const particleCount = 5000;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        // Mouse position and window resize handling
        const mouse = { x: 0, y: 0 };
        const onMouseMove = (event) => {
          // Convert mouse coordinates to normalized device coordinates (-1 to +1) for both axes
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
          // Update: Convert to 3D world space direction
          // Note: This code is conceptual and requires further adjustment based on your specific needs
          const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5); // 0.5 is a somewhat arbitrary depth value
          vector.unproject(camera); // Adjusts the vector from normalized device coordinates to 3D world space
          const dir = vector.sub(camera.position).normalize();
          const distance = -camera.position.z / dir.z;
          const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      
          // Now, `pos` represents a 3D position in the world space corresponding to the mouse position
          // You would use `pos` instead of the raw mouse.x and mouse.y to adjust your particle positions
      };
        window.addEventListener('mousemove', onMouseMove);

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize);

        let clock = new THREE.Clock();

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);

          // Update particles based on mouse position
          let positions = particles.geometry.attributes.position.array;
          
          let elapsedTime = clock.getElapsedTime();
            particleMaterial.size = 0.5 + 0.25 * Math.sin(elapsedTime * 0.5); // Change 2 to adjust frequency
          
          for (let i = 0; i < positions.length; i += 3) {
              let dx = mouse.x * 50 - positions[i];
              let dy = mouse.y * 50 - positions[i + 1];
              let distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 10) {
                  // Move the particle away from the mouse
                  positions[i] -= dx / 10;
                  positions[i + 1] -= dy / 10;
              }
          }
          particles.geometry.attributes.position.needsUpdate = true;

          controls.update();
          composer.render();
        };
animate();

        // Cleanup
        return () => {
            canvasRef.current.removeChild(renderer.domElement);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onWindowResize);
            // Properly dispose of objects and listeners
            particles.geometry.dispose();
            particles.material.dispose();
        };
    }, []);

    return (
        <div>
            <div ref={canvasRef}></div>
            <h1 className='h1'>HI</h1>
            <h1><Link to='/'>HOME PAGE</Link></h1>
        </div>
    );
}

export default Nebula;

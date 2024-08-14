import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';
import { OrbitControls } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/controls/OrbitControls.js';
import { TransformControls } from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/controls/TransformControls.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// TransformControls
const transformControls = new TransformControls(camera, renderer.domElement);
transformControls.attach(cube);
scene.add(transformControls);

// Handle TransformControls Mode
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 't': // Translate mode
            transformControls.setMode('translate');
            break;
        case 'r': // Rotate mode
            transformControls.setMode('rotate');
            break;
        case 's': // Scale mode
            transformControls.setMode('scale');
            break;
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

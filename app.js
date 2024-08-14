import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';
import { TransformControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/TransformControls.js';
import { AnimationMixer, KeyframeTrack, AnimationClip, VectorKeyframeTrack, QuaternionKeyframeTrack } from 'https://unpkg.com/three@0.128.0/examples/jsm/animation/Animation.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

// TransformControls
const transformControls = new TransformControls(camera, renderer.domElement);
transformControls.attach(cube);
scene.add(transformControls);

// Define keyframes
const times = [0, 1, 2, 3]; // Keyframe times
const positionValues = [
    0, 0, 0,  // Keyframe 1: position (x, y, z)
    2, 2, 0,  // Keyframe 2: position (x, y, z)
    0, 0, 0,  // Keyframe 3: position (x, y, z)
    -2, -2, 0  // Keyframe 4: position (x, y, z)
];
const rotationValues = [
    0, 0, 0,  // Keyframe 1: rotation (x, y, z in radians)
    Math.PI, Math.PI, 0,  // Keyframe 2: rotation (x, y, z in radians)
    0, 0, 0,  // Keyframe 3: rotation (x, y, z in radians)
    -Math.PI, -Math.PI, 0  // Keyframe 4: rotation (x, y, z in radians)
];

// Create position and rotation keyframe tracks
const positionKF = new VectorKeyframeTrack('.position', times, positionValues);
const rotationKF = new QuaternionKeyframeTrack('.rotation', times, rotationValues);

// Create animation clip
const clip = new AnimationClip('Action', -1, [positionKF, rotationKF]);

// Create animation mixer
const mixer = new AnimationMixer(cube);
mixer.clipAction(clip).play();

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixer.update(delta);
    controls.update(); // Update controls if damping is enabled
    renderer.render(scene, camera);
}

const clock = new THREE.Clock();
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

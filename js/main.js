import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("container3D").appendChild(renderer.domElement);

// Lighting
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(10, 10, 10);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Loader
const loader = new GLTFLoader();
let object, controls;
const objToRender = 'gadget'; // Use an appropriate identifier if needed

loader.load(
  'https://raw.githubusercontent.com/luckylluuks/DragonsBookTEST/main/Model/scene.gltf', // Update with your actual GLTF/GLB URL
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
    object.scale.set(1, 1, 1); // Adjust scale
    object.position.set(0, 0, 0); // Center or adjust position
    console.log('Model loaded and added to the scene');
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('An error happened:', error);
  }
);

// Camera and controls
camera.position.set(0, 0, 10); // Adjust based on model size
if (objToRender === "gadget") {
  controls = new OrbitControls(camera, renderer.domElement);
}

// Render function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Resize event listener
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();

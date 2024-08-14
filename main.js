import * as THREE from 'three';

// Scene
// This is the container where all your 3D objects, lights, and cameras are added.
const scene = new THREE.Scene();

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);


// Camera
// Defines the perspective from which you view the scene. It’s positioned slightly away from the cube to get a good view of it.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
// Renders the scene from the perspective of the camera and attaches the renderer's canvas element to the DOM.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry
// Creates a basic box geometry and applies a green material to it. This is your rotating cube.

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation Loop
// Continuously updates the rotation of the cube and renders the scene.
function animate() {
    requestAnimationFrame(animate);

    // Rotation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

// Handle window resize or Resize Handling
// Adjusts the renderer and camera when the window is resized to ensure the scene fits the new dimensions.

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

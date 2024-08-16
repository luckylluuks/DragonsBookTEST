// import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

//scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff83 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
//light.position.set(x, y, z positions);
scene.add(light);

//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

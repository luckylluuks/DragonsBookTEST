import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';


//scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff83 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//camer
const camera = new THREE.PerspectiveCamera(45, 800, 600);
scene.add(camera);

//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

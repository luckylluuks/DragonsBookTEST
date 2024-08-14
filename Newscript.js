import * as THREE from 'three';

// scene
const scene = THREE.Scene()

//Object
const Geometry = new THREE.BoxGeometry(1, 1, 1)
const Material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const Mesh = new THREE.Mesh(Geometry, Material)
scene.add(Mesh)

//Camera
const sizes = {
    width: 800,
    height: 600
}

const Camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)scene.add(Camera)





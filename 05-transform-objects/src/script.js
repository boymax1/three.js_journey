import './style.css'
import * as THREE from 'three'
import { meshBounds } from '@react-three/drei'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const box = new THREE.Mesh(geometry, material)
box.position.x = 0.7
box.position.y = -0.6
box.position.z = 1

scene.add(box)

// add cubes to group and now we can adjust position, scale rotation to all objects added to group
const group = new THREE.Group()
scene.add(group)


const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = -2
group.add(cube2);
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 2
group.add(cube3);

console.log(box.position.length()); // distance from center of center to our object

// //scale
box.scale.x = 2;
box.scale.y = 2; 

box.rotation.y = Math.PI;

// reduces vector to 1
// box.position.normalize();

// use set() to change position all at same time
// box.position.set(1, 2, 1)

//axis helper
const axisHelper = new THREE.AxesHelper(2);
scene.add(axisHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

//camera.lookAt(box.position);

// distance from camera to box
console.log(box.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
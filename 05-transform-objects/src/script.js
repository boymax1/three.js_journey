import './style.css'
import * as THREE from 'three'

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

console.log(box.position.length()); // distance from center of center to our object

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
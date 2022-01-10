import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';
import * as dat from 'lil-gui';
import { CubicInterpolant } from 'three';

console.log(dat)


// DEBUG
const gui = new dat.GUI({closed: true, width: 400 });

//All debug gui values need to be within an object!!!



const parameters = {
    color: 0xff0000,
    spin: () => {
        // rotate box using greensock
        // first param is how long()duration, 2nd param is destination y
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + 10})
    }
}

//first we add color to an object, then we access the color to use with GUI
// dont forget to add the onChange event to actually change the color1
gui
    .addColor(parameters, 'color')
    .onChange(() => {
        material.color.set(parameters.color)
    })

gui
    .add(parameters, 'spin')

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

// DEBug after instantiating object (has to be an object)
// gui.add(mesh.position, 'y', -3, 3, 0.01) // tweak y position, then min value and max value, then increment step/precition value
// same thing, different way to write... 
gui
    .add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation') // name labels

gui
    .add(mesh, 'visible') // boolean for visible or not checkbox

gui
    .add(material, 'wireframe') // boolean for visible wireframe



gui.add(mesh.position, 'x', -3, 3, 0.01)
gui.add(mesh.position, 'z', -3, 3, 0.01)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
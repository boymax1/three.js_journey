import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// CURSOR
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    console.log(event.clientX, event.clientY)

    // converting pixel nums to canvas nums... -0.5 to 0.5
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)

})

/**
 * Base
 */
// Canvas


const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera (args are Vertical FOV, Aspect Ratio,
// optional 2 last parameters are NEAR and FAR - how close and how far the camera can see )
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

// parameters are left, right, top, and bottom, then near and far
// 

// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

//Orbit Controls
const controls = new OrbitControls(camera, canvas) // args = camera, and canvas
// controls.target.y = 2;

controls.enableDamping = true; // smooths out the orbitControls


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // Updates camera based on mouse position
    // camera.position.x = cursor.x * 5
    // camera.position.y = cursor.y * 5
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    
    //if using damping, need to update controls on every frame
    controls.update();
    
    // camera.lookAt(mesh.position)


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
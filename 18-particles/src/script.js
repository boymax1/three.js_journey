import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')

/**
 * Test cube
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)
// scene.add(cube)

/**
    Particles
 **/

// Geometry
const particlesSphereGeometry = new THREE.SphereBufferGeometry(1, 32, 32);

// Creating a custome Geometry
const particlesGeometry = new THREE.BufferGeometry() //<<<<<<---------
const count = 20000

const positions = new Float32Array(count * 3) // x, y, z
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) { // Multiply by 3 cause, x, y, z
    positions[i] = (Math.random() - 0.5) * 10 // Math.random() -0.5 creates value between -0.5 and +0.5
    // create random red, green, blue value for each particle
    colors[i] = Math.random()
}

// Create the Three.js BufferAttribute and specify that each information is composed of 3 values
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3)) 

particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

//Material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true
})
// activate vertexColors
particlesMaterial.vertexColors = true;

// particlesMaterial.color = new THREE.Color('#ff88cc');

particlesMaterial.map = particleTexture
// Making texture transparent inorder to see thrugh it...
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture
// particlesMaterial.alphaTest = 0.001
// particlesMaterial.depthTest = false
particlesMaterial.depthWrite = false
//  use blending to add the color of that pixel to the color of the pixel already drawn
particlesMaterial.blending = THREE.AdditiveBlending;



// Points
// Creates the particles (in a sphere shape cause of SphereBufferGeometry)
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)


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

    //Update particles
    // particles.rotation.y = elapsedTime * 0.2
    for(let i = 0; i < count; i++) {
        const i3 = i * 3

        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
        // The y coordinate can be access in the array at the index i3 + 1:
       // particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime)
    }
    // The problem is that Three.js has to be notified that the geometry changed
    particlesGeometry.attributes.position.needsUpdate = true 


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



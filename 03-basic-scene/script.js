console.log(THREE)


const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial ({ color: 0xff0000 }) // provide an object (color) to basic marterial class


// to create a mesh, we pass in the geometry and material
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}


//add Camera, 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) // 2 arguments, degree and aspect ratio
camera.position.z = 3
camera.position.x = 2
scene.add(camera)



//Renderer
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera) // need to pass in the scene and camera
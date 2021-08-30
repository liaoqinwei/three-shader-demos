import './css/style.css'
import * as THREE from 'three'
import dat from 'dat.gui'


// DEBUG
const gui = new dat.GUI()

// CANVAS
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()


// Object
const geometry = new THREE.TorusBufferGeometry(.3, .08, 30, 200)


// Material
const material = new THREE.MeshStandardMaterial()
material.color.set(0xFF0000)



// Mesh
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xFFFFFF, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Sizes
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, .1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
})

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


renderer.render(scene, camera)

// Resize
const onWindowReset = () => {
    size.width = window.innerWidth
    size.height = window.innerHeight

    // update
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
window.addEventListener('resize', onWindowReset)


// Animation

const clock = new THREE.Clock

const tick = () => {

    sphere.rotation.y = .5 * clock.getElapsedTime()


    // render
    renderer.render(scene, camera)


    requestAnimationFrame(tick)
}


tick()
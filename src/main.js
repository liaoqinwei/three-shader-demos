import './css/style.css'
import * as THREE from 'three'
import State from "three/examples/jsm/libs/stats.module"
import dat from 'dat.gui'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry"
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial"
import * as GeometryUtils from "three/examples/jsm/utils/GeometryUtils"
import { Line2 } from "three/examples/jsm/lines/Line2"

import frag from "./shaders/shader.frag"
import vert from "./shaders/shader.vert"

import frag2 from "./shader2/shader.frag"
import vert2 from "./shader2/shader.vert"

import frag3 from "./shader3/shader.frag"
import vert3 from "./shader3/shader.vert"

import frag4 from "./shader4/shader.frag"
import vert4 from "./shader4/shader.vert"

import ctFrag from "./canvasTexture/canvasTexture.frag"
import ctVert from "./canvasTexture/canvasTexture.vert"

import frag5 from "./shader5/shader.frag"
import vert5 from "./shader5/shader.vert"

import frag6 from "./shader6/shader.frag"
import vert6 from "./shader6/shader.vert"

import frag7 from "./shader7/shader.frag"
import vert7 from "./shader7/shader.vert"

import frag8 from "./shader8/shader.frag"
import vert8 from "./shader8/shader.vert"


// DEBUG
const gui = new dat.GUI()

// CANVAS
const canvas = document.querySelector('canvas.webgl')

const state = new State()
document.body.append(state.dom)
// Scene
const scene = new THREE.Scene()

// {
//     const water = new Water(
//         new THREE.PlaneGeometry(50,50),
//     )
// }
{
    const geo = new THREE.PlaneGeometry(1, 1, 1, 1)
    const material = new THREE.RawShaderMaterial({
        uniforms: {
            u_time: { value: 0. },
            resolution: { value: new THREE.Vector2() },
            colorB: { type: 'vec3', value: new THREE.Color(0xACB6E5) },
            colorA: { type: 'vec3', value: new THREE.Color(0x74ebd5) }
        },
        vertexShader: vert,
        fragmentShader: frag,
        // wireframe: true
    })

    material.side = THREE.DoubleSide

    const plane = new THREE.Mesh(geo, material)
    plane.rotation.x = THREE.MathUtils.degToRad(-90)
    // scene.add(plane)

    const task = (time) => {
        material.uniforms.u_time.value = time * 0.01
        requestAnimationFrame(task)
    }
    requestAnimationFrame(task)
}

// shader 2 
{
    const vertices = []
    const sizes = []
    const lifes = []

    for (let i = 0; i < 5000; i++) {
        const x = THREE.MathUtils.randFloatSpread(5);
        const y = THREE.MathUtils.randFloatSpread(5);
        const z = THREE.MathUtils.randFloatSpread(5);

        vertices.push(x, y, z);
        sizes.push(THREE.MathUtils.randInt(10, 40));
        lifes.push(THREE.MathUtils.randFloat(1, 10));
    }

    const attr = new THREE.Float32BufferAttribute(vertices, 3)
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', attr);
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geometry.setAttribute('life', new THREE.Float32BufferAttribute(sizes, 1));
    const clock = new THREE.Clock()
    const material = new THREE.RawShaderMaterial({
        uniforms: {
            u_time: { value: 1.0 },
            resolution: { value: new THREE.Vector2() },
            colorB: { type: 'vec3', value: new THREE.Color(0xACB6E5) },
            colorA: { type: 'vec3', value: new THREE.Color(0x74ebd5) },
            end_x: { value: 50. },
            max_life: { value: 10 },
        },
        vertexShader: vert2,
        fragmentShader: frag2,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        blendDstAlpha: true,
        blending: THREE.AdditiveBlending
        // wireframe: true
    })
    const points = new THREE.Points(geometry, material);

    const task = (time) => {
        requestAnimationFrame(task)
        // for (let i = 0; i < attr.array.length; i += 3) {
        //     attr.array[i + 2] = Math.sin((attr.array[i] + time * .001) * 2) / 2 + .2 
        //     // attr.array[i] += Math.random() / 200
        // }
        // attr.needsUpdate = true
        material.uniforms.u_time.value = clock.getElapsedTime()
        material.uniformsNeedUpdate = true

    }
    requestAnimationFrame(task)
    // scene.add(points)
}

// shader3
{
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.RawShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_color: { type: 'vec3', value: new THREE.Color(0xFF0000) },
        },
        vertexShader: vert3,
        fragmentShader: frag3,
        side: THREE.DoubleSide
        // wireframe: true
    })
    const mesh = new THREE.Mesh(geometry, material);
    const task = (time) => {
        material.uniforms.u_time.value = time * 0.01
        requestAnimationFrame(task)
    }
    requestAnimationFrame(task)
    // scene.add(mesh)
}

// shader4
{
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.RawShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            u_color: { type: 'vec3', value: new THREE.Color(0xFF0000) },
        },
        vertexShader: vert4,
        fragmentShader: frag4,
        side: THREE.DoubleSide
        // wireframe: true
    })
    const mesh = new THREE.Mesh(geometry, material);
    const task = (time) => {
        material.uniforms.u_time.value = time * 0.001
        requestAnimationFrame(task)
    }
    requestAnimationFrame(task)

}
const renderTarget = new THREE.WebGLRenderTarget(200, 200)
const targetScene = new THREE.Scene()
const targetCamera = new THREE.OrthographicCamera(-.5, .5, .5, -.5)

// canvasTexture
{
    {
        const geo = new THREE.PlaneGeometry(1, 1)
        const uniforms = {
            u_time: { value: 0 }
        }
        const mat = new THREE.RawShaderMaterial({ fragmentShader: ctFrag, vertexShader: ctVert })
        targetScene.add(new THREE.Mesh(geo, mat))
        targetCamera.position.z = 1
        const task = () => {

        }
        requestAnimationFrame
    }


    const geo = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshStandardMaterial({ alphaMap: renderTarget.texture })

    const box = new THREE.Mesh(geo, material);
    // scene.add(box)
}

// 管道
{
    const vects = [
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(-5, 5, .1),
        new THREE.Vector3(0, 0, 2.),
        new THREE.Vector3(5, -5, 4.),
        new THREE.Vector3(10, 0, .4),
        new THREE.Vector3(20, 0, .4),
        new THREE.Vector3(30, 0, .4)

    ]


    const curve = new THREE.CatmullRomCurve3(vects)
    const points = curve.getPoints(curve.getLengths().length * 2.)
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    geometry.setAttribute("current", new THREE.Float32BufferAttribute(points.map((_, i) => i / (points.length - 1)), 1))
    const material = new THREE.RawShaderMaterial({
        fragmentShader: frag5, vertexShader: vert5,
        transparent: true,
        depthTest: false,
        depthWrite: true,
        uniforms: {
            uTime: { value: 0 },
            uDuration: { value: 5 },
            uRange: { value: .2 }
        }
    });

    // Create the final object to add to the scene
    const splineObject = new THREE.Points(geometry, material);
    const task = (time) => {
        material.uniforms.uTime.value = time * 0.001
        requestAnimationFrame(task)
    }
    requestAnimationFrame(task)
    // scene.add(splineObject)
}

THREE.UniformsLib.line = {

    worldUnits: { value: 1 },
    linewidth: { value: 1 },
    resolution: { value: new THREE.Vector2(1, 1) },
    dashOffset: { value: 0 },
    dashScale: { value: 1 },
    dashSize: { value: 1 },
    gapSize: { value: 1 } // todo FIX - maybe change to totalSize

};


// 流光
{
    const positions = [];
    const colors = [];

    const points = GeometryUtils.hilbert3D(new THREE.Vector3(0, 0, 0), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7);

    const spline = new THREE.CatmullRomCurve3(points);
    const divisions = Math.round(12 * points.length);
    const point = new THREE.Vector3();
    const color = new THREE.Color();

    const range = .1
    let current = 0.
    for (let i = 0, l = divisions; i < l; i++) {

        const t = i / l;

        spline.getPoint(t, point);
        positions.push(point.x, point.y, point.z);

        if (t < range) {
            color.setHSL(range, 1, .5)
        } else {
            color.setRGB(1, 0, 0)
        }
        colors.push(color.r, color.g, color.b);
    }


    // Line2 ( LineGeometry, LineMaterial )

    const geometry = new LineGeometry();
    geometry.setPositions(positions);
    geometry.setColors(colors);

    const matLine = new LineMaterial({

        color: 0xffffff,
        linewidth: 5, // in world units with size attenuation, pixels otherwise
        vertexColors: true,

        //resolution:  // to be set by renderer, eventually
        dashed: false,
        alphaToCoverage: true,

    });

    matLine.resolution.set(window.innerWidth, window.innerHeight);
    const line = new Line2(geometry, matLine);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    // scene.add(line);
}


// 流光
{
    const vects = [
        new THREE.Vector3(-10, 0, 0),
        new THREE.Vector3(-5, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(5, 0, 0),
        new THREE.Vector3(10, 0, -20),
        new THREE.Vector3(20, 0, 0),
        new THREE.Vector3(30, 0, 60)

    ]
    const spline = new THREE.CatmullRomCurve3(vects);
    const geometry = new THREE.TubeGeometry(spline, 64, .2, 2, false);
    console.log(geometry)
    const material = new THREE.RawShaderMaterial({
        transparent: true,
        fragmentShader: frag7,
        vertexShader: vert7,
        uniforms: {
            uRange: { value: .1 },
            uTime: { value: 0 },
            uDuration: { value: 2 },
            uDelay: { value: 0. },
            uBgColor: { value: new THREE.Color(.5, .9, .8), type: "color" },
            uFlowColor: { value: new THREE.Color(1, 0, 1), type: "color" },
        }
    });
    const task = (time) => {
        material.uniforms.uTime.value = time * .001;
        requestAnimationFrame(task)

    }
    requestAnimationFrame(task)

    const mesh = new THREE.Mesh(geometry, material);
    // scene.add(mesh);
}

// 点测试
{
    const points = []
    for (let i = 0; i < 1000; i++) {
        let x = THREE.MathUtils.randFloat(0, 10);
        let y = THREE.MathUtils.randFloat(0, 10);
        let z = THREE.MathUtils.randFloat(0, 10);

        points.push(x, y, z)
    }
    points.push(0, 0, 0)

    const geo = new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(points, 3))
    const mat = new THREE.RawShaderMaterial({
        vertexShader: vert8,
        fragmentShader: frag8,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        blending: THREE.CustomBlending,
        blendEquation:THREE.AddEquation,
        blendSrc:THREE.SrcColorFactor,
        blendDst:THREE.SrcColorFactor,
        // blendEquationAlpha:THREE.AddEquation,
        // blendSrcAlpha:THREE.OneFactor,
        // blendDstAlpha:THREE.OneFactor,

        uniforms: {
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        }
    })
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(40,40, 5), new THREE.MeshBasicMaterial({ color: 0x15842,blending:THREE.NoBlending,transparent:true })))
    const point = new THREE.Points(geo, mat)
    scene.add(point);
}

// Lights
const ambLight = new THREE.AmbientLight(0xFFFFFF, 1)

const pointLight = new THREE.PointLight(0xFFFFFF, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight)
scene.add(ambLight)


// Sizes
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}


// Camera
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, .1, 10000)
camera.position.x = 0
camera.position.y = 4
camera.position.z = 40
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: 1,
    antialias: true,
})

renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



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


const controls = new OrbitControls(camera, canvas)
controls.update()

// Animation

const clock = new THREE.Clock

const tick = () => {
    // render
    renderer.setRenderTarget(renderTarget)
    renderer.render(targetScene, targetCamera)
    renderer.setRenderTarget(null)
    renderer.render(scene, camera)

    controls.update()

    state.update()
    requestAnimationFrame(tick)
}


requestAnimationFrame(tick)

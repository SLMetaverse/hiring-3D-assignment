import { WebGLRenderer, Color, Scene, PerspectiveCamera, BoxBufferGeometry, Mesh, MeshStandardMaterial, DirectionalLight } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let getRenderer = () => {
    const renderer = new WebGLRenderer({ antialias: true })
    // turn on the physically correct lighting model
    renderer.physicallyCorrectLights = true
    return renderer
}

let getScene = (color='black') => {
    const scene = new Scene()
    scene.background = new Color(color)
    return scene
}

let getPerspectiveCamera = (fov, aspect, near, far, z) => {
    const camera = new PerspectiveCamera(
        fov,
        aspect,
        near,
        far
    )
    camera.position.set(0, 0, z)
    return camera
}

let getCube = (width, height, depth) => {
    const geometry = new BoxBufferGeometry(width, height, depth)
    const material = new MeshStandardMaterial({color: 'purple'})
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material)
    cube.rotation.set(-0.5, -0.1, 0.8)
    cube.tick = () => {
      // increase the cube's rotation each frame
      cube.rotation.z += 0.01
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
    }
    return cube
}

let getDirectLight = (color = 'white', intensity = 8) => {
    const light = new DirectionalLight(color, intensity)
    light.position.set(10, 10, 10)
    return light
}

let getOrbitControl = (camera, canvas) => {
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 1;
    controls.tick = () => controls.update()
    return controls
}


export {
    getRenderer,
    getScene,
    getPerspectiveCamera,
    getCube,
    getDirectLight,
    getOrbitControl
}
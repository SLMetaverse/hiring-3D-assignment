import { WebGLRenderer, Color, Scene, PerspectiveCamera, BoxBufferGeometry, Mesh, MeshStandardMaterial, MeshBasicMaterial, DirectionalLight, PlaneGeometry, DoubleSide, Quaternion, Vector3, Group } from 'three'
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

let getPerspectiveCamera = (fov, aspect, near, far, x, y, z) => {
    const camera = new PerspectiveCamera(
        fov,
        aspect,
        near,
        far
    )
    camera.position.set(x, y, z)
    return camera
}

let getCube = (width, height, depth) => {
    const geometry = new BoxBufferGeometry(width, height, depth)
    const material = new MeshStandardMaterial({color: 'purple'})
    // create a Mesh containing the geometry and material
    const cube = new Mesh(geometry, material)
    cube.rotation.set(-0.5, -0.1, 0.8)
    // cube.tick = () => {
    //   // increase the cube's rotation each frame
    //   cube.rotation.z += 0.01
    //   cube.rotation.x += 0.01
    //   cube.rotation.y += 0.01
    // }
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
    return controls
}

let getPlane = (color, transparent, width) => {
    const planeGeo = new PlaneGeometry(width, width);
    let obj = {
        color: color, transparent: transparent, opacity: transparent ? 0.3 : 1, side: DoubleSide
    }

    if (transparent) {
        obj.depthWrite = false
    }
    
    const material = new MeshBasicMaterial( obj )
    const plane = new Mesh( planeGeo, material )
    return plane
}

let getQuaternion = () => {
    var quaternion = new Quaternion()
    quaternion.setFromAxisAngle( new Vector3( 0,.25,0 ), Math.PI / 180 )
    return quaternion
}

let toRad = (degree) => {
    return degree * (Math.PI/180);
}

const ANGULAR_SPEED = 0.75
// const ANGULAR_SPEED = 0.05
const QuaternionMovements = {
    ArrowUp:    new Quaternion().setFromAxisAngle(new Vector3(1,0,0),toRad(ANGULAR_SPEED)),
    ArrowDown:  new Quaternion().setFromAxisAngle(new Vector3(1,0,0),toRad(-ANGULAR_SPEED*6)),
    ArrowLeft:  new Quaternion().setFromAxisAngle(new Vector3(0,1,0),toRad(-ANGULAR_SPEED*6)),
    ArrowRight: new Quaternion().setFromAxisAngle(new Vector3(0,1,0),toRad(ANGULAR_SPEED*6))
}

let getQuaternionMovements = (direction) => {
    return QuaternionMovements[direction]
}

let getGroup = () => {
    return new Group()
}


export {
    getRenderer,
    getScene,
    getPerspectiveCamera,
    getCube,
    getDirectLight,
    getOrbitControl,
    getPlane,
    getQuaternion,
    getQuaternionMovements,
    getGroup
}
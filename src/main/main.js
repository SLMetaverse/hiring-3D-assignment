import * as THREE from "https://unpkg.com/three/build/three.module.js"
import FirstPersonCamera from "../camera/FirstPersonCamera.js"
import InputController from "../input/inputController.js"
import Room3D from "../main/Room3D.js"
import colliders from "../physics/colliders.js"
import RoomCreator from "../roomCreator/roomCreator.js"

let scene, camera, renderer, firstPersonCamera

function makeScene() {
    scene = new THREE.Scene()
}

function makeRenderer() {
    const container = document.getElementById( 'container' )
    renderer = new THREE.WebGLRenderer( {antialias: true } )
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    container.appendChild( renderer.domElement )
    renderer.localClippingEnabled = true
}

function makeCamera() {
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 )
    camera.position.set( 0, 50, 4*100 )

    firstPersonCamera = new FirstPersonCamera(camera)
}

function addRoom() {
    let roomCreator = new RoomCreator([
        [0,1,1,1],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [1,1,0,0],
        [0,1,1,0],
    ])
    roomCreator.rooms().forEach(room => {
        let room3d = new Room3D(room)
        scene.add( room3d.object )
    });
}

function addLight() {
    const mainLight = new THREE.PointLight( 0xcccccc, 0.7, 250 )
    mainLight.position.y = 60
    mainLight.position.z = 100
    scene.add( mainLight )
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize( window.innerWidth, window.innerHeight )
}

function setup() {
    makeScene()
    makeRenderer()
    makeCamera()
    addRoom()
    addLight()
    window.addEventListener( 'resize', onWindowResize )
}

function animate(time) {
    requestAnimationFrame(animate)
    firstPersonCamera.update()
    colliders.checkCollisionWithCamera(firstPersonCamera)
    renderer.render(scene, camera)
    InputController.update() // update clears the input so call at last
}

setup()
animate()
  
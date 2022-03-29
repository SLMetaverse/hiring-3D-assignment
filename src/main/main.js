import * as THREE from "https://unpkg.com/three/build/three.module.js"
import {FirstPersonControls} from 'https://unpkg.com/three/examples/jsm/controls/FirstPersonControls.js'
import Room3D from "../main/Room3D.js"
import RoomCreator from "../roomCreator/roomCreator.js"

let scene, camera, renderer, cameraControl

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
    camera.rotateY( -Math.PI/2 )

    cameraControl = new FirstPersonControls(camera, renderer.domElement)
    cameraControl.lookSpeed = 0.001
    cameraControl.movementSpeed = 1
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

function setup() {
    makeScene()
    makeRenderer()
    makeCamera()
    addRoom()
    addLight()
}

function animate(time) {
    requestAnimationFrame(animate)
    cameraControl.update(0.5);
    renderer.render(scene, camera)
}

setup()
animate()
import * as THREE from "https://unpkg.com/three/build/three.module.js"
import Room from "../roomCreator/room.js"
import { Walls } from "../roomCreator/walls.js"
import Room3D from "../main/Room3D.js"

let scene, camera, renderer

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
    camera.position.set( 0, 75, 50 )
}

function addRoom() {
    let room = new Room3D(new Room(0,0,[Walls.LEFT]))
    scene.add( room.object )
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

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

setup()
animate()
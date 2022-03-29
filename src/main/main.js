import * as THREE from "https://unpkg.com/three/build/three.module.js"

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
    camera.position.set( 0, 75, 160 )
}

function addPlane() {
    const planeGeo = new THREE.PlaneGeometry( 100.1, 100.1 )

    const planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( {color: 0xff7fff } ) )
    planeBack.position.z = - 50
    planeBack.position.y = 50
    scene.add( planeBack )
}

function addLight() {
    const mainLight = new THREE.PointLight( 0xcccccc, 0.7, 250 )
    mainLight.position.y = 60
    scene.add( mainLight )
}

function setup() {
    makeScene()
    makeRenderer()
    makeCamera()
    addPlane()
    addLight()
}

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

setup()
animate()
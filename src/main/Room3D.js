import * as THREE from "https://unpkg.com/three/build/three.module.js"
import { Walls } from "../roomCreator/walls.js"


export default class Room3D {
    constructor(room) {
        this.object = new THREE.Object3D()

        let walls = room.openWalls

        this.#createWall(0xffffff, 0, 100, 0, Math.PI/2, 0) //ceilling
        this.#createWall(0xffffff, 0, 0, 0, -Math.PI/2, 0) //floor
        if (!walls.some(e => e === Walls.FRONT)) this.#createWall(0x7f7fff, 0, 50, -50, 0, 0)
        if (!walls.some(e => e === Walls.BACK))  this.#createWall(0xff7fff, 0, 50, 50, 0, 0)
        if (!walls.some(e => e === Walls.RIGHT)) this.#createWall(0x00ff00, 50, 50, 0, 0, -Math.PI/2)
        if (!walls.some(e => e === Walls.LEFT))  this.#createWall(0xff0000, -50, 50, 0, 0, Math.PI/2)

        this.#addLight()
        this.object.position.set(100*room.x, 0, 100*room.y)
    }

    #addLight() {
        const mainLight = new THREE.PointLight( 0xcccccc, 0.5, 250 )
        mainLight.position.y = 60
        this.object.add( mainLight )
    }

    #createWall(color, x, y, z, rotationX, rotationY) {
        const planeGeo = new THREE.PlaneGeometry( 100, 100 )

        const planeTop = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( {color: color } ) )
        planeTop.position.x = x
        planeTop.position.y = y
        planeTop.position.z = z
        planeTop.rotateX( rotationX )
        planeTop.rotateY( rotationY )

        planeTop.material.side = THREE.DoubleSide
        this.object.add( planeTop )
    }
}
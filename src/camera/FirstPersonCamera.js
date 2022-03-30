import * as THREE from "https://unpkg.com/three/build/three.module.js"
import InputController from "../input/inputController.js"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export default class FirstPersonCamera {
    constructor(camera) {
        this.camera = camera
        this.xAngle = 0
        this.yAngle = 0
    }

    update() {
        this.#updateRotation()
    }

    #updateRotation() {
        this.yAngle -= InputController.mouseMoveX/10*Math.PI/180
        this.xAngle = clamp(this.xAngle - InputController.mouseMoveY/10*Math.PI/180, -Math.PI / 3, Math.PI / 3)
    
        const xQuaternion = new THREE.Quaternion()
        xQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), this.xAngle)
        const yQuaternion = new THREE.Quaternion()
        yQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.yAngle)
    
        const quaternion = new THREE.Quaternion()
        quaternion.multiply(yQuaternion)
        quaternion.multiply(xQuaternion)
    
        this.camera.quaternion.copy(quaternion)
    }
}
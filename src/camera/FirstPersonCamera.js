import * as THREE from "https://unpkg.com/three/build/three.module.js"
import InputController from "../input/inputController.js"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

export default class FirstPersonCamera {
    constructor(camera) {
        this.camera = camera
        this.xAngle = 0
        this.yAngle = 0
        this.velocity = {x: 0, z: 0}
        this.forward = 0.0
        this.sideways = 0.0
    }

    update() {
        this.#updateRotation()
        this.#updatePosition()
    }

    #updateRotation() {
        // x movement of mouse gives y rotation and y movement gives x rotation
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

    #updatePosition() {
        let speed = 1
        if(InputController.keyDown == 'w') this.velocity.z = speed
        if(InputController.keyDown == 'a') this.velocity.x = speed
        if(InputController.keyDown == 's') this.velocity.z = -speed
        if(InputController.keyDown == 'd') this.velocity.x = -speed
        
        if(InputController.keyUp == 'w') this.velocity.z = 0
        if(InputController.keyUp == 'a') this.velocity.x = 0
        if(InputController.keyUp == 's') this.velocity.z = 0
        if(InputController.keyUp == 'd') this.velocity.x = 0
        
        const yQuaternion = new THREE.Quaternion()
        yQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), this.yAngle)
    
        const forward = new THREE.Vector3(0, 0, -1)
        forward.applyQuaternion(yQuaternion)
        forward.multiplyScalar(this.velocity.z)
    
        const sideways = new THREE.Vector3(-1, 0, 0)
        sideways.applyQuaternion(yQuaternion)
        sideways.multiplyScalar(this.velocity.x)
    
        this.camera.position.add(forward)
        this.camera.position.add(sideways)
        this.camera.position.y = 50 //stop camera sliding up or down the wall

        this.forward = forward
        this.sideways = sideways
    }

    hitWallSideways() {
        this.camera.position.sub(this.sideways)
    }

    hitwallForward() {
        this.camera.position.sub(this.forward)
    }
}
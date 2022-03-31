import * as THREE from "https://unpkg.com/three/build/three.module.js"

class Colliders {
    #colliders = []

    add(collider) {
        this.#colliders.push(collider)
    }

    checkCollisionWithCamera(firstPersonCamera) {
        let camera = firstPersonCamera.camera
        let oldCamera = camera.clone();

        let raycaster = new THREE.Raycaster();
        raycaster.far = 10;

        raycaster.set(camera.position, oldCamera.position.normalize());
        if(raycaster.intersectObjects(this.#colliders).length>0){    
            if(firstPersonCamera.velocity.z != 0) firstPersonCamera.hitwallForward()
            if(firstPersonCamera.velocity.x != 0) firstPersonCamera.hitWallSideways()
        }
    }
}

export default new Colliders()
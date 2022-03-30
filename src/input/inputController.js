export default class InputController {
    constructor() {
        this.mouseMoveX = 0
        this.mouseMoveY = 0 
        this.setupMouseMoveListener()
        this.lockPointer()
    }

    update() {
        this.mouseMoveX = 0
        this.mouseMoveY = 0
    }

    setupMouseMoveListener() {
        let self = this
        document.onmousemove = function (mouseEvent) {
            self.mouseMoveX = mouseEvent.movementX
            self.mouseMoveY = mouseEvent.movementY
        }
    }

    lockPointer() {
        document.onmousedown = function () {
            document.body.requestPointerLock();
        };
    }
}
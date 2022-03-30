class InputController {
    constructor() {
        this.#setupInputs()
        this.setupMouseMoveListener()
        this.lockPointer()
        this.setupKeyDownListener()
        this.setupKeyUpListener()
    }

    update() {
        this.#setupInputs()
    }

    #setupInputs() {
        this.mouseMoveX = 0
        this.mouseMoveY = 0
        this.keyDown = ''
        this.keyUp = ''
    }

    setupKeyUpListener() {
        let self = this
        document.onkeyup = function (keyEvent) {
            self.keyUp = keyEvent.key
        }
    }

    setupKeyDownListener() {
        let self = this
        document.onkeydown = function (keyEvent) {
            self.keyDown = keyEvent.key
        }
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

export default new InputController()
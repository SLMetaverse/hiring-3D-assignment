<template>
  <div id="scene-container"/>
</template>

<script>
import { 
  getRenderer,
  getScene,
  getPerspectiveCamera,
  // getCube,
  getQuaternion,
  // getDirectLight,
  getQuaternionMovements,
  getOrbitControl,
  getPlane,
  getGroup
} from '@/utils/3Dcomponents'

export default {
  name: '3DScene',
  data () {
    return {
      // updateTables: [],
      matrix: [ [0, 1, 0, 0, 0, 0], [3, 2, 5, 6, 7, 8], [4, 0, 0, 0, 0, 9],[0, 0, 0, 0, 0, 10] ],
      width: 1.25,
      // roomColors: ['red', 'yellow', 'green', 'grey', 'purple', 'orange', 'blue', 'pink', 'black', 'white']
      // https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3
    }
  },
  methods: {
    init () {
        const sceneContainer = document.querySelector('#scene-container')
        this.scene = getScene('skyblue')
        this.camera = getPerspectiveCamera(35, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 100, 10, 10, 10)
        // const light = getDirectLight()
        // this.scene.add(light)
        this.group = getGroup()
        this.createRooms()
        this.scene.add(this.group)
        this.renderer = getRenderer()
        this.renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        sceneContainer.append(this.renderer.domElement)
        this.quaternion = getQuaternion()
        this.orbitControl = getOrbitControl(this.camera, this.renderer.domElement)
        this.renderer.render(this.scene, this.camera)
        this.animate()
        window.addEventListener('keydown', (e) => {
          let QuaternionMovement = getQuaternionMovements(e.key)
          if (QuaternionMovement) {
            const cur = this.group.quaternion
            const rot = QuaternionMovement
            cur.multiplyQuaternions(rot,cur)
          }
        })
        window.addEventListener('resize', () => {
          this.resize(sceneContainer)
        })
    },
    animate() {
        requestAnimationFrame(this.animate)
        this.orbitControl.update()
        this.renderer.render(this.scene, this.camera)
    },
    resize (sceneContainer) {
      this.camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight
      // update the camera's frustum
      this.camera.updateProjectionMatrix()
      // update the size of the renderer AND the canvas
      this.renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight)
            // set the pixel ratio (for mobile devices)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.render(this.scene, this.camera)
    },
    createRooms () {
      let xCoordinate = 0
      let yCoordinate = -2
      let zCoordinate = 0
      for(var i = 0; i < this.matrix.length; i++) {
        var cube = this.matrix[i];
        for(var j = 0; j < cube.length; j++) {
          if (cube[j] > 0) {
            let wallDetails = {
              x: -(xCoordinate + j*this.width),
              y: yCoordinate,
              z: -(zCoordinate + i*this.width),
              right: j > 0 && cube[j-1] > 0 ? 1 : 0,
              left: j < cube.length - 1 &&  cube[j+1] > 0 ? 1 : 0,
              front: i > 0 && this.matrix[i-1][j] > 0 ? 1 : 0,
              back: i < this.matrix.length - 1 && this.matrix[i+1][j] > 0 ? 1 : 0,
              // color: this.roomColors[cube[j]-1]
            }
            this.createRoom(wallDetails)
          }          
        }
      }
    },
    createRoom (wallDetails) {
      let x = wallDetails.x
      let y = wallDetails.y
      let z = wallDetails.z

      // let roomColor = wallDetails.color

      const frontWall = getPlane('white', wallDetails.front, this.width)
      frontWall.position.x = x
      frontWall.position.y = y
      frontWall.position.z = z

      const backWall = getPlane('yellow', wallDetails.back, this.width)
      backWall.position.x = x
      backWall.position.y = y
      backWall.position.z = z - this.width

      // frontWall.rotateY( Math.PI )

      const leftWall = getPlane('green', wallDetails.left, this.width)
      leftWall.position.x = x - this.width/ 2
      leftWall.position.y = y
      leftWall.position.z = z - this.width/2
      leftWall.rotateY(Math.PI / 2 )

      const rightWall = getPlane('red', wallDetails.right, this.width)
      rightWall.position.x = x + this.width/2
      rightWall.position.y = y
      rightWall.position.z = z - this.width/2
      rightWall.rotateY(-Math.PI / 2)

      // const topWall = getPlane('blue')
      // topWall.position.x = x
      // topWall.position.y = y + width/2
      // topWall.position.z = z - width/2
      // topWall.rotateX(-Math.PI / 2)

      const bottomWall = getPlane('grey', false, this.width)
      bottomWall.position.x = x
      bottomWall.position.y = y - this.width/2
      bottomWall.position.z = z - this.width/2
      bottomWall.rotateX(-Math.PI / 2)

      this.group.add(backWall)
      this.group.add(frontWall)
      this.group.add(leftWall)
      this.group.add(rightWall)
      // this.scene.add(topWall)
      this.group.add(bottomWall)
    }
  },
  async mounted (){
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.skyblue {
    color: skyblue;
}
#scene-container {
  /* tell our scene container to take up the full page */
  position: absolute;
  width: 95%;
  height: 90%;
  margin: 25px;

  /*
    Set the container's background color to the same as the scene's
    background to prevent flashing on load
  */
  /* background-color: skyblue; */
}
</style>
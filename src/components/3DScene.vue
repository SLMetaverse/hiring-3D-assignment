<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="scene-container"/>
  </div>
</template>

<script>
import { 
  getRenderer,
  getScene,
  getPerspectiveCamera,
  getCube,
  getDirectLight,
  getOrbitControl
} from '@/utils/3Dcomponents'

import { Clock } from 'three'

export default {
  name: '3DScene',
  props: {
    msg: String
  },
  data () {
    return {
      updateTables: []
      // https://stackoverflow.com/questions/65693108/threejs-component-working-in-vuejs-2-but-not-3
    }
  },
  methods: {
    init () {
      this.clock = new Clock()
      const sceneContainer = document.querySelector('#scene-container')
      this.scene = getScene('skyblue')
      this.camera = getPerspectiveCamera(35, sceneContainer.innerWidth / sceneContainer.innerHeight, 0.1, 100, 10)
      // this.camera = getPerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100, 10)

      const cube = getCube(2, 2, 2)
      const light = getDirectLight()
      this.scene.add(cube, light)
      // this.updateTables.push(cube)
      this.renderer = getRenderer()
      sceneContainer.append(this.renderer.domElement)
      const orbitControl = getOrbitControl(this.camera, this.renderer.domElement)
      this.updateTables.push(orbitControl)
      // orbitControl.target.set(cube.position)
      // this.renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight)
      // this.renderer.setPixelRatio(window.devicePixelRatio)
      this.resize(sceneContainer)
      orbitControl.addEventListener('change', () => {
        this.render()
      })
      window.addEventListener('resize', () => {
        // set the size again if a resize occurs
        this.resize(sceneContainer)
      })

      // this.startAnimation()
    },
    render () {
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
      this.render()
    },
    startAnimation () {
      this.renderer.setAnimationLoop(() => {
        this.tick()
          // render a frame
        this.render()
      })
    },
    stopAnimation () {
      this.renderer.setAnimationLoop(null)
    },
    tick () {
      const delta = this.clock.getDelta()
      for (const object of this.updateTables) {
        object.tick(delta)
      }
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#scene-container {
  /* tell our scene container to take up the full page */
  position: absolute;
  width: 100%;
  height: 100%;

  /*
    Set the container's background color to the same as the scene's
    background to prevent flashing on load
  */
  /* background-color: skyblue; */
}
</style>
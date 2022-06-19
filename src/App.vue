<template>
    <div>
        <p style="margin:1px">Press ArrowKeys for Quaternion Rotation of the room and use mouse to rotate camera.</p>
        <QuaternionRotation/>
        <!-- <ThreeDScene/> -->
    </div>
</template>

<script>
// import ThreeDScene from '@/components/3DScene'
import QuaternionRotation from '@/components/QuaternionRotation.vue'

export default {
  name: 'App',
  components: {
    QuaternionRotation,
    // ThreeDScene,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

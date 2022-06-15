<template>
    <div>
        <ThreeDScene msg="Hello"/>
    </div>
</template>

<script>
// import ThreeDSceneBK from '@/components/3DSceneBK'
import ThreeDScene from '@/components/3DScene'

export default {
  name: 'App',
  components: {
    ThreeDScene,
    // ThreeDSceneBK
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
  margin-top: 60px;
}
</style>

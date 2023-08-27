<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import "@/assets/font/font.css"

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  mounted() {
    const req = require.context('@/assets/static/img', false, /\.svg$/);
    req.keys().forEach(filename => req(filename));
  }
}
</script>

<style>
  *{
    padding:0;
    margin:0;
    font-family:'SSFY' !important;
  }
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
  body{
    width: 100%;
    background-color: rgb(239,239,239);
  }
  .lizi{
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="webgl-box-warpper" v-loading="is_loading">
<!--      <vue-unity-webgl-->
<!--          v-if="is_show_webgl"-->
<!--          ref="vueUnityWebgl"-->
<!--          :config="webglConfig"-->
<!--          :unity-loader="webglUnityLoader"-->
<!--          :width="webglWidth"-->
<!--          :height="webglHeight"-->
<!--          :on-progress="listenWebglProgress"-->
<!--      ></vue-unity-webgl>-->
    </div>
    <router-link to="/Login">Login</router-link>
  </div>
</template>
<script>
// import VueUnityWebgl from '@/components/vue-unity-webgl';
export default {
  components: {
    // VueUnityWebgl
  },
  data() {
    return {
      is_loading: false,
      is_show_webgl: true,
      webglConfig: '/Scenes1/Build/Scenes1.json',
      webglUnityLoader: '/Scenes1/Build/UnityLoader.js',
      webglWith: 1000,
      webglHeight: 600
    }
  },
  created() {
    window.toVueWebgl = (action) => {
      action && this.sendWebglMessage('{}', '第二次发送JSON数据')
    }
  },
  mounted() {
    window.ReportReady = () => {
      this.sendWebglMessage('1', '第一次发送内容标识')
    }
  },
  methods: {
    listenWebglProgress(instance, progress) {
      this.is_loading = true
      if (progress === 1) {
        this.is_loading = false
      }
    },
    sendWebglMessage(message, info) {
      console.log(info)
      this.$refs.vueUnityWebgl.message('JsTalker', 'toUnityWebgl', message)
    }
  }
}
</script>
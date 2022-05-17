<template>
  <div class="webgl-content">
    <div
        id="unity-container"
        :style="{
				width: width + 'px',
				height: height + 'px'
			}"
    ></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: "vue-unity-webgl",
  props: ['width', 'height', 'config', 'unityLoader', 'onProgress'],
  data() {
    return {
      instance: null,
      loaded: false
    }
  },
  beforeMount() {
    if (!this.eventBus) {
      this.eventBus = new Vue({
        data: {
          ready: false,
          load: false
        }
      })
    }
    if (typeof UnityLoader === 'undefined' && !this.eventBus.load) {
      const script = document.createElement('script')
      script.setAttribute('id', 'vue-unity-webgl-loader')
      script.setAttribute('src', this.unityLoader)
      script.setAttribute('async', '')
      script.setAttribute('defer', '')
      document.body.appendChild(script)
      script.addEventListener('load', () => {
        this.eventBus.ready = true
        this.eventBus.$emit('onload')
      })
    } else {
      this.eventBus.ready = true
    }
    this.eventBus.load = true
  },
  mounted() {
    const instantiate = () => {
      if (typeof UnityLoader === 'undefined') {
        return Promise.reject('UnityLoader 未定义')
      }
      if (!this.config) {
        return Promise.reject('config 未定义配置')
      }
      let params = {}
      params.onProgress = (instance, progress) => {
        this.onProgress && this.onProgress(instance, progress)
        this.loaded = progress === 1
      }
      if (this.module) {
        params.Module = this.module
      }
      // this.instance = UnityLoader.instantiate('unity-container', this.config, params)
    }
    if (this.eventBus.ready) {
      instantiate()
    } else {
      this.eventBus.$on('onload', () => {
        instantiate()
        this.$emit('onload')
      })
    }
  },
  methods: {
    message(object, method, params) {
      if (params === null) {
        params = ''
      }
      if (this.instance !== null) {
        this.instance.SendMessage(object, method, params)
      } else {
        return Promise.reject('vue-unity-webgl: 你给 Unity 发送的信息， 没有被接收到')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.webgl-content {
  border-radius: 5px;
  text-align: center;
}
#unity-container {
  display: inline-block;
  border-radius: 5px;
}
</style>
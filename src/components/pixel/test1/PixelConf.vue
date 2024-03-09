<template>
  <div>
    123
    <div :key="index" v-for="(show, index) in conf">
      <pixel-canvas @pixelsSize="18" @parames="parames" @conf="conf"></pixel-canvas>
    </div>
  </div>
</template>

<script>
import PixelCanvas from "@/components/pixel/index.vue";

export default {
  name: "PixelConf",
  components: {PixelCanvas},
  data() {
    return {
      parames: {},
      conf:'',
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.conf = this.getConf()
    },
    getConf() {
      return ''
    },
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <input type="file" @change="handleFileChange">
    <pixel-canvas :image="imageFile"></pixel-canvas>
  </div>
</template>

<script>
import PixelCanvas from "@/components/pixel/index.vue";

export default {
  name: "index",
  components: {PixelCanvas},
  data() {
    return {
      imageFile: null,
    }
  },
  methods: {
    handleFileChange(event) {
      this.imageFile = event.target.files[0];
    }
  }
}
</script>

<style scoped>

</style>
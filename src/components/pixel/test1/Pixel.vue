<template>
  <div class="pixel" :style="{ backgroundColor: color }" @click="handleClick" @contextmenu.prevent="handleRightClick"></div>
</template>

<script>
export default {
  props: ['color'],
  name: "Pixel",
  methods: {
    handleClick() {
      // 触发一个自定义事件，告诉父组件这个像素被点击了
      this.$emit('pixel-click');
    },
    handleRightClick() {
      // 触发一个自定义事件，告诉父组件这个像素被点击了
      this.$emit('pixel-right-click');
    }
  }
};
</script>

<style>
.pixel {
  width: 20px; /* 根据需要调整大小 */
  height: 20px;
  display: inline-block;
  margin: 1px; /* 为像素点之间添加间隙 */
  /* 可选，如果你想要为每个像素点也添加边框 */
  border: 1px solid #ccc;
}
</style>

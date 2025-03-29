<template>
  <div>
<!--    <header>这是头部</header>-->
    <div style="position: absolute;z-index: 9999" v-if="this.$route.name !== 'phone'">
      <!--返回按钮-->
      <button @click="goBack" icon="el-icon-back">返回</button>
      <br>
    </div>
    <router-view></router-view> <!-- 子路由会渲染在这里 -->
<!--    <footer>这是底部</footer>-->
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
    };
  },
  mounted() {
    document.addEventListener("gesturestart", this.preventZoom);
    document.addEventListener("gesturechange", this.preventZoom);
    document.addEventListener("touchmove", this.preventPinch, { passive: false });
  },
  beforeDestroy() {
    document.removeEventListener("gesturestart", this.preventZoom);
    document.removeEventListener("gesturechange", this.preventZoom);
    document.removeEventListener("touchmove", this.preventPinch);
  },
  methods: {
    preventZoom(event) {
      event.preventDefault();
    },
    preventPinch(event) {
      if (event.touches.length > 1) {
        event.preventDefault(); // 禁止双指缩放
      }
    },
    goBack() {
      window.history.back();
    }
  }
};
</script>
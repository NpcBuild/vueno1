<template>
  <div class="layout">
    <!-- 返回按钮（悬浮 + 玻璃拟态 + 动画） -->
    <button v-if="showBack" @click="goBack" class="back-btn">
      <span class="arrow">←</span>
    </button>

    <!-- 页面内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // 只有在 /phone/** 时才显示返回按钮
    showBack() {
      return this.$route.path.startsWith("/phone/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /*background: #f5f5f5;*/
  position: relative; /* 让返回按钮基于此定位 */
}

/* 返回按钮 - 玻璃拟态 + 悬浮效果 */
.back-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  /* 玻璃拟态效果 */
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  /* 过渡动画 */
  transition: all 0.2s ease-in-out;
}

/* 按钮悬浮时微妙放大 */
.back-btn:hover {
  transform: scale(1.1);
}

/* 按钮点击时缩小 + 透明度变化 */
.back-btn:active {
  transform: scale(0.9);
  opacity: 0.8;
}

/* 箭头图标 */
.arrow {
  font-size: 22px;
  font-weight: bold;
  background: linear-gradient(135deg, #ff7eb3, #ff758c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: transform 0.2s;
}

/* 页面内容 */
.content {
  flex: 1;
  overflow-y: auto;
}
</style>

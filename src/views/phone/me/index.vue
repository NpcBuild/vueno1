<template>
  <div class="personal-stats">
    <h1 class="title">我的个人属性</h1>

    <!-- 3D旋转人物 -->
    <div ref="threeContainer" class="three-container"></div>

    <!-- 属性展示 -->
    <div class="stats-container">
      <div v-for="(value, key) in stats" :key="key" class="stat-item">
        <span class="stat-name">{{ key }}</span>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: value + '%' }"></div>
        </div>
        <span class="stat-value">{{ value }}</span>
      </div>
    </div>

    <!-- 更新数据按钮 -->
    <button class="update-button" @click="randomizeStats">更新数据</button>
  </div>
</template>

<script>
import * as THREE from "three";

export default {
  data() {
    return {
      stats: {
        认知: 80,
        体能: 70,
        颜值: 85,
        情商: 75,
        创造力: 90,
      },
    };
  },
  mounted() {
    this.init3DModel();
  },
  methods: {
    // 初始化 3D 人物
    init3DModel() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
      camera.position.z = 3;

      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(200, 200);
      this.$refs.threeContainer.appendChild(renderer.domElement);

      // 创建简单的 3D 物体（替代人物模型）
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      // 旋转动画
      function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    },

    // 随机调整数据（模拟更新）
    randomizeStats() {
      this.stats = Object.fromEntries(
          Object.keys(this.stats).map((key) => [key, Math.floor(Math.random() * 100)])
      );
    },
  },
};
</script>

<style scoped>
.personal-stats {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #222, #444);
  color: #fff;
  height: 100vh;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.three-container {
  width: 200px;
  height: 200px;
  margin: 0 auto 20px;
}

.stats-container {
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
}

.stat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.stat-name {
  flex: 1;
  text-align: left;
  font-size: 16px;
}

.progress-bar {
  flex: 3;
  height: 10px;
  background: #555;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 10px;
}

.progress-fill {
  height: 100%;
  background: #4caf50;
  transition: width 0.3s ease;
}

.stat-value {
  flex: 1;
  text-align: right;
  font-size: 16px;
}

.update-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.update-button:hover {
  background: #45a049;
}
</style>

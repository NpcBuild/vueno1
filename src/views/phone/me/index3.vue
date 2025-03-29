<template>
  <div class="container">
    <div class="header">
      <h1>个人属性展示</h1>
      <button class="toggle-btn" @click="toggleView">切换视图</button>
    </div>
    <div class="content">
      <transition name="fade" mode="out-in">
        <div v-if="viewMode === 'progress'" class="progress-view" key="progress">
          <div v-for="(value, key) in attributes" :key="key" class="progress-item">
            <span class="label">{{ key }}</span>
            <div class="progress-bar">
              <div class="progress" :style="{ width: value + '%' }"></div>
            </div>
            <span class="value">{{ value }}%</span>
          </div>
        </div>
        <div v-else class="radar-view" key="radar">
          <canvas ref="radarCanvas" class="radar-canvas"></canvas>
        </div>
      </transition>
    </div>
    <div class="three-container">
      <canvas ref="threeCanvas" class="three-canvas"></canvas>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';
export default {
  data() {
    return {
      viewMode: 'progress',
      attributes: {
        认知: 80,
        体能: 70,
        颜值: 90,
        社交: 60,
        创造力: 75
      }
    };
  },
  mounted() {
    this.initThree();
  },
  methods: {
    toggleView() {
      this.viewMode = this.viewMode === 'progress' ? 'radar' : 'progress';
    },
    initThree() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas: this.$refs.threeCanvas, alpha: true, antialias: true });
      renderer.setSize(300, 300);
      const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
      const material = new THREE.MeshStandardMaterial({ color: 0x0077ff, metalness: 0.7, roughness: 0.3 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const light = new THREE.PointLight(0xffffff, 1, 10);
      light.position.set(2, 2, 2);
      scene.add(light);

      camera.position.z = 2;
      function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 500px;
  margin: auto;
  text-align: center;
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid #ddd;
}
.toggle-btn {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #0077ff;
  transition: color 0.3s;
}
.toggle-btn:hover {
  color: #0055cc;
}
.content {
  margin-top: 20px;
}
.progress-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  padding: 5px;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
.progress-bar {
  flex: 1;
  height: 10px;
  background: #ddd;
  margin: 0 10px;
  border-radius: 5px;
  overflow: hidden;
}
.progress {
  height: 100%;
  background: linear-gradient(90deg, #0077ff, #00aaff);
  transition: width 0.5s ease-in-out;
}
.radar-canvas {
  width: 300px;
  height: 300px;
  margin: auto;
}
.three-container {
  margin-top: 20px;
}
.three-canvas {
  width: 300px;
  height: 300px;
  margin: auto;
  display: block;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
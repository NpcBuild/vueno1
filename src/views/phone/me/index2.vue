<template>
  <div id="app">
    <!-- 属性展示区域 -->
    <div class="attributes">
      <div class="attribute">
        <div class="name">认知</div>
        <div class="value">{{ attributes.cognition }}%</div>
      </div>
      <div class="attribute">
        <div class="name">体能</div>
        <div class="value">{{ attributes.physical }}</div>
      </div>
      <div class="attribute">
        <div class="name">颜值</div>
        <div class="value">{{ attributes.appearance }}</div>
      </div>
    </div>

    <!-- 3D Canvas 区域 -->
    <div ref="canvasContainer" class="canvas-container"></div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  data() {
    return {
      attributes: {
        cognition: 80,
        physical: 'A',
        appearance: 'B+',
      },
      scene: null,
      camera: null,
      renderer: null,
      model: null,
      rotationSpeed: 0.01,
    };
  },
  mounted() {
    this.initThreeJS();
  },
  methods: {
    initThreeJS() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // 创建场景
      this.scene = new THREE.Scene();

      // 创建相机
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.position.z = 5;

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      this.$refs.canvasContainer.appendChild(this.renderer.domElement);

      // 添加光源
      const light = new THREE.AmbientLight(0xffffff);
      this.scene.add(light);

      // 创建模型（示例立方体）
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
      this.model = new THREE.Mesh(geometry, material);
      this.scene.add(this.model);

      // 启动动画
      this.animate();
    },
    animate() {
      requestAnimationFrame(this.animate);

      // 模型旋转
      this.model.rotation.x += this.rotationSpeed;
      this.model.rotation.y += this.rotationSpeed;

      // 渲染场景
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style scoped>
/* 整体页面背景 */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #5e2a84, #9b1f69);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 页面容器 */
#app {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 属性展示栏 */
.attributes {
  position: absolute;
  top: 5%;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 10;
}

.attribute {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 10px 15px;
  margin: 0 15px;
  text-align: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.attribute:hover {
  transform: scale(1.05);
}

.attribute .name {
  font-size: 14px;
  margin-bottom: 5px;
}

.attribute .value {
  font-size: 18px;
  font-weight: bold;
}

/* 3D Canvas 区域 */
.canvas-container {
  width: 100%;
  height: 100%;
  background-color: #f2f2f2;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
export default {
  name: "model-3d",
  mounted() {
    this.init3DModel();
  },
  methods: {
    init3DModel() {
      const canvas = this.$refs.canvas;
      // 创建场景
      const scene = new THREE.Scene();
      // 创建相机
      const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
      camera.position.z = 5;

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({ canvas });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      // 添加平行光（DirectionalLight）
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 0xffffff为白色，1为光的强度
      directionalLight.position.set(0, 1, 0); // 设置光源的位置
      scene.add(directionalLight);

      // 添加环境光（AmbientLight）
      const ambientLight = new THREE.AmbientLight(0x404040); // 使用较暗的环境光，以避免完全黑暗的场景
      scene.add(ambientLight);

      // Use a GLTFLoader or FBXLoader to load the 3D model with animations
      const loader = new GLTFLoader();
      // const loader = new FBXLoader();
      loader.load(require('@/components/NPC/2.gltf'), (gltf) => {
        console.log(gltf, 'gltf')
        const model = gltf.scene;
        scene.add(model);

        // Center the model in the scene
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Get animation clips from the loaded model
        const mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        const animations = [];

        clips.forEach((clip) => {
          animations.push(mixer.clipAction(clip));
        });

        // Play animations
        animations.forEach((animation) => {
          animation.play();
        });

        // Add event listener for mouse clicks to trigger speech
        canvas.addEventListener('click', () => {
          this.speak('Hello, I am speaking!');
        });

        // Animation loop
        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);

          const delta = clock.getDelta();
          mixer.update(delta);

          renderer.render(scene, camera);
        };

        animate();
      });

      camera.position.z = 5;
    },
    speak(message) {
      // Implement speech functionality here, e.g., using Text-to-Speech APIs
      console.log(message);
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
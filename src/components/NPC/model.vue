<template>
  <div ref="canvasContainer">222</div>
</template>

<script>
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";

export default {
  name: "model",
  data() {
    return{
      scene: null,
      camera: null,
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const width = this.$refs.canvasContainer.clientWidth;
      const height = this.$refs.canvasContainer.clientHeight;
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      this.camera.lookAt(this.scene.position);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setClearColor(new THREE.Color("#f1f9fb"));
      renderer.shadowMap.enabled = true;
      // const textureLoader = new THREE.TextureLoader();
      this.$refs.canvasContainer.appendChild(renderer.domElement);

      const loader = new OBJLoader();
      loader.load('2.obj', (object) => {
        this.scene.add(object);
      });

      const light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(0, 0, 10);
      this.scene.add(light);

      this.camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(this.scene, this.camera);
      };

      animate();
    },
  },
}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
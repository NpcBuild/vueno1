<template>
  <div ref="container" @click="onClick" @mousedown="onMouseDown" @mouseup="onMouseUp" @mousemove="onMouseMove"></div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
export default {
  name: "modelClick",
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      model: null,
      rotationSpeed: 0.005, // 控制模型的旋转速度
    };
  },
  mounted() {
    this.initThree();
    this.loadModel();
    this.addLights();
    this.animate();
    console.log(111)
    this.init()
  },
  methods: {
    async init() {
      const { Configuration, OpenAIApi } = require("openai");
      const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        headers: headers, // 将设置的 User-Agent 添加到 Configuration
      };

      const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{"role": "system", "content": "You are a helpful assistant."}, {role: "user", content: "Hello world"}],
      });
      console.log(completion.data.choices[0].message);
    },
    initThree() {
      const container = this.$refs.container;

      // 初始化场景、相机和渲染器
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
      this.camera.position.set(0, 0, 5);
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(this.renderer.domElement);

      // 添加背景
      // eslint-disable-next-line no-unused-vars
      const backgroundTexture = new THREE.TextureLoader().load('/assets/video_cover.png');
      this.scene.background = backgroundTexture;


      // // 添加背景粒子系统
      // const particleCount = 1000;
      // const particles = new THREE.Geometry();
      // const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
      //
      // for (let i = 0; i < particleCount; i++) {
      //   const x = Math.random() * 100 - 50;
      //   const y = Math.random() * 100 - 50;
      //   const z = Math.random() * 100 - 50;
      //   const particle = new THREE.Vector3(x, y, z);
      //   particles.vertices.push(particle);
      // }
      //
      // const particleSystem = new THREE.Points(particles, particleMaterial);
      // this.scene.add(particleSystem);

      // 创建OrbitControls实例，用于手动控制相机
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.update();

      // 添加窗口大小变化监听，保持渲染器尺寸和容器一致
      window.addEventListener('resize', this.onWindowResize);
    },
    loadModel() {
      const loader = new GLTFLoader();

      let mixer; // 用于管理动画的AnimationMixer

      // 加载模型文件
      loader.load(require('@/components/3D/man/scene.gltf'), (gltf) => {
      // loader.load(require('@/components/3D/women/scene.gltf'), (gltf) => {
      // loader.load(require('@/components/3D/men/scene.gltf'), (gltf) => {
        this.model = gltf.scene;
        this.scene.add(this.model);
        // 在这里可以设置模型的位置和缩放
        this.model.position.set(0, 1, 0);
        this.model.scale.set(1, 1, 1);

        // 获取模型的动画数据
        const animations = gltf.animations;
        // 创建AnimationMixer并将模型添加到其中
        mixer = new THREE.AnimationMixer(this.model);
        // 创建AnimationAction并将动画数据添加到mixer中
        const action = mixer.clipAction(animations[0]); // 假设第一个动画为待播放的动作
        action.play(); // 播放动画
      });
    },
    addLights() {
      // 添加环境光（AmbientLight）
      const ambientLight = new THREE.AmbientLight(0x0c0c0c, 1);
      // const ambientLight = new THREE.AmbientLight(0xc7e0f4, 1);
      this.scene.add(ambientLight);

      // 添加平行光（DirectionalLight）
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);// 0xffffff为白色，5为光的强度
      directionalLight.position.set(1, 2, 1);// 设置光源的位置
      this.scene.add(directionalLight);
      const directionalLight2 = new THREE.DirectionalLight(0xeeeeee, 1);// 0xffffff为白色，5为光的强度
      directionalLight2.position.set(-1, 2, -1);// 设置光源的位置
      this.scene.add(directionalLight2);
    },
    animate() {
      requestAnimationFrame(this.animate);
      // this.rotateModel(); // 添加自动旋转功能
      this.renderScene();
    },
    renderScene() {
      this.renderer.render(this.scene, this.camera);
    },
    onWindowResize() {
      const container = this.$refs.container;
      this.camera.aspect = container.offsetWidth / container.offsetHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.offsetWidth, container.offsetHeight);
      this.renderScene();
    },
    // rotateModel() {
    //   if (this.model) {
    //     // 每帧更新模型的旋转角度
    //     this.model.rotation.y += this.rotationSpeed;
    //   }
    // },
    // 点击模型说话
    playSpeech() {
      console.log("speak")
    },
    onClick(event) {
      // 计算鼠标点击位置的标准设备坐标
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // 使用Raycaster检测鼠标点击
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, this.camera);

      // 获取点击的对象
      const intersects = raycaster.intersectObjects(this.scene.children, true);

      if (intersects.length > 0) {
        // 点击到模型时执行的交互逻辑
        const clickedObject = intersects[0].object;
        if (clickedObject === this.model) {
          // 点击模型后，触发模型的说话动作
          this.saySomething();
        }
      }
    },
    onMouseDown(event) {
      this.isDragging = true;
      this.previousX = event.clientX;
      this.previousY = event.clientY;
    },
    onMouseUp() {
      this.isDragging = false;
    },
    onMouseMove(event) {
      if (this.isDragging) {
        const deltaX = event.clientX - this.previousX;
        const deltaY = event.clientY - this.previousY;

        // 在这里根据deltaX和deltaY的值来旋转模型
        this.rotateModel(deltaX, deltaY);

        this.previousX = event.clientX;
        this.previousY = event.clientY;
      }
    },
    // eslint-disable-next-line no-unused-vars
    rotateModel(deltaX, deltaY) {
      // 在这里实现旋转模型的逻辑
      // 例如，使用Three.js中的旋转方法来旋转模型
      // console.log(deltaX, deltaY)
    },
    saySomething() {
      // 在这里实现模型的说话逻辑
      console.log('Model says: Hello!');
    },
  },
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
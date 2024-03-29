<template>
  <div id="import-template">
    <!-- 放性能监测的容器 -->
    <div id="stats"></div>
    <!-- 3D模型容器 -->
    <div id="container"></div>
  </div>
</template>

<script>
// import '@/utils/ThreeBSP.js' // 不可以这么引
import * as THREE from 'three'
import * as Stats from 'stats.js'
// import * as dat from 'dat.gui'
import OrbitControls from 'three-orbitcontrols'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
const $ = name => document.querySelector(name)

export default {
  data() {
    return {
      scene: null, // 场景
      camera: null, // 照相机
      renderer: null, // 渲染器
      mesh: null, // 网格
      textureLoader: null, // 纹理加载器
      mixer: null,
      groupBox: null,
      stats: null, // 性能监测
      control: null, // 相机控件
      publicPath: process.env.BASE_URL,
      clearAnim: null,
      clock: null
    }
  },
  created() {
    // this.init()
  },
  mounted() {
    this.init()
  },
  destroyed() {
    cancelAnimationFrame(this.clearAnim)  // 清除requestAnimationFrame
    this.renderer.domElement.removeEventListener('click', this.modelMouseClick, false)
    this.scene = null, // 场景
        this.camera = null, // 照相机
        this.renderer = null, // 渲染器
        this.mesh = null, // 网格
        this.textureLoader = null, // 纹理加载器
        this.mixer = null,
        this.groupBox = null,
        this.stats = null, // 性能监测
        this.control = null, // 相机控件
        this.publicPath = process.env.BASE_URL,
        this.clock = null
  },
  methods: {
    //初始化
    init() {
      // 场景
      this.scene = new THREE.Scene();
      // 1.2 相机
      this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      // 设置摄像机位置,相机方向逆X轴方向，倾斜向下看
      this.camera.position.set(360, 360, 360);
      //this.camera.position.set(-20, 40 ,30)
      // 指向场景中心
      this.camera.lookAt(this.scene.position);
      // 1.3 渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      // 创建纹理加载器
      this.textureLoader = new THREE.TextureLoader();
      // 创建一个组合对象
      this.groupBox = new THREE.Group();
      // 添加坐标轴，辅助判断位置
      let axes = new THREE.AxesHelper(1000);
      this.scene.add(axes);
      // 设置环境
      this.renderer.setClearColor(new THREE.Color("#f1f9fb"));
      // 设置场景大小
      this.renderer.setSize(
          $('#container').getBoundingClientRect().width,
          $('#container').getBoundingClientRect().height
      );
      // 渲染器开启阴影效果
      this.renderer.shadowMap.enabled = true;
      // 点光源
      let point = new THREE.PointLight(0xffffff);
      point.position.set(500, 300, 400); // 点光源位置
      this.scene.add(point); // 点光源添加到场景中
      // 环境光
      let ambient = new THREE.AmbientLight(0x999999);
      this.scene.add(ambient);

      //创建性能监测
      this.stats = new Stats()
      this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
      this.stats.domElement.style.position = 'absolute'; //绝对坐标
      this.stats.domElement.style.left = '0px';// (0,0)px,左上角
      this.stats.domElement.style.top = '0px';
      $('#stats').appendChild(this.stats.domElement)

      // 渲染div到canvas
      $('#container').appendChild(this.renderer.domElement);

      debugger
      console.log(this.camera)
      console.log(this.renderer.domElement)
      //创建相机控件
      this.control = new OrbitControls(this.camera, this.renderer.domElement)
      this.control.enableDamping = true
      // 动态阻尼系数 就是鼠标拖拽旋转灵敏度，阻尼越小越灵敏
      this.control.dampingFactor = 0.5;
      // 是否可以缩放
      this.control.enableZoom = true;
      // 是否自动旋转
      this.control.autoRotate = false;
      // 设置相机距离原点的最近距离
      this.control.minDistance = 20;
      // 设置相机距离原点的最远距离
      this.control.maxDistance = 1000;
      // 是否开启右键拖拽
      this.control.enablePan = true;
      // 上下翻转的最大角度
      this.control.maxPolarAngle = 1.5;
      // 上下翻转的最小角度
      this.control.minPolarAngle = 0.0;
      // 是否可以旋转
      this.enableRotate = true;
      this.loadGlbModel(); // 加载 glb、gltf模型
      // this.loadFbxModel() // 加载 FBX 模型
      // this.loadJsonModel() // 加载 json 模型
      // this.createMaterial() // 创建材质
      // 最后进行渲染
      this.render()
    },
    // 最后的渲染
    render() {
      let animate = () => {
        //循环调用函数
        this.clearAnim = requestAnimationFrame(animate)
        //更新相机控件
        this.control.update()
        // 更新性能插件
        this.stats.update()
        //渲染界面
        this.renderer.render(this.scene, this.camera)
      }
      animate()
      //  为模型绑定点击事件
      this.renderer.domElement.addEventListener('click', this.modelMouseClick, false)
    },
    // 创建材质
    createMaterial() {
      // 创建三维用到的材质
      /**
       *
       * MeshBasicMaterial: 网格基础材质
       * MeshDepthMaterial: 网格深度材质
       * MeshNormalMaterial: 网格法向材质
       * MeshLambertMaterial: 网格Lambert 材质
       * MeshPhongMaterial: 网格 Phong式材质
       * MeshStandardMaterial: 网格标准材质
       * MeshPhysicalMaterial: 网格物理材质
       * MeshToonMaterial: 网格卡通材质
       * ShadowMaterial: 阴影材质
       * ShaderMaterial: 着色器材质
       * LineBasicMaterial: 直线基础材质
       * LineDashMaterial: 虚线材质
       */
          // 外墙
      let wallMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });
      let wallGeo = new THREE.BoxGeometry(439 + 2 + 2, 120, 376.5 + 2 + 2); // 创建几何体
      let wallMesh = new THREE.Mesh(wallGeo, wallMaterial);
      wallMesh.position.set(0, 60, 0); //(0, 60, -14.95);
      this.scene.add(wallMesh)
      // 内墙
      let wallInnerMaterial = new THREE.MeshLambertMaterial({
        color: 0x2d1bff,
      });
      let wallInnerGeo = new THREE.BoxGeometry(439, 120, 376.5); //(270, 120, 390);
      let wallInnerMesh = new THREE.Mesh(wallInnerGeo, wallInnerMaterial);
      wallInnerMesh.position.set(0, 60, 0); //(0, 60, -14.95);
      this.scene.add(wallInnerMesh)
      // 门
      let doorTexture = this.textureLoader.load(
          // require("../../../../assets/img/1.png") // 暂时注掉
      );
      let boxTextureMaterial = new THREE.MeshStandardMaterial({
        map: doorTexture,
        metalness: 0.2,
        roughness: 0.07,
        side: THREE.DoubleSide,
      });
      //let doorInnerMaterial = new THREE.MeshLambertMaterial({color: 0x2D1BFF});
      let doorGeo = new THREE.BoxGeometry(2, 80, 74.5);
      let doorMesh = new THREE.Mesh(doorGeo, boxTextureMaterial);
      doorMesh.position.set(-220.5, 40, 0);
      this.scene.add(doorMesh);

      /**
       *  threeBSP - 引用还有问题
       */
      // //转BSP
      // let wallBSP = new ThreeBSP(wallMesh);
      // let wallInnerBSP = new ThreeBSP(wallInnerMesh);
      // let doorBSP = new ThreeBSP(doorMesh);
      // // let window1BSP = new ThreeBSP(this.createWindowRight());
      // //let window2BSP = new ThreeBSP(this.createWindowRight());// createWindowLeft
      // let wallResultBSP = wallBSP.subtract(wallInnerBSP);
      // wallResultBSP = wallResultBSP.subtract(doorBSP);
      // // wallResultBSP = wallResultBSP.subtract(window1BSP);
      // //wallResultBSP = wallResultBSP.subtract(window2BSP);
      // let wallResultMesh = wallResultBSP.toMesh();

      // //转换后的Mesh配置属性
      // let wallTexture = this.textureLoader.load(require("../../../../assets/img/3.jpg")); // 暂时注掉
      // let wallTextureMaterial = new THREE.MeshStandardMaterial({
      //   map: wallTexture,
      //   metalness: 0.2,
      //   roughness: 0.07,
      //   side: THREE.DoubleSide,
      // });
      // let wallInnerTexture = this.textureLoader.load(
      //   require("../../../../assets/img/6.jpg") // 暂时注掉
      // );
      // let wallInnerTextureMaterial = new THREE.MeshStandardMaterial({
      //   map: wallInnerTexture,
      //   metalness: 0.2,
      //   roughness: 0.07,
      //   side: THREE.DoubleSide,
      // });
      // let wallResultMeshMaterial = [];
      // wallResultMeshMaterial.push(wallTextureMaterial);
      // wallResultMeshMaterial.push(wallInnerTextureMaterial);
      // //wallResultMeshMaterial.push(boxTextureMaterial);
      // wallResultMesh.material = wallResultMeshMaterial;

      // // console.log(wallResultMesh.geometry.faces, 112233);
      // wallResultMesh.geometry.faces.forEach((item, i) => {
      //   if (i < 160) {
      //     item.materialIndex = 0;
      //   } else {
      //     item.materialIndex = 1;
      //   }
      // });

      // wallResultMesh.geometry.computeFaceNormals();
      // wallResultMesh.geometry.computeVertexNormals();
      // //添加结果到场景中
      // this.scene.add(wallResultMesh);
    },
    // 加载 GLTF 模型
    loadGlbModel() {
      const loader = new GLTFLoader()
      // const dracoLoader = new DRACOLoader()
      // dracoLoader.setDecoderPath('/draco/')
      // dracoLoader.preload()
      // loader.setDRACOLoader(dracoLoader)
      // loader.load(`${this.publicPath}model/12OJJ6MOWT722N61Z5N92KA9C.glb`, (gltf) => {
      loader.load(`2.gltf`, (gltf) => {
        console.log(gltf, 'gltf----->>>')
        gltf.scene.scale.set(100,100,100)  //  设置模型大小缩放
        gltf.scene.position.set(0,0,0)
        let axis = new THREE.Vector3(0,1,0);//向量axis
        gltf.scene.rotateOnAxis(axis,Math.PI/2);
        //绕axis轴逆旋转π/16
        gltf.scene.rotateOnAxis(axis,Math.PI/-20);
        gltf.scene.rotateOnAxis(axis,Math.PI/50);
        // gltf.rotateY(Math.PI / 2);
        // this.groupBox.add(gltf);
        this.scene.add(gltf.scene)
      }, (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      }, (error) => {
        console.error(error)
      })
    },
    //  加载 FBX 模型
    loadFbxModel() {
      const loader = new FBXLoader();
      // loader.load(`${this.publicPath}model/glbxz.com6031.FBX`, object => {//加载路径fbx文件
      loader.load(`1.FBX`, object => {//加载路径fbx文件
        console.log(object, 'object----->>>')
        object.traverse( child => {
          if ( child.isMesh ){
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        this.scene.add(object);//模型
      })
    },
    //加载 JSON格式 模型
    loadJsonModel() {
      //设置相机位置
      this.camera.position.z = 130
      this.camera.position.y = 80
      const loader = new THREE.ObjectLoader()
      loader.load(`${this.publicPath}model/xxxx.json`, json => {
        //处理加载模型为黑色问题
        json.traverse(child => {
          if (child.isMesh) {
            child.material.emissive = child.material.color
            child.material.emissiveMap = child.material.map
          }
        })
        // this.scene.add(group)
      }, xhr => {
        // called while loading is progressing
        console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
      }, error => {
        // called when loading has errors
        console.error('An error happened', error);
      })
    },
    // 模型的点击事件
    modelMouseClick( event ) {
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.scene.children);
      // 根据它来判断点击的什么，length为0即没有点击到模型
      console.log(intersects, 'intersects----->>>')
    }
  }
}
</script>
<style scoped>
#import-template {
  width: 100%;
  height: 100%;
}
#stats {
  width: 100%;
  height: 50px;
  position: relative;
}
#container {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
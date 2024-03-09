<template>
  <div>
    <div @click="goto(1)">像素画</div>
    <div @click="goto(2)">自定义像素</div>
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: "PixelCanvas",
  props: {
    image: File,
    video: HTMLVideoElement,
    pixelSize: {
      type: Number,
      default: 10 // 每个像素块的大小
    }
  },
  data() {
    return {
      show: false,
      context: null,
      canvasWidth: 600,
      canvasHeight: 800
    };
  },
  mounted() {
    this.setupCanvas();
    // window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    image: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.loadAndDrawImage(newVal);
        }
      }
    },
    video: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.drawVideo(newVal);
        }
      }
    }
  },
  methods: {
    goto(type) {
      if (type === 1) this.$router.push("/pixelCanvas");
      if (type === 2) this.$router.push("/pixelConf");
    },
    setupCanvas() {
      const canvas = this.$refs.canvas;
      this.context = canvas.getContext('2d');
    },
    loadAndDrawImage(imageFile) {
      const img = new Image();
      img.onload = () => {
        this.drawImage(img);
        // this.setCanvasSize(img.naturalWidth, img.naturalHeight);
      };
      img.onerror = () => {
        console.error("无法加载图像");
      };
      img.src = URL.createObjectURL(imageFile);
    },
    // 调用后图像就不显示了
    setCanvasSize(imgWidth, imgHeight) {
      // 保持原始的canvas宽高比例
      let canvasMaxWidth = this.canvasWidth;
      let canvasMaxHeight = this.canvasHeight;

      // 根据图像的比例调整canvas的宽度或高度
      if (imgWidth > imgHeight) {
        // 图像是横向的
        this.canvasHeight = canvasMaxHeight;
        this.canvasWidth = imgWidth * (canvasMaxHeight / imgHeight);
      } else {
        // 图像是纵向的或正方形
        this.canvasWidth = canvasMaxWidth;
        this.canvasHeight = imgHeight * (canvasMaxWidth / imgWidth);
      }
    },

    // 精度高
    // drawImage(img) {
    //   // 根据pixelSize调整图像
    //   for (let y = 0; y < this.canvasHeight; y += this.pixelSize) {
    //     for (let x = 0; x < this.canvasWidth; x += this.pixelSize) {
    //       this.context.drawImage(img, x, y, this.pixelSize, this.pixelSize, x, y, this.pixelSize, this.pixelSize);
    //     }
    //   }
    // },
    // 精度中
    drawImage(img) {
      // 清除之前的内容
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

      // 计算每个像素块的大小
      const pixelBlockWidth = this.canvasWidth / img.naturalWidth;
      const pixelBlockHeight = this.canvasHeight / img.naturalHeight;

      // 逐像素绘制放大的像素块
      for (let y = 0; y < img.naturalHeight; y++) {
        for (let x = 0; x < img.naturalWidth; x++) {
          // 获取原始像素的颜色
          this.context.drawImage(img, x, y, 1, 1, x * pixelBlockWidth, y * pixelBlockHeight, pixelBlockWidth, pixelBlockHeight);
        }
      }
    },
    drawVideo(videoElement) {
      const draw = () => {
        if (!videoElement.paused && !videoElement.ended) {
          this.drawImage(videoElement);
          requestAnimationFrame(draw);
        }
      };
      draw();
    },
    handleResize() {
      console.log('handleResize执行')
      if (this.height && this.width) {
        this.canvasWidth = this.$refs.canvas.offsetWidth;
        this.canvasHeight = this.canvasWidth * (this.height / this.width);
      } else {
        console.error('宽度或高度未定义')
      }

    }
  }
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: auto;
}
</style>
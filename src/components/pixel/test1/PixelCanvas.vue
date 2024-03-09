<template>
  <div class="pixel-canvas" @mousemove="handleMouseMove">
    <el-button @click="changeEdit">{{toolBar}}</el-button>
    <el-button @click="reset">重置</el-button>
    <div class="color-picker" v-if="edit">
      <input type="color" v-model="currentColor" />
    </div>
    <div v-for="(row, rowIndex) in pixels" :key="`row-${rowIndex}`" class="pixel-row" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave">
      <pixel v-for="(color, colIndex) in row"
             class="pixel"
             :key="`col-${colIndex}`"
             :color="color"
             :data-row-index="rowIndex"
             :data-col-index="colIndex"
             @pixel-click="() => setColor(rowIndex, colIndex)"
             @pixel-right-click="onRightClick(rowIndex, colIndex)">
      </pixel>
    </div>
    <el-button @click="savePixel">保存</el-button>
    <div :key="index" v-for="(pixel, index) in historyPixel">
      <div @click="changeView(pixel.content)">{{index}}.历史像素:{{pixel.id}}</div>
    </div>
  </div>
</template>

<script>
import Pixel from './Pixel.vue';

export default {
  components: {
    Pixel
  },
  props: {
    // 像素数量
    pixelsSize: {
      type: Number,
      default: 32,
    },
    // 颜色控制
    parames: {
      type: Object,
      default: () => ({}),
    },
    // 颜色控制
    conf: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      edit: false, // 是否编辑模式
      isDragging: false, // 是否正在拖动
      drawTimeout: null,
      toolBar: '编辑', // 工具栏
      pixels: this.createPixels(this.pixelsSize, this.pixelsSize), // 创建32x32的像素数组
      defaultCol: '#FFFFFF',
      currentColor: '#FFFFFF',
      historyPixel: [],
    };
  },
  mounted() {
    this.initList()
  },
  methods: {
    initList() {
      this.getRequest('/corpus/getCorpusList',{tag: '9'}).then(res => {
        console.log(res.data.records)
        this.historyPixel = res.data.records
        this.$message.success(res.data.message)
      })
    },
    changeView(content) {
      this.pixels = this.reconstructPixelCanvas(content)
    },
    createPixels(rows, cols) {
      const pixels = [];
      for (let i = 0; i < rows; i++) {
        pixels[i] = [];
        for (let j = 0; j < cols; j++) {
          pixels[i][j] = this.defaultCol; // 初始颜色设置为白色
          // pixels[i][j] = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        }
      }
      return pixels;
    },
    initPixek(col) {
      return Array(this.pixelsSize).fill().map(() => Array(this.pixelsSize).fill(col)); // 默认填充透明 this.defaultCol
    },
    savePixel() {
      // const serializedData = JSON.stringify(this.pixels);
      const serializedData = this.compressPixelCanvas();
      const str = JSON.stringify(serializedData);
      console.log('保存：',str)
      this.postRequest('/share',{url: str}).then(res => {
        this.$message.success(res)
      })
      // this.pixels = this.reconstructPixelCanvas(str)
    },
    // 压缩画布数据
    compressPixelCanvas() {
      const colorMap = {};

      // 遍历像素画布
      this.pixels.forEach((row, rowIndex) => {
        row.forEach((color, colIndex) => {
          if (color) {
            // 如果该颜色第一次出现，则创建新数组
            if (!colorMap[color]) {
              colorMap[color] = [];
            }
            // 添加当前像素的位置
            colorMap[color].push(`${rowIndex},${colIndex}`);
          }
        });
      });

      return colorMap;
    },
    // 解压缩画布数据
    reconstructPixelCanvas(optData) {
      // optData = '{"#00fac8":["8,10","8,11","8,12","8,13","8,14","8,15","8,16","8,17","8,18","8,19","9,10","9,19","10,10","10,19","11,10","11,19","12,10","12,19","13,10","13,19","14,10","14,19","15,7","15,8","15,9","15,10","15,17","15,18","15,19","16,7","16,8","16,9","16,10","16,17","16,18","16,19"]}'
      this.pixels = this.createPixels(this.pixelsSize, this.pixelsSize)
      const pixels = this.initPixek()
      const show = JSON.parse(optData)
      for (const [color, positions] of Object.entries(show)) {
        positions.forEach(pos => {
          const [row, col] = pos.split(',').map(Number);
          pixels[row][col] = color;
        });
      }
      return pixels;
    },
    handleMouseDown() {
      this.isDragging = true;
      console.log('鼠标点击')
    },
    handleMouseUp() {
      this.isDragging = false;
      console.log('鼠标松开')
    },
    handleMouseLeave() {
      this.isDragging = false;
      console.log('鼠标离开')
    },
    handleMouseMove(event) {
      if (!this.drawTimeout) {
        this.drawTimeout = setTimeout(() => {
          this.draw(event)
          clearTimeout(this.drawTimeout)
          this.drawTimeout = null
        }, 50) // 调整节流时间来优化性能
      }
    },
    draw(event) {
      if (!this.isDragging) return;
      const pixel = event.target
      console.log('pixel', pixel.dataset)
      if (pixel && pixel.classList.contains('pixel')) {
        const rowIndex = parseInt(pixel.dataset.rowIndex, 10)
        const colIndex = parseInt(pixel.dataset.colIndex, 10)
        this.$set(this.pixels[rowIndex], colIndex, this.currentColor);
      }
    },
    changeEdit() {
      this.edit = !this.edit;
      this.toolBar = this.edit?'关闭':'编辑';
    },
    reset() {
      this.pixels = this.initPixek()
    },
    setColor(rowIndex, colIndex) {
      console.log(rowIndex, colIndex)
      this.$set(this.pixels[rowIndex], colIndex, this.currentColor);
    },
    onRightClick(rowIndex, colIndex) {
      console.log('右键')
      // 处理右键事件 清空
      this.$set(this.pixels[rowIndex], colIndex, undefined);
      // 你可以在这里添加你的逻辑
    }
  }
};
</script>

<style>
.pixel-canvas {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.color-picker {
  width: 8vw;
  margin-top: 10px;
  margin-bottom: 10px;
}
.pixel-row {
  display: flex;
}
.pixel {
  width: 20px; /* 根据需要调整大小 */
  height: 20px;
  display: inline-block;
}
</style>

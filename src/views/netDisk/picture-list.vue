<template>
  <div id="app">
    <div :key="i" v-for="(column,i) of columns" :id="column.id" class="column">
      <img :key="j" v-for="(src,j) of column.imgs" :src="src" @click="imgDetail(src)"/>
    </div>
  </div>
</template>

<script>
import {autoScroll, randomNumber, throttle2} from "@/utils/yMethods";

const path = './rem', quantity = 300
export default {
  name: "picture-list",
  data() {
    return {
      loading: false, // 用于控制是否正在加载新图片
      columns: [
        { id: "column-1", element: null, imgs: [] },
        { id: "column-2", element: null, imgs: [] },
        { id: "column-3", element: null, imgs: [] },
        { id: "column-4", element: null, imgs: [] },
        { id: "column-5", element: null, imgs: [] },
      ],
      params: {
        bgColor: "#91bef0",
        speed: 10,
      },
    }
  },
  created(){
    this.init()
  },
  mounted() {
    this.columns.forEach(c => c.element = document.getElementById(c.id));
    this.load()

    window.addEventListener('scroll', throttle2(() => {
      let dscrollTop = document.body.scrollTop || document.documentElement.scrollTop
      //scrollTop滚出顶部高度 offsetHight 网页内容高度innerHight可视区域高度
      if (document.documentElement.offsetHeight <= (dscrollTop + window.innerHeight + 300)) {
        this.load()
      }
    }, 300))
  },
  setup() { },
  watch: {
    // 'params.bgColor': {
    //   immediate: true,
    //   handler(bgColor) {
    //     document.body.style.backgroundColor = bgColor;
    //   },
    // },
    'params.speed': {
      immediate: true,
      handler(speed) {
        autoScroll(speed)
      },
    },
  },
  methods:{
    init() {
      console.log('初始化')
      // 监听wallpaper的参数变化
      window.wallpaperPropertyListener = {
        applyUserProperties: (properties) => {
          // eslint-disable-next-line no-unused-vars
          const { bgcolor: bgColor, speed1: speed } = properties
          // if (bgColor) {
          //   this.params.bgColor = 'rgb(' + bgColor.value.split(' ').map(c => Math.ceil(c * 255)) + ')';
          // }
          if (speed) {
            this.params.speed = Number.parseInt(speed.value)
          }
        },
      };
    },
    load() {
      if (this.loading) return; // 如果正在加载，则直接返回

      this.loading = true; // 开始加载
      this.createImg(0, this.randomOrder())
    },
    createImg(i, list) {
      if (i < list.length) {
        this.getNextColumn().imgs.push(`${path}/${list[i]}.jpg`)
        this.$nextTick(() => {
          setTimeout(() => {
            this.createImg(i + 1, list);
            if (i === list.length - 1) {
              this.loading = false; // 加载完成后重置 loading 状态
            }
          }, 10);
        });
      }
    },
    /** 随机生成300张图片的顺序 */
    randomOrder() {
      let array = [...new Array(quantity)].map((_v, i) => i + 1)
      let newArray = []
      for (let i = 0; i < quantity; i++) {
        let index = randomNumber(0, array.length - 1)
        newArray.push(array.splice(index, 1)[0])
      }
      return newArray
    },
    /** 获取高度最小的列 */
    getNextColumn() {
      let column = this.columns[0]
      for (let i = 1; i <= 4; i++) {
        let item = this.columns[i]
        if (item.element.offsetHeight < column.element.offsetHeight) {
          column = item
        }
      }
      return column
    },
    imgDetail(url) {
      console.log(url)
      const preUrl = "C:/Users/NPC/IdeaProjects/mine/vueno1/public"
      const absolutePath = `${preUrl}/${url}`.replace('/./', '/'); // 拼接路径
      console.log(absolutePath)
      // var url = 'http://127.0.0.1:8080/file/test.txt'; //要预览文件的访问地址
      window.open('http://127.0.0.1:8012/onlinePreview?url='+encodeURIComponent(btoa(absolutePath)));
    },
  }
}
</script>

<style scoped>
* {
  border: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  background-color: #91bef0;
  overflow: hidden;
}

.column {
  display: inline-block;
  width: 20%;
  vertical-align: top;
  padding-right: 2px;
  font-size: 0;
}

.column:last-child {
  padding-right: 0;
}

.column img {
  width: 100%;
  margin-bottom: 2px;
  position: relative;
  animation: img-in 1s
}

@keyframes img-in {
  from {
    top: 100px;
    opacity: 0;
    transform: scale(0.4, 0.4);
  }
  to {
    top: 0;
    opacity: 1;
    transform: scale(1, 1);
  }
}
</style>
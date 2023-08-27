<template>
  <transition>
    <div ref="dragIcon"
         class="dragIcon"
         @mouseenter="onHover"
         @mouseleave="onLeave"

         @touchstart.stop="handleTouchStart"
         @touchmove.prevent.stop="handleTouchMove($event)"
         @touchend.stop="handleTouchEnd"
         :style="{left: left + 'px',top: top + 'px',width: localItemWidth + 'px',height: localItemHeight + 'px',backgroundImage: backgroundImages ,backgroundSize: 'cover'}"
         v-text="text"
         @click="click"
         v-if="isShow">
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '球'
    },
    click: {
      type: Function,
      default: function () {console.log("点击了悬浮球")}
    },
    itemWidth: {
      type: Number,
      default: 50
    },
    itemHeight: {
      type: Number,
      default: 50
    }
  },
  data(){
    return{
      left: 0,
      top: 0,
      startToMove: false,
      isShow: true,
      timer: null,
      currentTop: null,
      clientW: document.documentElement.clientWidth,//视口宽
      clientH: document.documentElement.clientHeight,//视口高
      backgroundImages: 'url(' + require('@/assets/images/Leah.gif') + ')',

      localItemWidth: this.itemWidth,
      localItemHeight: this.itemHeight,
    }
  },
  created () {
    this.left = (this.clientW - this.itemWidth - 30)
    this.top = (this.clientH/2 - this.itemHeight/2)
    this.localItemWidth = this.itemWidth
    this.localItemHeight = this.itemHeight
  },
  mounted() {
    this.bindScrollEvent()
  },
  beforeDestroy() {
    // 记得销毁一些全局的的事件
    this.removeScrollEvent()
  },
  methods: {
    onHover() {
      this.localItemWidth = 150
      this.localItemHeight = 150
    },
    onLeave() {
      this.localItemWidth = 50
      this.localItemHeight = 50
    },
    handleTouchStart() {
      // eslint-disable-next-line no-debugger
      debugger
      this.startToMove = true
      this.$refs.dragIcon.style.transition = "none"
    },
    handleTouchMove(e) {
      // eslint-disable-next-line no-debugger
      debugger
      const clientX = e.targetTouches[0].clientX;//手指相对视口的x
      const clientY = e.targetTouches[0].clientY;//手指相对视口的y
      const isInScreen = clientX <= this.clientW && clientX >= 0 && clientY <= this.clientH && clientY >=0
      if(this.startToMove && e.targetTouches.length === 1) {
        if(isInScreen) {
          this.left = clientX - this.itemWidth/2
          this.top = clientY - this.itemHeight/2
        }
      }
    },
    handleTouchEnd() {
      if(this.left < (this.clientW / 2)) {
        this.left = 30;//不让贴边 所以设置30没设置0
        this.handleIconY()
      } else {
        this.left = this.clientW - this.itemWidth - 30;//不让贴边 所以减30
        this.handleIconY()
      }
      this.$refs.dragIcon.style.transition = "all .3s"
    },
    handleIconY() {
      if (this.top < 0) {
        this.top = 30;//不上帖上边所以设置为30 没设置0
      } else if(this.top + this.itemHeight > this.clientH) {
        this.top = this.clientH - this.itemHeight - 30;//不让帖下边所以减30
      }
    },
    bindScrollEvent() {
      window.addEventListener('scroll', this.handleScrollStart)
    },
    removeScrollEvent() {
      window.removeEventListener('scroll',this.handleScrollStart)
    },
    handleScrollStart() {
      // this.isShow = false
      // this.timer && clearTimeout(this.timer)
      // this.timer = setTimeout(() => {
      //   this.handleScrollEnd()
      // },300)
      // this.currentTop = document.documentElement.scrollTop || document.body.scrollTop
    },
    handleScrollEnd() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      // 判断是否停止滚动的条件
      if(this.scrollTop == this.currentTop) {
        this.isShow = true
      }
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
transition {
  border-radius: 50%;
  overflow: hidden;
  background-color: transparent !important;
}
.dragIcon {
  user-select: none;
  position: fixed;
  /*position: relative;*/
  width: 100%;
  height: 100%;
  /*padding: 3px;*/
  border-radius: 50%;
  line-height: 40px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  /*position: absolute;*/
  right: 0;
  top: 70%;
  background: deepskyblue;
  overflow: hidden;
  box-shadow: 0px 0px 10px 2px skyblue;
  padding: 1em;
}
.v-enter {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s;
}
</style>
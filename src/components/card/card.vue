<template>
  <section>
    <div ref="mySwiper" class="swiper-container" :id="currentIndex" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay" >
      <div class="swiper-wrapper">
        <div class="swiper-slide my-swiper-slide" v-for="(item,index) of slideList" :key="index">
          <div class="testimonialBox">
<!--              <img src="quote.png" class="quote">-->
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" class="quote">
            <div class="content">
              <p>{{item.content}}</p>
            </div>
            <div class="details">
              <div class="imgBx">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" class="quote">
              </div>
              <h3>语录<br><span>Creative Des</span></h3>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
      <!--导航器-->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script>
import Swiper from 'swiper';
import "swiper/css/swiper.css";
export default {
  name: "card",
  components: {
    // Swiper
  },
  props: ['slideList','currentIndex'],
  data() {
    return {
      mySwiper: null,
      //配置项例子
      options: {
        // loop: true,
        autoplay: {
          //swiper手动滑动之后自动轮播失效的解决方法,包括触碰，拖动，点击pagination,重新启动自动播放
          disableOnInteraction: false,
          // 自动播放时间：毫秒
          delay: 2000,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // bulletClass: "my-bullet",
        },
      },
    };
  },
  watch:{
    //slide数据发生变化时,更新swiper
    slideList:{
      deep:true,
      // eslint-disable-next-line
      handler(nv,ov){
        console.log("数据更新了")
        this.updateSwiper()
      }
    }
  },
  mounted() {
    this.initSwiper()
    // 监听键盘
    this.keyDown()
  },
  methods:{
    //鼠标移入暂停自动播放
    stopAutoPlay() {
      this.mySwiper.autoplay.stop()
    },
    //鼠标移出开始自动播放
    startAutoPlay() {
      // this.mySwiper.autoplay.start()
    },
    //初始化swiper
    initSwiper(){
      // eslint-disable-next-line
      let vueComponent=this//获取vue组件实例
      //一个页面有多个swiper实例时，为了不互相影响,绑定容器用不同值或变量绑定
      this.mySwiper = new Swiper('#'+this.currentIndex, {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        // slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        },
        // loop: true, // 循环模式选项
        autoHeight:'true',//开启自适应高度,容器高度由slide高度决定
        //分页器
        pagination: {
          el: '.swiper-pagination',
          clickable:true,//分页器按钮可点击
        },
        on: {
          //此处this为swiper实例
          //切换结束获取slide真实下标
          slideChangeTransitionEnd: function(){
            console.log(vueComponent.$props.currentIndex+"号swiper实例真实下标",this.realIndex)
          },
          //绑定点击事件,解决loop:true时事件丢失
          // eslint-disable-next-line
          click: function(event){
            console.log("你点击了"+vueComponent.$props.currentIndex+"号swiper组件")
          }
        },
        //导航器
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // autoplay: {
        //   //自动播放,不同版本配置方式不同
        //   delay: 3000,
        //   stopOnLastSlide: false,
        //   disableOnInteraction: false
        // },
        slidesPerView: 1.2, //视口展示slide数1
        slidesPerGroup: 1, //slide数1页一组
      })

    },
    //销毁swiper
    destroySwiper(){
      try {
        this.mySwiper.destroy(true,false)
      }catch (e) {
        console.log("删除轮播")
      }
    },
    //更新swiper
    updateSwiper(){
      this.destroySwiper()
      this.$nextTick(()=>{
        this.initSwiper()
      })
    },
    // 监听键盘
    keyDown() {
      document.onkeydown =  (e) => {
        //事件对象兼容
        let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        //左
        if (e1 && e1.keyCode == 37) {
          // 按下左箭头
          console.log('左')
          this.goToPrevSlide()
        } else if (e1 && e1.keyCode == 39) {
          // 按下右箭头
          console.log('右')
          this.goToNextSlide()
        }
      }
    },
    goToPrevSlide() {
      if (this.mySwiper) {
        this.mySwiper.slidePrev(); // 切换到前一个卡片
      }
    },
    goToNextSlide() {
      if (this.mySwiper) {
        this.mySwiper.slideNext(); // 切换到下一个卡片
      }
    },
  },
  destroyed() {
    this.destroySwiper()
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2196f3;
  overflow: hidden;
}
/*swiper容器样式*/
.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  /*border: 1px solid red;*/
}
.swiper-slide {
  background-size: cover;
  width: 320px;
  background: #d1ebff center;
  box-shadow: 0 15px 50px rgba(0,0,0,0.2);
  filter: blur(4px);
  border-radius: 10px;
}
.swiper-slide-active {
  filter: blur(0px);
  background: #ffff;
}
.testimonialBox {
  position: relative;
  width: 100%;
  padding: 40px;
  padding-top: 90px;
  //color: #999;
  .content {
    width: 100%;
    p {
      font-size: 20px;
      text-indent: 2em;
      word-break: break-all;
      word-wrap: break-word;
    }
  }
  .quote {
    position: absolute;
    top: 20px;
    right: 30px;
    //opacity: 0.2;
    height: 50px;
    width: auto;
  }
  .details {
    display: flex;
    align-items: center;
    margin-top: 20px;
    h3 {
      font-size: 16px;
      font-weight: 400;
      letter-spacing: 1px;
      color: #2196f3;
      line-height: 1.1em;
      span {
        font-size: 12px;
        color: #666;
      }
    }
    .imgBx {
      position: relative;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.swiper-container-3d {
  .swiper-slide-shadow-left,.swiper-slide-shadow-right {
    background-image: none;
  }
}

//.CarouselContainer{
//  background-color: gray;
//  width: 100%;
//}
/*!*slide样式*!*/
/*.my-swiper-slide{*/
/*  height: 300px;*/
/*  background-color: pink;*/
/*}*/
/*!*swiper容器样式*!*/
/*.swiper-container {*/
/*  width: 700px;*/
/*  border: 1px solid red;*/
/*}*/
/*!*自定义分页器按钮被点击选中时的样式*!*/
/*/deep/.swiper-pagination-bullet-active{*/
/*  background-color: #d5a72f !important;*/
/*  width: 20px;*/
/*}*/
/*!*自定义分页器按钮常规样式*!*/
/*/deep/.swiper-pagination-bullet{*/
/*  background-color: #9624bf;*/
/*  opacity: 1;*/
/*  width: 20px;*/
/*}*/
</style>
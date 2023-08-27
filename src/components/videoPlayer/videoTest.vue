<template>
  <div class="container">
    <div class="content">
      <div class="nav">
        <!-- 选项卡标题图片 挺垃圾的可以改为 :src="img" -->
        <ul class="tabs">
          <li @click="nowschool()" class="now">
            <img
                src="http://yikaojs.jymmy.cn/static/img/now2.png"
                alt=""
                class="activeone"
            />
            <img
                src="http://yikaojs.jymmy.cn/static/img/now.png"
                alt=""
                style="display: none"
                class="unactiveone"
            />
          </li>
          <li @click="allschool()" class="all">
            <img
                src="http://yikaojs.jymmy.cn/static/img/all.png"
                alt=""
                class="unactive"
            />
            <img
                src="http://yikaojs.jymmy.cn/static/img/all2.png"
                alt=""
                style="display: none"
                class="active"
            />
          </li>
        </ul>
        <!-- 选项卡内容 -->
        <div class="cards" style="background: white; height: 200px">
          <!-- 循环出多个小视频box -->
          <div class="tab-now tabcards" id="tabone" style="display: block">
            <div
                class="box"
                v-for="(item, index) in videos"
                :key="index"
                @click="getVideoDetail(index)"
            >
              <div class="video-small">
                <video-player
                    class="video-player-box"
                    ref="videoPlayer"
                    :options="videoConfig[index]"
                    :playsinline="true"
                ></video-player>
              </div>
              <div class="text">
                <div class="jigou">{{ item.mechanism }}</div>
                <div class="bottom">
                  <div class="name">{{ item.username }}</div>
                  <div class="time">{{ item.published_time | momentTime }}</div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-all tabcards" style="display: none">
            <div
                class="box"
                v-for="(item, index) in videos"
                :key="index"
                @click="getVideoDetail(index)"
            >
              <div class="video-small">
                <video-player
                    class="video-player-box"
                    ref="videoPlayer"
                    :options="videoConfig[index]"
                    :playsinline="true"
                ></video-player>
              </div>
              <div class="text">
                <div class="jigou">{{ item.mechanism }}</div>
                <div class="bottom">
                  <div class="name">{{ item.username }}</div>
                  <div class="time">{{ item.published_time | momentTime }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
              layout="prev, next"
              :total="totalCount"
              :page-size="8"
              :current-page="currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
        <!-- 弹窗 点击小视频弹出大视频及详情-->
        <div class="tan">
          <el-dialog :visible.sync="dialogFormVisible" @close="closeDialog">
            <div class="videoall">
              <div class="video-demo">
                <video-player
                    id="video"
                    class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"
                    :destroy-on-close="true"
                    style="width: 1004px; height: 435px"
                ></video-player>
              </div>
              <div class="textall">
                <div class="toptext">
                  <div class="name" style="color: #bbbbbb">
                    {{ pinlun.username }}
                  </div>
                  <div class="jigou1" style="color: #bbbbbb">
                    {{ pinlun.mechanism }}
                  </div>
                </div>
                <div class="heng"></div>
                <div class="text">
                  <div class="top">
                    <div class="image">
                      <img :src="pinlun.head_img" alt=""/>
                    </div>
                    <div class="top-right">
                      <div class="names">大毛子</div>
                      <div class="times" style="color: #bbbbbb">
                        {{ pinlun.dianpingtime | momentTimeFull }}
                      </div>
                    </div>
                  </div>
                  <div class="detail">
                    {{ pinlun.dptext }}
                  </div>
                </div>
              </div>
            </div>
            <!-- <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false"
                >确 定</el-button
              >
            </div> -->
          </el-dialog>
        </div>
      </div>
    </div>

<!--    &lt;!&ndash; 上传视频弹窗 &ndash;&gt;-->
<!--    <div class="tovideo">-->
<!--      <div-->
<!--          class="videobtn"-->
<!--          style="height: 100px; width: 100px"-->
<!--          @click="dialogVisible = true"-->
<!--      >-->
<!--        <img src="http://yikaojs.jymmy.cn/static/img/shipinsc.png" alt=""/>-->
<!--      </div>-->
<!--      <el-dialog :destroy-on-close="true" :visible.sync="dialogVisible">-->
<!--        <Comment ref="upload_dialog"></Comment>-->
<!--      </el-dialog>-->
<!--    </div>-->

<!--    <key></key>-->
<!--    <back :backData="backGo"></back>-->
  </div>
</template>

<script>
// import back from "./conmon/back";
// import key from './conmon/key'
// import Comment from './comment.vue'  //引入视频上传页面
import moment from 'moment'   //引入时间组件
export default {
  name: "videoTest",
  components: {
    // back,
    // key,
    // Comment //视频上传
  },
  data() {
    return {
      backGo: '',
      dialogFormVisible: false,  //弹窗初始化关闭
      currentPage: 1,   // 默认显示第几页
      totalCount: 0,// 总条数
      currentType: 1,
      PageSize: 8,  // 默认每页显示的条数
      videoConfig: [],
      pinlun: {},
      videos: [],
      //小视频 数据配置
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          src: '',  // ---路径为空方便动态赋值---
          type: 'video/mp4'  // 类型
        }],

        // poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      }
    }
  },
  mounted() {
    this.getData()
  },
  //过滤器
  filters: {
    momentTime(times) {
      return moment(times * 1000).format('YYYY-MM-DD')  //显示时间的格式
    },
    momentTimeFull(times) {
      return moment(times * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  methods: {
    //选项卡改变事件
    nowschool() {
      // alert(123)
      // eslint-disable-next-line no-undef
      $(".activeone").css("display", "block");
      // eslint-disable-next-line no-undef
      $(".unactiveone").css("display", "none");
      // eslint-disable-next-line no-undef
      $(".active").css("display", "none");
      // eslint-disable-next-line no-undef
      $(".unactive").css("display", "block");
      // eslint-disable-next-line no-undef
      $(".tab-now").css("display", "block");
      // eslint-disable-next-line no-undef
      $(".tab-all").css("display", "none");
      this.currentPage = 1;  //显示第一页
      this.currentType = 1;  //此页面标识为1
      this.getData(this.currentType, this.currentPage)
    },
    allschool() {
      // eslint-disable-next-line no-undef
      $(".active").css("display", "block");
      // eslint-disable-next-line no-undef
      $(".unactive").css("display", "none");
      // eslint-disable-next-line no-undef
      $(".activeone").css("display", "none");
      // eslint-disable-next-line no-undef
      $(".unactiveone").css("display", "block");
      // eslint-disable-next-line no-undef
      $(".tab-now").css("display", "none");
      // eslint-disable-next-line no-undef
      $(".tab-all").css("display", "block");
      this.currentPage = 1;
      this.currentType = 2;//此页面标识为2
      this.getData()
    },
    //关闭弹框的事件
    closeDialog() {
      this.$refs.videoPlayer.player.pause(); //视频暂停
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      console.log(val)
      // 改变每页显示的条数
      // this.PageSize = val
      // // 注意：在改变每页显示的条数时，要将页码显示到第一页
      // this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.getData()
      // 改变默认的页数的
      // this.currentPage = val
    },
    getData() {
      this.videos = []
      this.videoConfig = []
      var urll = ''
      var uuid = JSON.parse(sessionStorage.getItem('cache')).user.id
      var getdata = {}   //将页面中的数据传入 定义的空数组中 再传给后端
      //根据不同页面调用接口
      if (this.currentType === 1) {
        //当前校区
        urll = this.$api.pkapi + '后端接口'
        getdata['id'] = uuid
      } else if (this.currentType === 2) {
        //全国精选
        urll = this.$api.pkapi + '后端接口'
      }
      getdata['page'] = this.currentPage
      getdata['list_rows'] = this.PageSize
      this.postRequest('/netDisk/getusesize',{}).then(res => {
        if (res.data.code === 200) {
          this.videos = res.data.data.data  //获取总数据（包含视频数据）
          this.totalCount = res.data.data.total //获取总页数
          //处理视频配置 循环取出多个视频放入videoConfig数组中
          for (let i in this.videos) {
            this.videoConfig.push({
              autoplay: false, //如果true,浏览器准备好时开始回放。
              muted: true, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              controls: false,
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: 'zh-CN',
              aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: [{
                src: this.videos[i].video,  // 获取视频路径
                type: 'video/mp4'  // 类型
              }],

              // poster: "../../static/images/test.jpg", //你的封面地址
              // width: document.documentElement.clientWidth,
              notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                timeDivider: false,
                durationDisplay: false,
                remainingTimeDisplay: false,
                fullscreenToggle: false  //全屏按钮
              }
            })
          }
        }
      })
      this.$axios({
        url: urll,  //接口路径
        params: getdata, //参数集合
      })
          .then((res) => {
            console.log(res)
            console.log(res.data.code === 0)
            if (res.data.code === 1) {
              this.videos = res.data.data.data  //获取总数据（包含视频数据）
              this.totalCount = res.data.data.total //获取总页数
              //处理视频配置 循环取出多个视频放入videoConfig数组中
              for (let i in this.videos) {
                this.videoConfig.push({
                  autoplay: false, //如果true,浏览器准备好时开始回放。
                  muted: true, // 默认情况下将会消除任何音频。
                  loop: false, // 导致视频一结束就重新开始。
                  controls: false,
                  preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                  language: 'zh-CN',
                  aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                  fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                  sources: [{
                    src: this.videos[i].video,  // 获取视频路径
                    type: 'video/mp4'  // 类型
                  }],

                  // poster: "../../static/images/test.jpg", //你的封面地址
                  // width: document.documentElement.clientWidth,
                  notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                  controlBar: {
                    timeDivider: false,
                    durationDisplay: false,
                    remainingTimeDisplay: false,
                    fullscreenToggle: false  //全屏按钮
                  }
                })
              }
            }

          })
          .catch((err) => {
            console.log(err)
          })
    },
    //点击小视频获取对应的大视频数据
    getVideoDetail(index) {
      this.pinlun = {}
      this.dialogFormVisible = true
      var vid = this.videos[index].id
      this.$axios({
        url: this.$api.pkapi + '后端接口',
        params: {
          id: vid
        },
      })
          .then((res) => {
            console.log(res)
            console.log(res.data.code === 0)
            if (res.data.code === 1) {
              this.playerOptions.sources[0].src = res.data.data.video //获取后端视频路径动态赋值
              console.log(this.playerOptions.sources[0].src);

              this.pinlun = res.data.data   //获取弹窗中信息
            }

          })
          .catch((err) => {
            console.log(err)
          })
    }
  }
}
</script>

<style scoped>
.container {
  width: 1920px;
  height: 1080px;
  background: url("http://yikaojs.jymmy.cn/static/img/bei1.png");
  position: relative;
}
.content {
  width: 1720px;
  height: 829px;
  margin: auto;
  padding-top: 20px;

  position: relative;
  top: 20%;
  border-radius: 10px;
  background: rgba(255, 245, 245, 0.3);
}
.nav {
  width: 1680px;
  height: 794px;
  margin: auto;
  border-radius: 10px;
  background: #ffffff;
  /* position: relative; */
}
.tabs {
  width: 50%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  position: relative;
  top: -20%;
}
.tabcards {
  width: 90%;
  height: 640px;
  margin: -25px auto;
  /* background: chartreuse; */
  padding-left: 5px;
  z-index: 999999;
}
.box {
  height: 246px;
  width: 350px;
  border-radius: 10px;
  position: relative;
  float: left;
  margin: 30px 12px;
}
.video-small {
  height: 246px;
  width: 350px;
  background: rgba(29, 28, 28, 0.3);
  border-radius: 10px;
}
.video-small >>> .video-js {
  height: 246px;
  width: 360px;
  border-radius: 10px;
  background-color: transparent;
}
.video-small >>> .video-js .vjs-big-play-button {
  display: none;
}
.box > .text {
  width: 100%;
  height: 83px;
  background: rgba(0, 0, 0, 0.61);
  color: white;
  position: absolute;
  bottom: 0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.jigou {
  font-size: 20px;
  /* text-align: left; */
  margin-left: 38px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.bottom {
  display: flex;
  justify-content: space-around;
}
.name {
  font-size: 29px;
}
.time {
  margin-top: 12px;
  font-size: 18px;
}
.el-pagination {
  /* background: red; */
  /* color: #ffffff; */
  height: 50px;
  position: relative;
  top: 72px;
}

.el-pagination >>> .btn-prev {
  width: 70px;
  height: 70px;
  background: url("http://yikaojs.jymmy.cn/static/img/left.png");
  position: absolute;
  left: 15px;
  color: white;
}
.el-pagination >>> .btn-next {
  width: 70px;
  height: 70px;
  background: url("http://yikaojs.jymmy.cn/static/img/right1.png");
  position: absolute;
  right: 15px;
  color: white;
}
.el-pagination >>> .btn-prev:disabled {
  width: 70px;
  height: 70px;
  color: white;
  background: url("http://yikaojs.jymmy.cn/static/img/left1.png");
}
.el-pagination >>> .btn-next:disabled {
  width: 70px;
  height: 70px;
  color: white;
  background: url("http://yikaojs.jymmy.cn/static/img/right.png");
}
.tan {
  width: 1249px;
  height: 959px;
  /* background: greenyellow; */
}

.tan >>> .el-dialog {
  width: 1249px;
  height: 990px;
  /* margin: auto; */
  margin-top: 5% !important;
  background: url("http://yikaojs.jymmy.cn/static/img/tan2.png") no-repeat;
  background-size: 100% 100%;
  box-shadow: none;
}
/* 叉号 */
.tan >>> .el-dialog__headerbtn {
  height: 40px;
  width: 42px;
  background: url("http://yikaojs.jymmy.cn/static/img/cha.png") no-repeat;
  background-size: 100% 100%;
  margin: 15px;
}
.videoall {
  height: 850px;
  width: 1004px;
  margin: auto;
}
.video-demo {
  width: 1004px;
  height: 435px;
  margin: auto;
  border-radius: 10px;
}
.video-demo >>> .video-js .vjs-tech {
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 10px;
}
.textall {
  width: 100%;
  height: 330px;
  margin: auto;
  position: relative;
  top: 15%;
  /* background: tomato; */
}
.toptext {
  margin-bottom: 5px;
}
.jigou1 {
  color: white;
  font-size: 20px;
  /* margin: 1px 0; */
}
.heng {
  background: white;
  width: 100%;
  height: 2px;
  border-radius: 1px;
  opacity: 0.1;
  /* position:absolute;
  top: 34%; */
}
.text {
  height: 250px;
  width: 100%;
  /* background: turquoise; */
  margin-top: 15px;
}
.top {
  width: 30%;
  height: 85px;
  display: flex;
  justify-content: space-around;
}
.image {
  height: 85px;
  width: 94px;
}
.image > img {
  height: 85px;
  width: 94px;
}
.names {
  color: white;
  font-size: 29px;
  font-weight: bold;
}
.times {
  margin-top: 12px;
  font-size: 18px;
}
.detail {
  height: 155px;
  width: 86%;
  /* margin-top: 10px; */
  background: #23232e;
  border-radius: 10px;
  color: white;
  padding: 10px 20px;
  position: absolute;
  right: 0;
}
.container > .tovideo {
  position: absolute;
  right: -10px;
  top: 35%;
}
.tovideo >>> .el-dialog {
  width: 1249px;
  height: 809px;
  border-radius: 4px;
  background: url("http://yikaojs.jymmy.cn/static/img/tan.png") no-repeat;
  background-size: 100% 100%;
}
.tovideo >>> .el-dialog__headerbtn {
  height: 40px;
  width: 42px;
  background: url("http://yikaojs.jymmy.cn/static/img/cha.png") no-repeat;
  background-size: 100% 100%;
  margin: 15px;
}
</style>
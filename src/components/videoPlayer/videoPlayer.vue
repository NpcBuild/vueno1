<template>
  <el-dialog
      title="视频"
      :visible.sync="videoOpen"
      width="1600px"
      append-to-body
      @close="videoClose"
      class="video_box"
  >
    <!--视频窗口展示-->
    <div id="playWnd" class="playWnd">
      <videoPlayer
          class="vjs-custom-skin videoPlayer"
          ref="videoplayer"
          :playsinline="true"
          width="1600px"
          :options="playerOptions"
          customEventName="changed"
          style="object-fit:fill"
          :x5-video-player-fullscreen="true"

          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @statechanged="playerStateChanged($event)"
          @ready="playerReadied"
          @fullscreenchange="onFullscreenChange($event)"
          @click="fullScreen"
      >
      </videoPlayer>
    </div>
  </el-dialog>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import 'video.js/dist/video-js.css'
require('vue-video-player/src/custom-theme.css')
export default {
  name: "videoPlayers",
  components: {
    videoPlayer,
  },
  data() {
    return {
      videoOpen: true,
      playerOptions: {
        width: "1600px",
        height: "1200px",
        language: "zh-CN",
        muted: false,// 默认情况下将会消除任何音频
        autoplay: true,// 如果true,浏览器准备好时开始回放。
        controls: true, //不显示暂停、声音、进度条组件
        loop: true, // 视频一结束就重新开始。
        playbackRates : [ 0.5, 1.0, 1.5, 2.0 ], //可选择的播放速度
        preload : 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        aspectRatio : '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid : true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        notSupportedMessage : '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // width: document.documentElement.clientWidth,
        controlBar : {
          timeDivider : true,//当前时间和持续时间的分隔符
          durationDisplay : true,//显示持续时间
          remainingTimeDisplay : false,//是否显示剩余时间功能
          fullscreenToggle : true  //全屏按钮
        },
        poster : require('@/assets/video_cover.png'), //你的封面地址
        sources: [
          {
            type: "video/mp4",
            src: require('@/assets/video/痛苦度过一生.mp4') // url地址
          },
          {
            type: "video/mp4",
            src: require('@/assets/video/fuli.mp4') // url地址
          },
        ],
      },
    }
  },
  created() {
    // 进入页面加载获取后端传过来的视频路径进行播放
    // this.getMedia();
  },
  destroyed() {},
  methods: {
    //预览功能
    preview() {
      console.log("preview");
    },
    //停止全部预览功能
    stopAllPreview() {},
    //关闭视频窗口
    closeWindow() {},
    // 查看摄像
    videoChange() {
      this.videoOpen = true;
      //模拟摄像头预览
    },
    // 关闭摄像头弹窗
    videoClose() {
      this.videoOpen = false;
      this.closeWindow();
    },

    getMedia() {
      // 假定此临时变量为后端获取的路径
      let mediaPath = "D:/EXAM_MATERIAL/NEW-STAFF/VIDEO/B-0001/1/B-0001.mp4";
      // 处理路径，防止出现浏览器禁止访问问题
      mediaPath = mediaPath.replace("D:/EXAM_MATERIAL", "/EXAM_MATERIAL");
      let name = mediaPath.substring(mediaPath.lastIndexOf("/") + 1);
      this.mediaUrl =
          mediaPath.substring(0, mediaPath.lastIndexOf("/") + 1) +
          encodeURI(name);
      // 在视频控件设置视频路径
      this.playerOptions.sources[0].src = this.mediaUrl;
    },


    // 播放回调
    onPlayerPlay(player) {
      console.log('player play!', player)
    },

    // 暂停回调
    onPlayerPause(player) {
      console.log('player pause!', player)
    },

    // 视频播完回调
    onPlayerEnded(player) {
      console.log(player)
    },

    // DOM元素上的readyState更改导致播放停止
    onPlayerWaiting(player) {
      console.log(player)
    },

    // 已开始播放回调
    onPlayerPlaying(player) {
      console.log(player)
    },

    // 当播放器在当前播放位置下载数据时触发
    onPlayerLoadeddata(player) {
      console.log(player)
    },

    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate(player) {
      console.log(player)
    },

    //媒体的readyState为HAVE_FUTURE_DATA或更高
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
    },

    //媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough(player) {
      console.log('player Canplaythrough!', player)
    },

    //播放状态改变回调
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },

    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      console.log('example player 1 readied', player);
    }
  },
}
</script>

<style lang="scss" scoped>
.video_box {
  width: 100%;
  height: 100%;
}

.plugin {
  width: 100%;
  height: 100%;
}

.playWnd {
  width: 1600px;
  height: auto;
  margin: 0;
}

.video_box {
  ::v-deep .el-dialog__body {
    padding: 0 !important;
  }
}
</style>
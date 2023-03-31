<template>
  <div class="box">
    <video-player ref="myPlayer" :options="playerOptions">
    </video-player>
    <div class="middle">
      <div @click="activited(index)" v-for="(item, index) in topList" v-show="index < 4" :key="index" :id="'id' + index"
           class="middle_item"
           >
<!--        :class="{ midd@click="activited(index); kickTimer"le_item_active: index === activePosition }"-->
      <el-tooltip effect="dark" :content="item.title" placement="right">
        <img :src="item.pics" style="width: 30px">
      </el-tooltip>
    </div>
  </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import 'video.js/dist/video-js.css'
require('vue-video-player/src/custom-theme.css')
export default {
  name: "video2",
  components: {
    videoPlayer,
  },
  data() {
    return {
      playerOptions: {
        techOrder: ['flash', 'html5'],
        preload: 'auto',
        sourceOrder: true,
        sources: [],
        aspectRatio: '16:9',
        height: 350,
        autoplay: true,
        controls: true,
        language: 'zh-CN',
        fluid: true,
        notSupportedMessage: '此视频暂无法播放，请稍后再试'
      },
      topList: [
        {
          url: require('@/assets/video/痛苦度过一生.mp4'),
          title: "1",
          pics: require('@/assets/images/IMG_1932.png')
        },
        {
          url: require('@/assets/video/fuli.mp4'),
          title: "2",
          pics: require('@/assets/images/Leah.gif')
        },
      ]
    }
  },
  computed: {
    player() {
      return this.$refs.myPlayer.player
    }
  },
  methods: {
    ajaxData () {
      this.$set(this.playerOptions.sources, 0, {
        type: "video/mp4",
        src: require('@/assets/video/痛苦度过一生.mp4'),
      })
    },
    activited (index) {
      this.activePosition = index
      this.$set(this.playerOptions.sources, 0, {
        type: "video/mp4",
        src: this.topList[index].url,
      })
      this.player.muted(false)
    },
  }
}
</script>

<style lang="scss">
.box{
  margin: 10% 20%;
}

//未使用
.Videoindex {
  display: block;
  height: 350px; max-height: 350px; margin: 10px auto;
  .video-js .vjs-tech {
    width: 100%;
    height: 350px;
    max-height: 350px;
  }
}

.video-js .vjs-big-play-button{
  position: absolute;
  display: block;
  top: 46%;
  left: 43%;
  background: rgba(0, 0, 0, .7);
  border: none;
}
.video-js .vjs-big-play-button .vjs-icon-placeholder:before{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.vjs-controls-disabled .vjs-big-play-button, .vjs-has-started .vjs-big-play-button, .vjs-using-native-controls .vjs-big-play-button, .vjs-error .vjs-big-play-button {
  display: none;
}
.vjs-paused .vjs-big-play-button {
  display: block;
}
</style>
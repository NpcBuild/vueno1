<template>
  <div>
    wwwwwwwwwwww
    <!-- 音乐列表 -->
<!--    <music-list :music-list="musicList" @select-music="selectMusic"></music-list>-->

    <!-- 音乐信息 -->
<!--    <music-info :music-info="musicInfo" @play-music="playMusic"></music-info>-->

    <!-- 歌词 -->
<!--    <lyric :lyric="lyric" :currentTime="currentTime"></lyric>-->
  </div>
</template>

<script>
import { Howl } from 'howler';
import Lyric from 'lyric-parser';
export default {
  name: "music",
  data() {
    return {
      musicList: [],    // 音乐列表
      musicInfo: null,  // 音乐信息
      lyric: null,      // 歌词
      currentTime: 0    // 当前时间
    }
  },
  mounted() {
    this.selectMusic("1.mp3")
  },
  methods: {
    async loadMusicList() {
      this.getRequest('/music/list').then(response => {
        this.musicList = response.data;
      })
    },
    async loadMusicInfo(filename) {
      await this.getRequest('/music/1.mp3').then(response => {
        this.musicInfo = { filename, url: URL.createObjectURL(response.data) };
        this.playMusic()
      })
    },
    async loadLyric(filename) {
      await this.getRequest('/music/lyric/${filename}').then(response => {
        console.log(filename)
        this.lyric = response.data;
      })
    },
    selectMusic(filename) {
      this.loadMusicInfo(filename);
      // this.loadLyric(filename);
    },
    playMusic() {
      if (!this.musicInfo) {
        return;
      }
      if (this.howl) {
        this.howl.stop();
      }
      this.howl = new Howl({
        // src: [this.musicInfo.url],
        src: 'E:\\Data\\Computer\\Music\\1.mp3',
        onplay: () => {
          this.playing = true;
          this.startTime = Date.now();
          requestAnimationFrame(this.updateTime);
        },
        onpause: () => {
          this.playing = false;
        },
        onstop: () => {
          this.playing = false;
        },
        onend: () => {
          this.playing = false;
          this.currentTime = 0;
          this.howl = null;
        }
      });
      this.howl.play();
    },
    updateTime() {
      if (this.playing && this.howl) {
        this.currentTime = Math.round((Date.now() - this.startTime + this.howl.seek() * 1000) / 1000);
        const lineNum = this.lyric ? this.findLyricLineNum(this.lyric, this.currentTime) : -1;
        if (lineNum >= 0) {
          this.$refs.lyric.scrollToLine(lineNum);
        }
      }
      requestAnimationFrame(this.updateTime);
    },
    findLyricLineNum(lyric, currentTime) {
      const lines = new Lyric(lyric).lines;
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].time <= currentTime) {
          return i;
        }
      }
      return -1;
    }
  }
}
</script>

<style scoped>

</style>
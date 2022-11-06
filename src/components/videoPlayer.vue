<template>
  <div id="container">
    <video id="background_video" width="1000px" controls >
      抱歉，您的浏览器不支持内嵌视频
      <source src="../assets/video/痛苦度过一生.mp4" type='video/mp4'>
      <source src="../assets/video/fuli.mp4" type='video/mp4'>
    </video>
    <!-- #video_cover 是默认的视频封面 -->
    <div id="video_cover"></div>
    <!-- #overlay 遮罩层 -->
    <div id="overlay"></div>
  </div>
</template>

<script>
// import Bideo from '../utils/bideo';
export default {
  name: "videoPlayer",
  mounted() {
    // document.querySelector('#background_video').play();
  }
}
</script>

<style scoped>
#container{
  overflow: hidden;
}
#video_cover {
  position: absolute;
  background-size: cover;
  background: url("../assets/video_cover.png") no-repeat center;
}
</style>
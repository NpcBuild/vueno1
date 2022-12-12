<template>
  <div class="body">
    <div class="info">
      To see this effect, you should surf with Google Chrome and enable <strong>Experimental Canvas Features</strong> in <a href="chrome://flags" target="_blank">chrome://flags/</a>.
    </div>
    <div class="wrapper">
      <div class="player">
        <video id="video" src="http://r.myxotod.de/codepen.io/ambilight/sports.mp4" controls autoplay></video>

        <canvas id="myCanvas" width="600" height="337"></canvas>
      </div>
    </div>
  </div>
</template>
<script class="cssdeck" src="//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
<script>
var timerID;
window.onload = function() {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');

  var video = document.getElementById('video');

  video.addEventListener('play', function() {
    video.currentTime = 0;
    timerID = window.setInterval(function() {
      ctx.drawImage(video, 0, 0, 600, 460)
    }, 30);
  });

  video.addEventListener('pause', function() {
    stopTimer();
  });

  video.addEventListener('ended', function() {
    stopTimer();
  });
}
export default {
  name: "index"
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

.body {
  background: #222;
}

.info {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 200px;
  background: rgba(#000, 0.6);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(#000, 0.4);
  box-shadow: 0px 0px 3px rgba(#000, 0.4);
  color: #fff;
  font-family: Helvetica;
  font-size: 15px;
a, strong {
  font-weight: bold;
  color: aqua;
  text-decoration: none;
}
}

.wrapper {
  width: 600px;
  margin: 60px auto;
}

.player {
  width: 600px;
  height: 337px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
video {
  width: 600px;
  height: 337px;
  z-index: 1;
  position: absolute;
  overflow: hidden;
  border-radius: 20px;
}
canvas {
  position: absolute;
  width: 600px;
  height: 337px;
  transform: scale(1.2);
  -webkit-filter: blur(50px);
  opacity: 0.75;
  z-index: -1;
}
}
</style>
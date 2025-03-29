<template>
  <div>
    <div class="box">
      <div id="card-container" v-if="type === '1'">
        <div id="card">
          <div class="front face">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Bouquet_EP_cover_art.jpg/220px-Bouquet_EP_cover_art.jpg"/>
          </div>
          <div class="back face">
            <h1>Bouquet</h1>
            <p class="artist">The Chainsmokers</p>
            <p class="date">2015</p>
          </div>
        </div>
      </div>
      <div id="card-container" v-if="type === '2'">
        <div id="card2">
          <div class="front face">
            <img src="https://i.pinimg.com/originals/3f/e3/f9/3fe3f9bd5e2c4b61a8f36c8b9e3e66fa.png"/>
          </div>
          <div class="back face">
            <h1>Roses</h1>
            <p class="artist">The Chainsmokers</p>
            <p class="date">2017</p>
          </div>
        </div>
      </div>
      <div id="card-container" v-if="type === '3'">
        <div id="card3">
          <div class="front face">
            <img src="http://jayelaudio.com/wp-content/uploads/2015/07/11059871_980392135326510_2425127552142348735_o.jpg"/>
          </div>
          <div class="back face">
            <h1>Waterbed</h1>
            <p class="artist">The Chainsmokers</p>
            <p class="date">2015</p>
          </div>
        </div>
      </div>
    </div>

    <footer>
<!--      <p>made by <a href="https://codepen.io/juliepark"> julie</a> ♡-->
    </footer>
  </div>
</template>

<script>
export default {
  name: "card2",
  props: {
    type: {
      type: String,
      default: '2',
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
$white: #F9F3E4;
$pink: #F29DAB;
$rose: #DD899E;
$tan: #F2CDC1;
$taupe: #D0B2AF;

//@import url('https://fonts.googleapis.com/css?family=Questrial');

$font: 'Questrial', sans-serif;

html {
  min-height: 100%;
}

body {
  background:
      linear-gradient(217deg, rgba($pink, .9), rgba($pink,0) 50%),
      linear-gradient(107deg, rgba($rose,.9), rgba($rose,0) 70%),
      linear-gradient(336deg, rgba($tan,.9), rgba($tan,0) 60%);
}

.box {
  width: 800px;
  margin: 10% auto;
  position: relative;
}

#card-container {
  position: relative;
  margin: 30px;
  width: 200px;
  height: 200px;
  z-index: 1;
  float: left;
  perspective: 1000px;
}

img {
  width: 200px;
  height: 200px;
}

#card, #card2, #card3 {
  width: 100%;
  height: 100%;
  margin: 10%;
  transform-style: preserve-3d;
  transition: all .8s linear;
  box-shadow: 5px 5px 15px rgba(0,0,0, .3);
}

#card {
&:hover {
   transform: rotateY(180deg);
   box-shadow: -5px 5px 15px rgba(0,0,0, .3);
 }
}

#card2 {
&:hover {
   transform: rotateY(-180deg);
   box-shadow: -5px 5px 15px rgba(0,0,0, .3);
 }
}

#card3 {
&:hover {
   transform: rotateX(180deg);
   box-shadow: 5px -5px 15px rgba(0,0,0, .3);
 }
.back {
  transform: rotateX(-180deg);
}
}

.face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.back {
  display: block;
  transform: rotateY(180deg);
  box-sizing: border-box;
  padding: 10px;
  text-align: center;
  opacity: .7;
  background: $white;
}

h1, p {
  font-family: $font;
  text-transform: uppercase;
  letter-spacing: 2px;
}

h1 {
  font-size: 1.2em;
  padding-top: 15px;
  color: $rose;
}

p {
  font-size: .5em;
}

.date {
  color: $taupe;
}

footer {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 0.8em;
  text-transform: uppercase;
  padding: 10px;
  color: #EA7996;
a {
  color: #ffffff;
  text-decoration: none;
&:hover {
   color: #7d7d7d;
 }
}
}
</style>
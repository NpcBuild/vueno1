<template>
  <div id="container">
    <div id="success-box" v-if="type == 'success'">
      <div class="dot"></div>
      <div class="dot two"></div>
      <div class="face">
        <div class="eye"></div>
        <div class="eye right"></div>
        <div class="mouth happy"></div>
      </div>
      <div class="shadow scale"></div>
      <div class="message"><h1 class="alert">Success!</h1><p>yay, everything is working.</p></div>
      <button class="button-box"><h1 class="green">continue</h1></button>
    </div>
    <div id="error-box" v-if="type == 'error'">
      <div class="dot"></div>
      <div class="dot two"></div>
      <div class="face2">
        <div class="eye"></div>
        <div class="eye right"></div>
        <div class="mouth sad"></div>
      </div>
      <div class="shadow move"></div>
      <div class="message"><h1 class="alert">Error!</h1><p>oh no, something went wrong.</p></div>
      <button class="button-box"><h1 class="red">try again</h1></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "card3",
  props: {
    type: {
      type: String,
      default: 'success',
    }
  },
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@use 'sass:color';
$white: #FCFCFC;
$gray: #CBCDD3;
$dark: #777777;
$error: #EF8D9C;
$orange: #FFC39E;
$success: #B0DB7D;
$secondary: #99DBB4;

@import url('https://fonts.googleapis.com/css?family=Lato:400,700');

$font: 'Lato', sans-serif;

html {
  display: grid;
  min-height: 100%;
}

body {
  display: grid;
  overflow: hidden;
  font-family: $font;
  text-transform: uppercase;
  text-align: center;
}

#container {
  position: relative;
  //margin: auto;
  overflow: hidden;
  //width: 245px;
  //height: 250px;
  width: 100%;
  height: 100%;
}

h1 {
  font-size: 0.9em;
  font-weight: 100;
  letter-spacing: 3px;
  padding-top: 5px;
  color: $white;
  padding-bottom: 5px;
  text-transform: uppercase;
}

.green {
  color: color.adjust($secondary, $lightness: -20%);
}

.red {
  color: color.adjust($error, $lightness: -10%);
}

.alert {
  font-weight: 700;
  letter-spacing: 5px;
}

p {
  margin-top: -5px;
  font-size: 0.5em;
  font-weight: 100;
  color: color.adjust($dark, $lightness: -10%);
  letter-spacing: 1px;
}

button, .dot {
  cursor: pointer;
}

#success-box {
  position: absolute;
  width: 100%;
  height: 100%;
  //padding-top: 100%;
  //left: 12%;
  background: linear-gradient(to bottom right, $success 40%, $secondary 100%);
  border-radius: 20px;
  box-shadow: 5px 5px 20px rgba($gray, 10%);
  perspective: 40px;
}

#error-box {
  position: absolute;
  width: 100%;
  height: 100%;
  //right: 12%;
  background: linear-gradient(to bottom left, $error 40%, $orange 100%);
  border-radius: 20px;
  box-shadow: 5px 5px 20px rgba($gray, 10%);
}

.dot {
  width: 8px;
  height: 8px;
  background: $white;
  border-radius: 50%;
  position: absolute;
  top: 4%;
  right: 6%;
  &:hover {
    background: color.adjust($white, $lightness: -20%);
  }
}

.two {
  right: 12%;
  opacity: .5;
}

.face {
  position: absolute;
  width: 22%;
  height: 22%;
  background: $white;
  border-radius: 50%;
  border: 1px solid $dark;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: bounce 1s ease-in infinite;
}

.face2 {
  position: absolute;
  width: 22%;
  height: 22%;
  background: $white;
  border-radius: 50%;
  border: 1px solid $dark;
  top: 21%;
  left: 37.5%;
  z-index: 2;
  animation: roll 3s ease-in-out infinite;
}

.eye {
  position: absolute;
  width: 5px;
  height: 5px;
  background: $dark;
  border-radius: 50%;
  top: 40%;
  left: 20%;
}

.right {
  left: 68%;
}

.mouth {
  position:absolute;
  top: 43%;
  left: 41%;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.happy {
  border: 2px solid;
  border-color: transparent $dark $dark transparent;
  transform: rotate(45deg);
}

.sad {
  top: 49%;
  border: 2px solid;
  border-color: $dark transparent transparent $dark;
  transform: rotate(45deg);
}

.shadow {
  position: absolute;
  width: 21%;
  height: 3%;
  opacity: .5;
  background: $dark;
  left: 40%;
  top: 43%;
  border-radius: 50%;
  z-index: 1;
}

.scale {
  animation: scale 1s ease-in infinite;
}
.move {
  animation: move 3s ease-in-out infinite;
}


.message {
  position: absolute;
  width: 100%;
  text-align: center;
  height: 40%;
  top: 47%;
}

.button-box {
  position: absolute;
  background: $white;
  width: 50%;
  height: 15%;
  border-radius: 20px;
  top: 73%;
  left: 25%;
  outline: 0;
  border: none;
  box-shadow: 2px 2px 10px rgba($dark, .5);
  transition: all .5s ease-in-out;
  &:hover {
    background: color.adjust($white, $lightness: -5%);
    transform: scale(1.05);
    transition: all .3s ease-in-out;
  }
}

@keyframes bounce {
  50% {
    transform: translateY(-10px);
  }
}

@keyframes scale {
  50% {
    transform: scale(0.9);
  }
}

@keyframes roll {
  0% {
    transform: rotate(0deg);
    left: 25%;
  }
  50% {
    left: 60%;
    transform: rotate(168deg);
  }
  100% {
    transform: rotate(0deg);
    left: 25%;
  }
}

@keyframes move {
  0% {
    left: 25%;
  }
  50% {
    left: 60%;
  }
  100% {
    left: 25%;
  }
}

footer {
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  font-size: 1em;
  text-transform: uppercase;
  padding: 10px;
  font-family: $font;
  p {
    color: $error;
    letter-spacing: 2px;
  }
  a {
    color: $success;
    text-decoration: none;
    &:hover {
      color: $orange;
    }
  }
}
</style>
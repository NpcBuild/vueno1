<template>
  <div class="logo">
    <!--orange circle-->
    <div class="circle bgcolor-1 c-O1">
      <!--white circle-->
      <div class="animate-circle circle ab bgcolor-2 c-W1">
        <!-- Bars -->
        <div class="bgcolor-1 ab S-1"></div>
        <div class="bgcolor-1 ab S-2"></div>
        <div class="bgcolor-1 ab S-3"></div>
        <!-- small circle -->
        <div class="circle ab bcolor-1 bgcolor-2 c-W2"></div>
        <div class="circle ab bcolor-1 bgcolor-2 c-W3"></div>
        <div class="circle ab bcolor-1 bgcolor-2 c-W4"></div>
        <!--small orange circle-->
        <div class="circle ab bgcolor-1 c-O2"></div>
      </div>
    </div>
    <h1 class="bcolor-1">ubuntu</h1>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
/* import font */
@import "http://fonts.googleapis.com/css?family=Ubuntu:regular&subset=Latin,Cyrillic";

body {background:#fff;
  /*background: url('http://www.revista.espiritolivre.org/wp-content/uploads/2013/02/18-02-2013_logo-ubuntu.jpg') no-repeat 20px 331px;*/
  font-family: Ubuntu, sans-serif;
  line-height:0px;
}
/* Animations */
.animate-circle {
  animation-duration: 15s;
  animation-iteration-count: infinite;
  animation-name: loop;
}
@keyframes loop {
  0% {
    transform:scale(1);
  }
  5% {
    transform:scale(1.6);
  }
  10% {
    transform:rotateZ(720deg);
  }
  20% {
    transform:scale(1);
  }
}
.logo {
  transform:scale(0.5);
  width:800px;
  height:600px;
  text-align:center;
  position:absolute;
  top:50%;
  left:50%;
  margin-left:-400px;
  margin-top:-300px;
}
h1 {
  font-size:2.5rem;
  font-weight:normal;
  margin-top:0px;
  margin-left:-10px;
  letter-spacing: -1px;
}
.circle {
  border-radius:50%;
}
.ab {
  position:absolute;
}
.c-O1 {
  width:340px;
  height:340px;
  position:relative;
  margin:auto;
}
.c-O2 {
  width:134px;
  height:134px;
  margin: -67px 0 0 -67px;
  top: 50%;
  left: 50%;
}
.c-W1 {
  width: 198px;
  height: 198px;
  margin: -100px 0 0 -100px;
  top: 50%;
  left: 50%;
}
.c-W2, .c-W3, .c-W4 {
  width: 45px;
  height: 45px;
  border:10px solid;
}
.c-W2 {
  top: 34%;
  left: -25%;
}
.c-W3 {
  top: -34px;
  left: 63%;
}
.c-W4 {
  top: 167px;
  left: 63%;
}
.S-1, .S-2, .S-3 {
  width:40px;
  height:12px;
}
.S-1 {
  top:12%;
  left:20%;
  transform:rotateZ(61deg);
}
.S-2 {
  top:84%;
  left:18%;
  transform:rotateZ(-60deg);
}
.S-3 {
  top:47%;
  left:80%;
}
/* orange */
.bgcolor-1 {
  background-color:#de4815;
}
.bcolor-1 {
  border-color: #de4815;
  color:#de4815;
}
/* white */
.bgcolor-2 {
  background-color: #FFF;
}
</style>
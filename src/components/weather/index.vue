<template>
  <div>
    <div class="body">
      <div class="weather-wrapper">
        <div class="weather-card madrid">
          <div class="weather-icon sun"></div>
          <h1>26º</h1>
          <p>Madrid</p>
        </div>
        <div class="weather-card london">
          <div class="weather-icon cloud"></div>
          <h1>14º</h1>
          <p>London</p>
        </div>
      </div>
    </div>

<!--    二-->
    <div class="body2">
      <div class="wrapper">
        <div class="sun"></div>
        <div class="cloud">
          <div class="cloud1">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="cloud1 c_shadow">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>

        <div class="cloud_s">
          <div class="cloud1">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="cloud1 c_shadow">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>

        <div class="cloud_vs">
          <div class="cloud1">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div class="cloud1 c_shadow">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="haze"></div>
        <div class="haze_stripe"></div>
        <div class="haze_stripe"></div>
        <div class="haze_stripe"></div>
        <div class="thunder"></div>
        <div class="rain">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="sleet">
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="text">
          <ul>
            <li>www.teenovative.com</li>
            <li>Teenovative Social Networks</li>
            <li>We Are Innovative Teens Cloudy</li>
            <li>Find Friends</li>
            <li>Make Friends</li>
            <li>Communicate</li>
            <li>Call & Text</li>
            <li>Mukesh Jha Productions</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Lato:100,300,400,700,900);
.body {
  background-color: #EEEEEE;
}

*, *:before, *:after {
  box-sizing: border-box;
}

.weather-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.weather-card {
  margin: 20px 20px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  width: 270px;
  height: 270px;
  background-color: white;
  box-shadow: 0px 0px 25px 1px rgba(50, 50, 50, 0.1);
  -webkit-animation: appear 500ms ease-out forwards;
  animation: appear 500ms ease-out forwards;
}
.weather-card h1 {
  position: absolute;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 80px;
  color: #B8B8B8;
  bottom: 0;
  left: 35px;
  opacity: 0;
  -webkit-transform: translateX(150px);
  -ms-transform: translateX(150px);
  transform: translateX(150px);
  -webkit-animation: title-appear 500ms ease-out 500ms forwards;
  animation: title-appear 500ms ease-out 500ms forwards;
}
.weather-card p {
  position: absolute;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 28px;
  color: #d2d2d2;
  bottom: 0;
  left: 35px;
  -webkit-animation: title-appear 1s ease-out 500ms forwards;
  animation: title-appear 1s ease-out 500ms forwards;
}

.weather-icon {
  position: relative;
  width: 50px;
  height: 50px;
  top: 0;
  float: right;
  margin: 40px 40px 0 0;
  -webkit-animation: weather-icon-move 5s ease-in-out infinite;
  animation: weather-icon-move 5s ease-in-out infinite;
}

.sun {
  background: #FFCD41;
  border-radius: 50%;
  box-shadow: rgba(255, 255, 0, 0.1) 0 0 0 4px;
  -webkit-animation: light 800ms ease-in-out infinite alternate, weather-icon-move 5s ease-in-out infinite;
  animation: light 800ms ease-in-out infinite alternate, weather-icon-move 5s ease-in-out infinite;
}

@-webkit-keyframes light {
  from {
    box-shadow: rgba(255, 255, 0, 0.2) 0 0 0 10px;
  }
  to {
    box-shadow: rgba(255, 255, 0, 0.2) 0 0 0 17px;
  }
}

@keyframes light {
  from {
    box-shadow: rgba(255, 255, 0, 0.2) 0 0 0 10px;
  }
  to {
    box-shadow: rgba(255, 255, 0, 0.2) 0 0 0 17px;
  }
}
.cloud {
  margin-right: 60px;
  background: #e1e1e1;
  border-radius: 20px;
  width: 25px;
  height: 25px;
  box-shadow: #e1e1e1 24px -6px 0 2px, #e1e1e1 10px 5px 0 5px, #e1e1e1 30px 5px 0 2px, #e1e1e1 11px -8px 0 -3px, #e1e1e1 25px 11px 0 -1px;
}
.cloud:after {
  content: "";
  position: absolute;
  border-radius: 10px;
  background-color: transparent;
  width: 4px;
  height: 12px;
  left: 0;
  top: 31px;
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
  -webkit-animation: rain 800ms ease-in-out infinite alternate;
  animation: rain 800ms ease-in-out infinite alternate;
}

@-webkit-keyframes rain {
  from {
    box-shadow: #2092A9 8px 0px, #2092A9 32px -6px, #2092A9 20px 0px;
  }
  to {
    box-shadow: #2092A9 8px 6px, #2092A9 32px 0px, #2092A9 20px 6px;
  }
}

@keyframes rain {
  from {
    box-shadow: #2092A9 8px 0px, #2092A9 32px -6px, #2092A9 20px 0px;
  }
  to {
    box-shadow: #2092A9 8px 6px, #2092A9 32px 0px, #2092A9 20px 6px;
  }
}
@-webkit-keyframes weather-icon-move {
  50% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
}
@keyframes weather-icon-move {
  50% {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
}

@-webkit-keyframes appear {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
  75% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes appear {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1.05);
    transform: scale(1.05);
  }
  75% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@-webkit-keyframes title-appear {
  from {
    opacity: 0;
    -webkit-transform: translateX(150px);
    transform: translateX(150px);
  }
  to {
    opacity: 1;
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
}
@keyframes title-appear {
  from {
    opacity: 0;
    -webkit-transform: translateX(150px);
    transform: translateX(150px);
  }
  to {
    opacity: 1;
    -webkit-transform: translateX(0px);
    transform: translateX(0px);
  }
}


/*二*/
@import url(http://fonts.googleapis.com/css?family=Raleway+Dots);

.body2{
  margin: 0;
  padding: 0;
  background: #33495f;
}

.wrapper{
  width: 150px;
  height: 150px;
  position: absolute;
  top: calc(50% - 75px);
  left: calc(50% - 75px);
}

.sun{
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 85px;
  height: 85px;
  background: #f9db62;
  border-radius: 360px;
  opacity: 1;
  animation: sun 10s 0s linear infinite;
}

.cloud{
  position: absolute;
  bottom: 12px;
  left: 8px;
  z-index: 2;
  opacity: 0;
  animation: cloud 10s 0s linear infinite;
}

.cloud .cloud1:not(.c_shadow) ul li{
  animation: cloudi 10s 0.1s linear infinite;
}

.cloud .cloud1:not(.c_shadow):before{
  animation: cloudi 10s 0s linear infinite;
}

.cloud_s{
  position: absolute;
  bottom: 70px;
  left: 150px;
  transform: scale(0.7,0.7) matrix(-1, 0, 0, 1, 0, 0);
  z-index: 1;
  opacity: 0;
  animation: cloud_s 10s 0s linear infinite;
}

.cloud_s .c_shadow{
  transform: scale(1.02,1.02);
}

.cloud_vs{
  position: absolute;
  bottom: 90px;
  left: 30px;
  transform: scale(0.5,0.5);
  z-index: 0;
  opacity: 0;
  animation: cloud_vs 10s 0s linear infinite;
}

.c_shadow{
  z-index: 4 !important;
  left: -5px;
  bottom: -3px !important;
}

.c_shadow:before{
  background: #33495f !important;
}

.c_shadow ul li{
  width: 60px !important;
  height: 60px !important;
  background: #33495f !important;
  float: left;
  position: absolute;
  bottom: -2px !important;
  border-radius: 360px;
}

.c_shadow ul li:nth-child(2){
  width: 80px !important;
  height: 80px !important;
  background: #33495f !important;
  float: left;
  border-radius: 360px;
  position: absolute;
  bottom: 16px !important;
  left: 25px !important;
}

.c_shadow ul li:nth-child(3){
  width: 70px !important;
  height: 70px !important;
  background: #33495f !important;
  float: left;
  border-radius: 360px;
  position: absolute;
  bottom: 6px !important;
  left: 60px !important;
}

.c_shadow ul li:last-child{
  width: 60px !important;
  height: 60px !important;
  background: #33495f !important;
  float: left;
  border-radius: 360px;
  position: absolute;
  bottom: 0px;
  left: 90px;
}


.cloud1{
  position: absolute;
  bottom: 0px;
  z-index: 5;
}

.cloud1:before{
  content: '';
  position: absolute;
  bottom: 0px;
  left: 28px;
  width: 90px;
  height: 20px;
  background: #fff;
}

.cloud1 ul{
  list-style: none;
  margin: 0;
  padding: 0;
}

.cloud1 ul li{
  width: 50px;
  height: 50px;
  background: #fff;
  float: left;
  border-radius: 360px;
}

.cloud1 ul li:nth-child(2){
  width: 70px;
  height: 70px;
  background: #fff;
  float: left;
  border-radius: 360px;
  position: absolute;
  bottom: 18px;
  left: 25px;
}

.cloud1 ul li:nth-child(3){
  width: 60px;
  height: 60px;
  background: #fff;
  float: left;
  border-radius: 360px;
  position: absolute;
  bottom: 8px;
  left: 60px;
}

.cloud1 ul li:last-child{
  width: 50px;
  height: 50px;
  background: #fff;
  float: left;
  border-radius: 360px;
  position: absolute;
  bottom: 0px;
  left: 90px;
}

.haze{
  background: #33495f;
  position: absolute;
  bottom: 50px;
  left: 0px;
  width: 200px;
  height: 45px;
  z-index: 6;
  opacity: 0;
  animation: haze 10s 0s linear infinite;
}

.haze_stripe{
  background: #a3b5c7;
  position: absolute;
  bottom: 75px;
  left: 20px;
  width: 115px;
  height: 10px;
  z-index: 17;
  opacity: 0;
  border-radius: 360px;
  animation: haze_stripe 10s 0.1s linear infinite;
}

.haze_stripe:nth-child(6){
  bottom: 55px;
  animation: haze_stripe 10s 0.2s linear infinite;
}
.haze_stripe:last-child{
  bottom: 35px;
  animation: haze_stripe 10s 0.4s linear infinite;
}

.thunder{
  position: absolute;
  bottom: 100px;
  left: 65px;
  width: 12px;
  height: 12px;
  background: #f9db62;
  transform: skew(-25deg);
  opacity: 0;
  animation: thunder 10s 0s linear infinite;
}

.thunder:before{
  content: '';
  position: absolute;
  top: 11px;
  left: 0px;
  width: 25px;
  height: 8px;
  background: #f9db62;
}

.thunder:after{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: 18px;
  right: -14px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;

  border-top: 20px solid #f9db62;
  transform: skew(5deg);
}

.rain{
  position: absolute;
  bottom: 0px;
  left: 25px;
}

.rain ul{
  list-style: none;
  margin: 0;
  padding: 0px;
}

.rain ul li{
  float: left;
  position: absolute;
  bottom: 50px;
  left: 50px;
  margin-left: 20px;
  background: #6ab9e9;
  height: 40px;
  width: 10px;
  border-radius: 360px;
  transform: rotate(35deg);
  opacity: 0;
}

.rain ul li:first-child{
  animation: raini 10s 0s linear infinite;
}

.rain ul li:nth-child(2){
  animation: rainii 10s 0.2s linear infinite;
}

.rain ul li:last-child{
  animation: rainiii 10s 0.4s linear infinite;
}

.sleet{
  position: absolute;
  bottom: 0px;
  left: 25px;
}

.sleet ul{
  list-style: none;
  margin: 0;
  padding: 0px;
}

.sleet ul li{
  float: left;
  position: absolute;
  bottom: 50px;
  left: 50px;
  margin-left: 20px;
  background: #fff;
  height: 40px;
  width: 10px;
  border-radius: 360px;
  transform: rotate(35deg);
  opacity: 0;
}

.sleet ul li:first-child{
  animation: raini 10s 1.0s linear infinite;
}

.sleet ul li:nth-child(2){
  animation: rainii 10s 1.4s linear infinite;
}

.sleet ul li:last-child{
  animation: rainiii 10s 1.6s linear infinite;
}

.text{
  position: absolute;
  bottom: 0px;
}

.text ul{
  list-style: none;
  margin: 0;
  padding: 0;
}

.text ul li{
  position: absolute;
  bottom: -50px;
  width: 150px;
  color: #fff;
  font-family: 'Raleway Dots', cursive;
  font-weight: 100;
  font-size: 20px;
  text-align: center;
  opacity: 0;
}

.text ul li:first-child{
  animation: fade_in 10.0s 0s linear infinite;
}

.text ul li:nth-child(2){
  animation: fade_in 10.0s 1.6s linear infinite;
}

.text ul li:nth-child(3){
  animation: fade_in 10.0s 2.4s linear infinite;
}

.text ul li:nth-child(4){
  animation: fade_in 10.0s 3.4s linear infinite;
}

.text ul li:nth-child(5){
  animation: fade_in 10.0s 4.0s linear infinite;
}

.text ul li:nth-child(6){
  animation: fade_in 10.0s 5.4s linear infinite;
}

.text ul li:nth-child(7){
  animation: fade_in 10.0s 6.4s linear infinite;
}

.text ul li:nth-child(8){
  animation: fade_in 10.0s 7.2s linear infinite;
}

.text ul li:nth-child(9){
  animation: fade_in 10.0s 8.2s linear infinite;
}

@keyframes sun{
  0%{
    opacity: 1;
    bottom: 35px;
    right: 35px;
  }
  4%{
    bottom: 80px;
    right: 80px;
  }
  4.5%{
    bottom: 75px;
    right: 75px;
    opacity: 1;
  }
  40%{
    opacity: 1;
  }
  41%{
    bottom: 75px;
    right: 75px;
    opacity: 0;
  }
  100%{
    opacity: 0;
    bottom: 0px;
    right: 0px;
  }
}

@keyframes cloud{
  0%{
    transform: scale(0.8);
    left: 120px;
    bottom: 35px;
    opacity: 0;
  }
  2%{
    opacity: 1;
  }
  3.5%{
    bottom: 35px;
    left: 10px;
    opacity: 1;
  }
  16%{
    transform: scale(0.8);
  }
  18%{
    transform: scale(0.95);
  }
  19%{
    transform: scale(0.9);
  }
  48%{
    opacity: 1;
    bottom: 35px;
  }
  50%{
    bottom: 70px;
  }
  64%{

  }
  96%{
    opacity: 1;
  }
  100%{
    opacity: 0;
    bottom: 70px;
    left: 10px;
  }
}

@keyframes cloud_s{
  0%{
    transform: scale(0.6);
    opacity: 0;
    bottom: 40px;
    left: 18px;
  }
  23%{
    opacity: 0;
  }
  24%{
    opacity: 1;
    bottom: 40px;
    left: 30px;
  }
  28%{
    opacity: 1;
    bottom: 85px;
    left: 60px;
  }
  32%{
    transform: scale(0.6);
  }
  34%{
    transform: scale(0.75);
  }
  35%{
    transform: scale(0.7);
  }
  48%{
    opacity: 1;
  }
  49%{
    opacity: 0;
  }
  100%{
    transform: scale(0.7);
    opacity: 0;
    bottom: 85px;
    left: 60px;
  }
}

@keyframes cloud_vs{
  0%{
    opacity: 0;
    bottom: 85px;
    left: 60px;
  }
  39%{
    opacity: 0;
  }
  40%{
    opacity: 1;
    bottom: 85px;
    left: 60px;
  }
  42%{
    bottom: 125px;
    left: 10px;
  }
  43%{
    bottom: 120px;
    left: 15px;
  }
  48%{
    opacity: 1;
  }
  49%{
    opacity: 0;
  }
  100%{
    opacity: 0;
    bottom: 120px;
    left: 15px;
  }
}

@keyframes haze{
  0%{
    opacity: 0;
  }
  48%{
    height: 0px;
    opacity: 0;
  }
  49%{
    height: 45px;
    opacity: 1;
  }
  57%{
    opacity:1;
    height: 45px;
  }
  58%{
    opacity: 0;
    height: 0px;
  }
}

@keyframes haze_stripe{
  0%{
    opacity: 0;
  }
  48%{
    opacity: 0;
  }
  49%{
    opacity: 1;
  }
  56%{
    opacity:1;
  }
  57%{
    opacity: 0;
  }
}

@keyframes cloudi{
  0%{
    background: #fff;
  }
  56%{
    background: #fff;
  }
  57%{
    background: #92a4b6;
  }
  100%{
    background: #92a4b6;
  }
}

@keyframes thunder{
  0%{
    opacity: 0;
    bottom: 100px;
    left: 65px;
  }
  62%{
    opacity: 0;
    bottom: 100px;
    left: 65px;
  }
  64%{
    opacity: 1;
    bottom: 50px;
    left: 60px;
  }
  65%{
    opacity: 1;
    bottom: 55px;
    left: 61px;
  }
  72%{
    opacity: 1;
    bottom: 55px;
    left: 61px;
  }
  73%{
    opacity: 0;
  }
  100%{
    opacity: 0;
    bottom: 55px;
  }
}

@keyframes raini{
  0%{
    opacity: 0;
    bottom: 100px;
    left: 60px;
  }
  72%{
    opacity: 0;
    bottom: 100px;
    left: 60px;
  }
  73%{
    opacity: 1;
    bottom: 15px;
    left: 50px;
  }
  74%{
    opacity: 1;
    bottom: 25px;
    left: 52px;
  }
  80%{
    opacity: 1;
    bottom: 25px;
    left: 52px;
  }
  81%{
    opacity: 0;
    bottom: -15px;
    left: 6px;
  }
  100%{
    opacity: 0;
    bottom: 20px;
  }
}

@keyframes rainii{
  0%{
    opacity: 0;
    bottom: 100px;
    left: 30px;
  }
  72%{
    opacity: 0;
    bottom: 100px;
    left: 30px;
  }
  73%{
    opacity: 1;
    bottom: 15px;
    left: 20px;
  }
  74%{
    opacity: 1;
    bottom: 25px;
    left: 22px;
  }
  80%{
    opacity: 1;
    bottom: 25px;
    left: 22px;
  }
  81%{
    opacity: 0;
    bottom: -15px;
    left: -6px;
  }
  100%{
    opacity: 0;
    bottom: 20px;
  }
}

@keyframes rainiii{
  0%{
    opacity: 0;
    bottom: 100px;
    left: 0px;
  }
  72%{
    opacity: 0;
    bottom: 100px;
    left: 0px;
  }
  73%{
    opacity: 1;
    bottom: 15px;
    left: -10px;
  }
  74%{
    opacity: 1;
    bottom: 25px;
    left: -8px;
  }
  80%{
    opacity: 1;
    bottom: 25px;
    left: -8px;
  }
  81%{
    opacity: 0;
    bottom: -15px;
    left: -28px;
  }
  100%{
    opacity: 0;
    bottom: 20px;
  }
}

@keyframes fade_in{
  0%{
    opacity: 0;
  }
  8%{
    opacity: 1;
  }
  9%{
    opacity: 1;
  }
  11%{
    opacity: 1;
  }
  12%{
    opacity: 0;
  }
  100%{
    oapcity: 0;
  }
}
</style>
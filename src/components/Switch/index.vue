<template>
  <div class="colorful-switch">
    <input type="checkbox" class="colorful-switch__checkbox" id="colorful-switch-cb" />
    <label class="colorful-switch__label" for="colorful-switch-cb">
      <span class="colorful-switch__bg"></span>
      <span class="colorful-switch__dot"></span>
      <span class="colorful-switch__on">
      <span class="colorful-switch__on__inner"></span>
    </span>
      <span class="colorful-switch__off"></span>
    </label>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: #24282C;
}

$w: 280px;
$_baseW: 280;
$h: $w * 120 / $_baseW;
$br: $w * 50 / $_baseW;
$outerOffset: 5px;
$animTime: 0.5s;
$dotS: $w * 8 / $_baseW;
$dotLeft: $w * 204 / $_baseW;
$dotLeftOffset: $w * -125 / $_baseW;
$offS: $w * 64 / $_baseW;
$onLeft: $w * 177 / $_baseW;
$onTop: $w * 35 / $_baseW;
$onWidth: $w * 30 / $_baseW;
$onHeight: $w * 56 / $_baseW;
$cubIn: cubic-bezier(.52,-0.96,.51,1.28);
$cubOut: cubic-bezier(.67,-0.16,.47,1.61);

@mixin switchOn() {
  .colorful-switch__checkbox:checked ~ .colorful-switch__label & {
  @content;
}
}

.colorful-switch {
  position: absolute;
  left: 50%;
  top: 50%;
  width: $w;
  height: $h;
  margin-left: $w/-2;
  margin-top: $h/-2;
  border-radius: $br;
  background: #cfcfcf;

&:before {
   content: "";
   z-index: -1;
   position: absolute;
   left: -$outerOffset;
   top: -$outerOffset;
   width: $w + $outerOffset*2;
   height: $h + $outerOffset*2;
   border-radius: $br + $outerOffset;
   background: #314239;
   transition: background-color 0.3s;
 }

&:hover:before {
   background: #4C735F;
 }

&__checkbox {
   z-index: -10;
   position: absolute;
   left: 0;
   top: 0;
   opacity: 0;
 }

&__label {
   z-index: 1;
   overflow: hidden;
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   border-radius: $br;
   cursor: pointer;
 }

&__bg {
   position: absolute;
   left: 0;
   top: 0;
   width: $w * 3;
   height: 100%;
   background: linear-gradient(90deg, #14DCD6 0, #10E7BD $w, #EF9C29 $w*2, #E76339 100%);
   transition: transform $animTime;
   transform: translate3d($w*-2,0,0);

@include switchOn {
  transform: translate3d(0,0,0);
}
}

&__dot {
   position: absolute;
   left: $dotLeft;
   top: 50%;
   width: $dotS;
   height: $dotS;
   margin-left: $dotS/-2;
   margin-top: $dotS/-2;
   border-radius: 50%;
   background: #fff;
   transition: transform $animTime;
   transform: translate3d(0,0,0);

@include switchOn {
  transform: translate3d($dotLeftOffset,0,0);
}
}

&__on {
   position: absolute;
   left: $onLeft;
   top: $onTop;
   width: $onWidth;
   height: $onHeight;
   transition: transform $animTime;
   transform: translate3d(0,0,0);

@include switchOn {
  transform: translate3d($dotLeftOffset,0,0);
}

&__inner {
   position: absolute;
   width: 100%;
   height: 100%;
   transition: transform $animTime/2 0s $cubIn;
   transform-origin: 100% 50%;
   transform: rotate(45deg) scale(0) translateZ(0);

@include switchOn {
  transition: transform $animTime/2 $animTime/2 $cubOut;
  transform: rotate(45deg) scale(1) translateZ(0);
}

&:before,
&:after {
   content: "";
   position: absolute;
   border-radius: $dotS/2;
   background: #fff;
 }
&:before {
   left: 0;
   bottom: 0;
   width: 100%;
   height: $dotS+1px;
 }
&:after {
   right: 0;
   top: 0;
   width: $dotS+1px;
   height: 100%;
 }
}
}

&__off {
   position: absolute;
   left: $dotLeft;
   top: 50%;
   width: $offS;
   height: $offS;
   margin-left: $offS/-2;
   margin-top: $offS/-2;
   transition: transform $animTime;
   transform: translate3d(0,0,0);

@include switchOn {
  transform: translate3d($dotLeftOffset,0,0);
}

&:before,
&:after {
   content: "";
   position: absolute;
   left: 0;
   top: 50%;
   width: 100%;
   height: $dotS;
   margin-top: $dotS/-2;
   border-radius: $dotS/2;
   background: #fff;
   transition: transform $animTime/2 $animTime/2;

@include switchOn {
  transition-delay: 0s;
}
}
&:before {
   transform: rotate(45deg) scaleX(1) translateZ(0);

@include switchOn {
  transform: rotate(45deg) scaleX(0) translateZ(0);
}
}
&:after {
   transition-timing-function: $cubOut;
   transform: rotate(-45deg) scaleX(1) translateZ(0);

@include switchOn {
  transition-timing-function: ease;
  transform: rotate(-45deg) scaleX(0) translateZ(0);
}
}
}
}
</style>
<template>
  <div class="upload" :class="{ paused: paused, finished: finished, isMobile: isMobile }" :style="{'--percent':num}" ref="upload">
    <div class="text">
      <strong><span>Uploading</span> 3 files</strong>
      <div>
        <small>%</small>
        <div>
          <small>
            <span data-seconds>{{runTime}}</span> seconds left
          </small>
          <small>Paused</small>
        </div>
      </div>
    </div>

    <nav>
      <ul>
        <li>
          <a class="btn play" :class="{active: playActive}" @click="playClicked">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.09437962,6 L13,6 C14,5.89116285 14.5,5.39116285 14.5,4.5 C14.5,3.60883715 14,3.10883715 13,3 L12,3 L4.09437962,3 L3,3 C2,3.10728568 1.5,3.60728568 1.5,4.5 C1.5,5.39271432 2,5.89271432 3,6 L4.09437962,6 Z"></path>
            </svg>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.09437962,6 L13,6 C14,5.89116285 14.5,5.39116285 14.5,4.5 C14.5,3.60883715 14,3.10883715 13,3 L12,3 L4.09437962,3 L3,3 C2,3.10728568 1.5,3.60728568 1.5,4.5 C1.5,5.39271432 2,5.89271432 3,6 L4.09437962,6 Z"></path>
            </svg>
          </a>
        </li>
        <li>
          <a class="btn cancel"></a>
        </li>
      </ul>
      <ul>
        <li>
          <a>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <polygon points="7.4,10 6,8.6 3.3,11.3 0,8 0,16 8,16 4.7,12.7 "></polygon>
              <polygon points="11.3,3.3 8.6,6 10,7.4 12.7,4.7 16,8 16,0 8,0 "></polygon>
            </svg>
          </a>
        </li>
        <li>
          <a class="dots">
            <svg viewBox="0 0 16 16" fill="currentColor">
              <circle cx="8" cy="8" r="2"></circle>
              <circle cx="2" cy="8" r="2"></circle>
              <circle cx="14" cy="8" r="2"></circle>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
    <div class="percent">
      <span></span>
      <div>
        <svg preserveAspectRatio="none" viewBox="0 0 600 12">
          <path d="M0,1 L200,1 C300,1 300,11 400,11 L600,11" stroke="currentColor" fill="none"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
import 'animate.css';
export default {

  name: "uploaderCss",
  data() {
    return {
      num: 0,
      runTime: 0,
      duration: 7000,
      percent: 40,
      animation: null,
      paused: false,
      finished: false,
      playActive: false,
      isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
    }
  },
  mounted() {
    this.fakeUpload(7000);
  },
  watch: {
    num(newValue, oldValue) {
      console.log(oldValue)
      if (newValue >= 100) {
        this.completeAnimation()
      } else {
        this.runTime = 20
      }
    }
  },
  methods: {
    morhp(toPath) {
      let svgs = this.$el.querySelectorAll('.play svg');
      svgs.forEach(svg => {
        Snap(svg.querySelector('path')).animate({
          d: toPath
        }, 400);
      });
    },
    fakeUpload(duration) {
      this.num = 0;
      // this.$refs.upload.querySelector('[data-seconds]').textContent = Math.floor((duration - duration * this.num / 100) / 1000) + 1;
      this.animation = this.$refs.upload.animate({
        //num: 0
        width: "toggle",
        height: "toggle"
    },{
        duration: duration,
        easing: 'linear',
      });
    },
    completeAnimation() {
      this.finished = !this.finished;
      this.$refs.upload.querySelector('.text > strong > span').textContent = 'Uploaded';
      this.$refs.upload.querySelector('.percent span').animate({
        width: 20
      }, 400);
    },
    playClicked() {
      let btn = this.$el.querySelector('.play');
      console.log('animation:',this.animation)
      this.num = 99

      if (btn.classList.contains('active')) {
        // this.morhp(Snap.select('.play svg path').attr('d'));
        this.morhp('M4.09437962,6 L13,6 C14,5.89116285 14.5,5.39116285 14.5,4.5 C14.5,3.60883715 14,3.10883715 13,3 L12,3 L4.09437962,3 L3,3 C2,3.10728568 1.5,3.60728568 1.5,4.5 C1.5,5.39271432 2,5.89271432 3,6 L4.09437962,6 Z');
        // this.animation.pause();
      } else {
        this.morhp('M4.5,4.5 C6.4,2.6 9.6,2.6 11.5,4.5 C12.2,5.2 12.7,6.2 12.9,7.2 L14.9,6.9 C14.7,5.4 14,4.1 13,3.1 C10.3,0.4 5.9,0.4 3.1,3.1 L0.9,0.9 L0.2,7.3 L6.6,6.6 L4.5,4.5 Z');
        setTimeout(() => {
          // this.animation.resume();
        }, 600);
      }
      this.paused = !this.paused
      this.playActive = !this.playActive
    }
  }
}
</script>

<!--<style lang="scss" rel="stylesheet/scss" scoped>-->
<style lang="scss" rel="stylesheet/scss">
:root {
  --primary: #5628EE;
  --success: #0EAC70;
  --grey-light: #99A3BA;
  --grey: #6C7486;
  --grey-dark: #3F4656;
  --light: #CDD9ED;
  --lighter: #E4ECFA;
  --lightest: #EEF4FF;
  --pale: #F5F9FF;
  --shadow: rgba(18, 22, 33, .05);
}

.upload {
  --percent: 0;
  counter-increment: percent var(--percent);
  background: #B0E2FF;
  border-radius: 8px;
  width: 320px;
  box-shadow: 0 4px 16px -1px var(--shadow);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 32px 20px;
  font-family: Roboto, Arial;
  //Safari fix
  -webkit-mask-image: -webkit-radial-gradient(white, black);

  .percent {
    background: var(--pale);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    transform-origin: 0 50%;
    overflow: hidden;
    transition: background .6s ease, transform .16s ease;
    transform: scaleX(calc(var(--percent)/100));

    span {
      display: block;
      position: absolute;
      right: 0;
      width: 100%;
      bottom: 19px;
      height: 2px;
      opacity: 0;
      transform: translateY(.5px);
      transition: transform .8s ease;

      &:before,
      &:after {
        --r: 0;
        --s: .5;
        content: '';
        position: absolute;
        top: 0;
        height: 2px;
        border-radius: 1px;
        background: var(--primary);
        transition: background .8s ease, transform .8s ease, height .3s ease;
        transform: rotate(var(--r)) scaleY(var(--s));
      }

      &:before {
        right: 0;
        width: 64%;
        transform-origin: 0 50%;
      }

      &:after {
        left: 0;
        width: 38%;
        transform-origin: 100% 50%;
      }
    }

    div {
      --x: 0;
      transform: translateX(var(--x));
      transition: transform 1s ease;
      position: absolute;
      left: 0;
      bottom: 8px;
      width: 300%;
    }

    svg {
      display: block;
      height: 12px;
      width: 100%;
      stroke-width: 1.2px;
      color: var(--primary);
      transition: color .5s ease;
    }
  }

  &.paused {
    &:not(.finished) {
      .percent {
        div {
          --x: -66.66%;

          svg {
            color: var(--light);
            animation: down .8s linear forwards;
          }
        }
      }

      .text {
        & > div {
          div {
            small {
              &:first-child {
                opacity: 0;
              }

              &:last-child {
                opacity: 1;
                transition-delay: .4s;
              }
            }
          }
        }
      }
    }
  }

  &.finished {
    .percent {
      background: #fff;

      span {
        opacity: 1;
        transform: translate(-20px, -19px);

        &:before,
        &:after {
          --s: 1;
          background: var(--grey-light);
          transition: background .6s ease, transform .6s ease .45s;
          animation: check .4s linear forwards .6s;
        }

        &:before {
          --r: -50deg;
        }

        &:after {
          --r: 38deg;
        }
      }

      svg {
        opacity: 0;
      }
    }

    .text {
      --y: 0;

      & > div {
        opacity: 0;
      }
    }

    nav {
      opacity: 0;
      pointer-events: none;
    }
  }

  .text {
    --y: -18px;
    position: relative;
    z-index: 1;
    transform: translateY(var(--y));
    transition: transform .6s ease;

    strong {
      font-weight: 400;
      font-size: 14px;
      display: block;
      color: var(--grey-dark);
    }

    & > div {
      position: absolute;
      left: 0;
      top: 100%;
      transform: translateY(6px);
      line-height: 20px;
      display: flex;
      align-items: center;
      transition: opacity .4s ease;

      small {
        white-space: nowrap;
        vertical-align: top;
        display: block;
        font-size: 12px;
        color: var(--grey-light);
      }

      & > small {
        width: 30px;
        text-align: center;

        &:before {
          content: counter(percent);
        }
      }

      div {
        vertical-align: top;
        display: inline-block;
        position: relative;
        margin-left: 4px;

        &:before {
          content: '';
          width: 2px;
          height: 2px;
          display: block;
          border-radius: 50%;
          background: var(--grey-light);
          display: inline-block;
          vertical-align: top;
          margin-top: 9px;
        }

        small {
          position: absolute;
          top: 0;
          left: 8px;
          transition: opacity .3s ease;

          &:first-child {
            transition-delay: .4s;
          }

          &:last-child {
            opacity: 0;
          }
        }
      }
    }
  }

  nav {
    z-index: 1;
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    transition: opacity .4s ease;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;

      &:not(:last-child) {
        margin-right: 16px;
      }

      &:first-child {
        --y: 8px;
        opacity: 0;
        transform: translateY(var(--y));
        transition: opacity .3s ease, transform .4s ease;
      }

      li {
        &:not(:last-child) {
          margin-right: 12px;
        }

        a {
          --r: 0deg;
          --s: 1.01;
          display: block;
          transform: rotate(var(--r)) scale(var(--s)) translateZ(0);
          transition: transform .6s ease, background .4s ease;

          svg {
            display: block;
            width: 14px;
            height: 14px;
            color: var(--grey-light);
          }

          &:active {
            --s: .84;
            transition: transform .3s ease, background .4s ease;
          }

          &.dots {
            --r: 90deg;
          }

          &.btn {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            position: relative;
            background: var(--lightest);

            svg {
              position: absolute;
              left: 6px;
              top: 6px;
              width: 12px;
              height: 12px;
            }

            &:hover {
              background: var(--lighter);
            }

            &.play {
              --r: 90deg;

              svg {
                &:last-child {
                  transform: scale(-1,) translateZ(0);
                }
              }

              &.active {
                --r: 0;
              }
            }

            &.cancel {
              &:before,
              &:after {
                --r: -45deg;
                content: '';
                display: block;
                width: 2px;
                border-radius: 1px;
                height: 14px;
                background: var(--grey-light);
                position: absolute;
                left: 50%;
                top: 50%;
                margin: -7px 0 0 -1px;
                transform: rotate(var(--r)) scale(.9) translateZ(0);
              }

              &:after {
                --r: 45deg;
              }
            }
          }
        }
      }
    }
  }

  &.isMobile,
  &:hover {
    nav {
      ul {
        &:first-child {
          --y: 0;
          opacity: 1;
        }
      }
    }
  }
}

@keyframes down {
  40% {
    transform: translateY(2px);
  }
}

@keyframes check {
  100% {
    background: var(--success);
  }
}

.upload {
  &.finished {
    & + .restart {
      opacity: 1;
      visibility: visible;
    }
  }
}

.restart {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: var(--grey-light);
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity .4s ease;

  svg {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    display: inline-block;
    vertical-align: top;
  }
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;

  &:before,
  &:after {
    box-sizing: inherit;
  }
}

// Center & dribbble
.upload {
  min-height: 7vh;
  font-family: Roboto, Arial;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--light);
  padding: 20px;

  .dribbble {
    position: fixed;
    display: block;
    right: 20px;
    bottom: 20px;

    img {
      display: block;
      height: 28px;
    }
  }
}
</style>
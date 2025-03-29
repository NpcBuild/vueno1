<template>
  <div class="face-container">
    <div class="face"
         :style="faceStyle"
    >
<!--      style="&#45;&#45;left-lower-rotation:20deg;&#45;&#45;left-lower-position:40%;&#45;&#45;left-upper-rotation:0deg;&#45;&#45;left-upper-position:0%;&#45;&#45;right-lower-rotation:-20deg;&#45;&#45;right-lower-position:40%;&#45;&#45;right-upper-rotation:0deg;&#45;&#45;right-upper-position:0%;&#45;&#45;face-rotation-x:0deg;&#45;&#45;face-rotation-y:0deg;&#45;&#45;face-rotation-z:0deg;"-->
      <div class="eye left">
        <div class="lower">
          <div class="lid"></div>
        </div>
        <div class="upper">
          <div class="lid"></div>
        </div>
      </div>
      <div class="eye right">
        <div class="lower">
          <div class="lid"></div>
        </div>
        <div class="upper">
          <div class="lid"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let states = {
  neutral: { //Post your other emotions as a comment
    face: {
      rotationX:0,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:0,
        position:0
      }
    },
    right: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:0,
        position:0
      }
    }
  },
  happy: {
    face: {
      rotationX:0,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:20,
        position:40
      },
      upper:{
        rotation:0,
        position:0
      }
    },
    right: {
      lower:{
        rotation:-20,
        position:40
      },
      upper:{
        rotation:0,
        position:0
      }
    }
  },
  sad: {
    face: {
      rotationX:0,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:-20,
        position:40
      }
    },
    right: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:20,
        position:40
      }
    }
  },
  close: {
    face: {
      rotationX:-20,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:0,
        position:45
      },
      upper:{
        rotation:0,
        position:45
      }
    },
    right: {
      lower:{
        rotation:0,
        position:45
      },
      upper:{
        rotation:0,
        position:45
      }
    }
  },
  angry: {
    face: {
      rotationX:-10,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:20,
        position:40
      }
    },
    right: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:-20,
        position:40
      }
    }
  },
  confused: {
    face: {
      rotationX:0,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:0,
        position:40
      }
    },
    right: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:0,
        position:0
      }
    }
  },
  suspicious: {
    face: {
      rotationX:0,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:-4,
        position:20
      },
      upper:{
        rotation:4,
        position:20
      }
    },
    right: {
      lower:{
        rotation:4,
        position:20
      },
      upper:{
        rotation:-4,
        position:20
      }
    }
  },
  pain: {
    face: {
      rotationX:0,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:10,
        position:20
      },
      upper:{
        rotation:-10,
        position:20
      }
    },
    right: {
      lower:{
        rotation:-10,
        position:20
      },
      upper:{
        rotation:10,
        position:20
      }
    }
  },
  unamused: {
    face: {
      rotationX:0,
      rotationY:0,
      rotationZ:0
    },
    left: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:0,
        position:40
      }
    },
    right: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:0,
        position:40
      }
    }
  },
  unsure: {
    face: {
      rotationX:0,
      rotationY:0,
      rotationZ:7
    },
    left: {
      lower:{
        rotation:10,
        position:20
      },
      upper:{
        rotation:-10,
        position:20
      }
    },
    right: {
      lower:{
        rotation:0,
        position:0
      },
      upper:{
        rotation:0,
        position:0
      }
    }
  }
}

// const setState = state => {
//   console.log(state);
//   if(states[state] == undefined) return;
//   // $(".face").attr("style", `
//   //       --left-lower-rotation:${states[state].left.lower.rotation}deg;
//   //       --left-lower-position:${states[state].left.lower.position}%;
//   //       --left-upper-rotation:${states[state].left.upper.rotation}deg;
//   //       --left-upper-position:${states[state].left.upper.position}%;
//   //       --right-lower-rotation:${states[state].right.lower.rotation}deg;
//   //       --right-lower-position:${states[state].right.lower.position}%;
//   //       --right-upper-rotation:${states[state].right.upper.rotation}deg;
//   //       --right-upper-position:${states[state].right.upper.position}%;
//   //       --face-rotation-x:${states[state].face.rotationX}deg;
//   //       --face-rotation-y:${states[state].face.rotationY}deg;
//   //       --face-rotation-z:${states[state].face.rotationZ}deg;
//   //   `);
// }

// let emotions = Object.keys(states);
//let index = 3;
// let previous = ["happy"];
// setState("happy");

// const nextState = () => {
//   let ind = Math.floor(Math.random()*emotions.length);
//   if(previous.indexOf(ind) != -1) return nextState();
//   previous.push(ind);
//   previous = previous.slice(-4); //Save most recent 4 states to not use
//   return ind;
// }
//
// setInterval(() => {
//   setState(emotions[nextState()])
//   //setState(emotions[index%emotions.length]);
//   //index++;
// }, 1500);
export default {
  name: "emotingEyes",
  computed: {
    faceStyle() {
      const statess = states['unsure'];
      if (!statess) return {};

      const state = 'unsure';
      return {
        '--left-lower-rotation': `${states[state].left.lower.rotation}deg`,
        '--left-lower-position': `${states[state].left.lower.position}%`,
        '--left-upper-rotation': `${states[state].left.upper.rotation}deg`,
        '--left-upper-position': `${states[state].left.upper.position}%`,
        '--right-lower-rotation': `${states[state].right.lower.rotation}deg`,
        '--right-lower-position': `${states[state].right.lower.position}%`,
        '--right-upper-rotation': `${states[state].right.upper.rotation}deg`,
        '--right-upper-position': `${states[state].right.upper.position}%`,
        '--face-rotation-x': `${states[state].face.rotationX}deg`,
        '--face-rotation-y': `${states[state].face.rotationY}deg`,
        '--face-rotation-z': `${states[state].face.rotationZ}deg`
      };
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
$eye-size: 20vmin;
$eye-gap:14vmin;
$eye-color: white;
$background:#EC87C0;
$user-button-main:#D770AD;
//:root {
  //--eye-size:20vmin;
  //--eye-gap:14vmin;
  //--eye-color:white;
  //--background:#EC87C0;
  //--user-button-main:#D770AD;
//}
body {
  min-height: 100vh;
  perspective: 25rem;
  overflow: hidden;
  .face-container {
    width:100vw;
    min-height: 100vh;
    display: grid;
    place-items: center;
    background: $background;
    @keyframes float {
      0%, 100% {
        transform:translateY(-5%);
      }
      50% {
        transform:translateY(5%);
      }
    }
  }
  .face {
    --left-lower-rotation:0deg;
    --left-lower-position:0%;
    --left-upper-rotation:0deg;
    --left-upper-position:0%;
    --right-lower-rotation:0deg;
    --right-lower-position:0%;
    --right-upper-rotation:0deg;
    --right-upper-position:0%;
    --face-rotation-x:0deg;
    --face-rotation-y:0deg;
    --face-rotation-z:0deg;
    display:grid;
    grid-template-columns: $eye-size $eye-gap $eye-size;
    grid-template-rows: $eye-size;
    grid-template-areas: "left . right";
    filter: blur(1vmin) contrast(8); //Make corners rounded, this requires a black shadow to add definition to the eye edges and then hide the black using the lighten mix-blend-mode (as pink is lighter than black the black will vanish)
    transform: translateZ(8vmin) rotateX(var(--face-rotation-x)) rotateY(var(--face-rotation-y)) rotateZ(var(--face-rotation-z));// rotateX(var(--face-rotation));
    transition: .75s cubic-bezier(.25, .5, .5, 1);
    mix-blend-mode: lighten; //Replace black with pink
    .eye {
      position: relative;
      background: white;
      border-radius:100%;
      overflow: hidden;
      box-shadow: 0 0 0 2vmin black;
      &, * {
        transition: .5s cubic-bezier(0.75, 0.25, 0.25, 0.75);
      }
      >div {
        --rotation:0deg;
        --position:0%;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        transform: rotate(var(--rotation));
        .lid {
          position: absolute;
          width:100%;
          height:100%;
          background:  black;
        }
        &.lower .lid {
          top:calc(100% - var(--position));
        }
        &.upper .lid {
          bottom:calc(100% - var(--position));
        }
      }
      &.left {
        grid-area: left;
        .lower {
          --rotation:var(--left-lower-rotation);
          --position:var(--left-lower-position);
        }
        .upper {
          --rotation:var(--left-upper-rotation);
          --position:var(--left-upper-position);
        }
      }
      &.right {
        grid-area: right;
        .lower {
          --rotation:var(--right-lower-rotation);
          --position:var(--right-lower-position);
        }
        .upper {
          --rotation:var(--right-upper-rotation);
          --position:var(--right-upper-position);
        }
      }
    }
  }
}
</style>
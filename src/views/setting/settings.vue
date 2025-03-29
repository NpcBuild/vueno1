<template>
  <div class="body">
    <div class="wrapper">
      <div class="card">
        <div class="card__header">
          <div class="toolbar">
            <div class="toolbar__item toolbar__item--close"></div>
            <div class="toolbar__item toolbar__item--min"></div>
            <div class="toolbar__item toolbar__item--max"></div>
          </div><a href="#">About</a>
        </div>
        <div class="card__body">
          <div class="container">
            <div class="grid">
              <h1>Settings</h1>
            </div>
          </div>
          <div class="container">
            <div class="grid grid--half">
              <h3>General</h3>
              <div class="form-item">
                <label class="form-item__label">Start at login</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <div class="form-item">
                <label class="form-item__label">Hide window at start up</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <div class="form-item">
                <label class="form-item__label">Keep window visible as bg app</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <div class="form-item">
                <label class="form-item__label">Keep window above other apps</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <div class="form-item">
                <label class="form-item__label">Show icon in dock</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <div class="form-item">
                <label class="form-item__label">Hide &quot;Unlock Extreme&quot; button</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <h3>Desktop Status Menu</h3>
              <div class="form-item">
                <label class="form-item__label">Use precentages</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <div class="form-item">
                <label class="form-item__label">Icon visible</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <div class="form-item">
                <label class="form-item__label">Text information</label>
                <div class="form-item__control">
                  <select class="control control--select">
                    <option selected="selected">Default</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                  </select>
                </div>
              </div>
              <div class="form-item">
                <label class="form-item__label">Text size</label>
                <div class="form-item__control">
                  <div class="radio">
                    <div class="radio__item"><span class="u-text--small">A</span></div>
                    <div class="radio__item is-active"><span class="u-text--normal">A</span></div>
                    <div class="radio__item"><span class="u-text--large">A</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="grid grid--half">
              <h3>Performance</h3>
              <div class="form-item">
                <label class="form-item__label">Threshold level</label>
                <div class="form-item__control"><small><strong><span class="slider__value">500</span><span>mb</span></strong></small></div>
                <div class="slider">
                  <input class="slider__input" type="range" value="500" min="0" max="1000"/>
                  <div class="slider__positive" style="width: 50%;"></div>
                </div>
              </div>
              <p><small>If the available memory goes below this amount, the status bar text will turn red.</small></p>
              <div class="form-item">
                <label class="form-item__label">Auto clean</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <p><small>Automatically clean when available memory drops below the above threshold. Auto clean is limited to once every 3 minutes.</small></p>
              <div class="form-item">
                <label class="form-item__label">Disable auto clean cooldown</label>
                <div class="form-item__control toggle">
                  <div class="toggle__handle"></div>
                </div>
              </div>
              <p><small>Auto clean cooldown: <strong>136 seconds</strong></small></p>
              <div class="form-item">
                <label class="form-item__label">Refresh interval</label>
                <div class="form-item__control"><small><strong><span class="slider__value">5</span><span>&nbsp;seconds</span></strong></small></div>
                <div class="slider">
                  <input class="slider__input" type="range" value="5" min="0" max="20"/>
                  <div class="slider__positive" style="width: 25%;"></div>
                </div>
              </div>
              <p><small>If the available memory goes below this amount, the status bar text will turn red.</small></p>
              <div class="buttons"><a href="#">Extras</a>
                <button class="button">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "settings",
  created() {
    console.clear();

    const toggle = document.querySelectorAll(".toggle");

    for (var i = 0; toggle.length > i; i++) {
      toggle[i].addEventListener("click", function () {
        this.classList.toggle("is-on");
      });
    }

    const radioItem = document.querySelectorAll(".radio__item");

    for (var j = 0; radioItem.length > j; j++) {
      radioItem[j].addEventListener("click", function () {
        const siblingItems = this.parentNode.getElementsByClassName("radio__item");
        for (var j = 0; siblingItems.length > j; j++) {
          siblingItems[j].classList.remove("is-active");
        }
        this.classList.toggle("is-active");
      });
    }

    const sliderInput = document.querySelectorAll(".slider__input");

    for (var k = 0; sliderInput.length > k; k++) {
      sliderInput[k].addEventListener("input", function () {
        const valueContainer = this.parentNode.parentNode.querySelector(
            ".slider__value"
        );
        const sliderValue = this.value;
        const maxVal = this.getAttribute("max");
        const posWidth = this.value / maxVal;
        this.parentNode.querySelector(".slider__positive").style.width =
            posWidth * 100 + "%";
        valueContainer.innerHTML = sliderValue;
      });
    }
  },
  mounted() {
    // 假设我们想要将当前页面的rem基准设置为14px
    const desiredFontSize = 10;
    document.documentElement.style.fontSize = `${desiredFontSize}px`;

    // 注意：这种做法会改变全局的rem基准，但如果你只在特定页面这么做，
    // 并且在该页面卸载时恢复原来的基准，那么它就不会影响到其他页面。

    // 如果你需要在页面卸载时恢复原始的font-size，
    // 可以在beforeDestroy钩子中设置回原始值，或者记录原始值并在需要时恢复。
  },
  beforeDestroy() {
    // document.documentElement.style.fontSize = originalFontSize + 'px';
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// todo 移除js设置根元素的fong-size大小，改为替换样式中的rem为vw、vh、em
$red: #EA6759;
$yellow: #FFCC00;
$green: #2DCC72;
$blue: #00a8ff;
$purple: #9c88ff;

@function dark($color) {
  @return desaturate(darken($color, 15%), 30%);
}

$primary: $purple;
$primary--dark: dark($primary);

$time: 300ms;

@import url('https://fonts.googleapis.com/css?family=Heebo:400,700');

@mixin transition {
  transition: all $time ease;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

*, *:before, *:after {
  box-sizing: inherit;
}

html, body {
  width: 100%;
  height: 100%;
}

.body {
  font-size: 1.6rem;
  font-family: 'Heebo', system-ui;
  text-shadow: 0px 1px 1px $primary--dark;
}

/deep/ body, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button{
  font-size: 1.6rem;
}

a {
  color: inherit;
}

button, input, select, textarea {
  font-family: inherit;
  &:focus, &:active {
    outline: 0;
  }
}

h1 {
  margin: 0;
}

h3 {
  margin: 4rem 0 3rem;
}

p {
  margin-bottom: 2rem;
}

.wrapper {
  margin: 4.5rem 1rem 0;
}

.card {
  display: block;
  width: 100%;
  max-width: 1200px;
  background: $primary;
  color: white;
  border-radius: .8rem;
  margin: auto auto 2rem;

  &__header {
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__body {
    padding: 5rem 7rem 7rem;
    @media screen and (max-width: 900px) {
      padding: 5rem 2rem 7rem;
    }
  }
}

.toolbar {
  &__item {
    box-shadow: inset 0px 0px 15px rgba(white, .5);
    border-radius: 50%;
    $size: 2rem;
    width: $size;
    height: $size;
    display: inline-block;
    cursor: pointer;
    @include transition;
    &:not(:last-of-type) {
      margin-right: .5rem;
    }
    &:hover, &:focus {
      transform: scale(1.1);
      box-shadow: inset 0px 0px 3px rgba(white, .1);
      @include transition;
    }
    &--close {
      background: $red;
    }
    &--min {
      background: $yellow;
    }
    &--max {
      background: $green;
    }
  }
}

.container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
}

.grid {
  flex: 1;
  padding-left: 2rem;
  padding-right: 2rem;
  position: relative;
  @media screen and (max-width: 900px) {
    max-width: 100%;
  }
}

.toggle {
  $toggleWidth: 62px;
  $toggleHeight: 32px;
  $toggleMargin: 4px;
  $toggleHandleSize: $toggleHeight - ($toggleMargin*2);
  max-width: $toggleWidth;
  height: $toggleHeight;
  background: $primary--dark;
  border-radius: 999px;
  position: relative;
  @include transition;
  cursor: pointer;
  &__handle {
    height: $toggleHandleSize;
    width: $toggleHandleSize;
    position: absolute;
    top: 50%;
    left: $toggleMargin;
    transform: translateY(-50%);
    background: white;
    border-radius: 50%;
    @include transition;
  }
  &.is-on {
    background: white;
    @include transition;
    .toggle__handle {
      left: ($toggleWidth - $toggleMargin) - $toggleHandleSize;
      background: $primary;
      @include transition;
    }
  }
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  &__control {
    width: 40%;
    text-align: right;
  }
}

.control {
  background: transparent;
  color: inherit;
  display: block;
  width: 100%;
  border-radius: .3rem;
  padding: .4rem;
  border: 1px solid rgba(white, .3);
  &:hover, &:focus {
    background: $primary--dark;
    border-color: transparent;
  }
  &--select {
    //	border: 0;
  }
}

.radio {
  display: inline-block;
  &__item {
    display: inline-block;
    color: $primary--dark;
    cursor: pointer;
    @include transition;
    &:not(:last-of-type) {
      margin-right: 1rem;
    }
    &.is-active {
      color: white;
      @include transition;
    }
  }
}

.u-text--small {
  font-size: 1.3rem;
}

.u-text--normal {
  font-size: 1.6rem;
}

.u-text--large {
  font-size: 2.2rem;
}

.slider {
  width: 100%;
  position: relative;
  &__positive {
    width: 100%;
    height: 5px;
    background: white;
    position: absolute;
    top: 80%;
    transform: translateY(-50%);
    pointer-events: none;
  }
  &__input {
    margin-top: 1rem;
    display: block;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 5px;
    background: $primary--dark;
    outline: none;
    @include transition;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 4px solid white;
      background: white;
      cursor: pointer;
      position: relative;
      @include transition;
      &:focus, &:active {
        box-shadow: 0px 3px 12px rgba(black, .2);
        @include transition;
      }
    }
  }
}

.button {
  border: 0;
  background: white;
  color: $primary;
  text-transform: uppercase;
  letter-spacing: .05em;
  font-weight: 700;
  border-radius: .4rem;
  padding: .6rem 1.4rem;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  &:hover, &:focus {
    background: $primary--dark;
    color: white;
    @include transition;
  }
}

.buttons {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-top: 3rem;
  .button {
    margin-left: 1rem;
  }
}

// Credits
.credits {
  position: fixed;
  width: 100%;
  background: black;
  color: white;
  text-align: center;
  bottom: 0;
  padding: 0 1.5rem;
}

.link--dribbble {
  color: #ea4c89;
}
</style>
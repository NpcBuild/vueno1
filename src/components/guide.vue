<template>
  <div class="overlay-tip">
    <div class="overlay-tip__shadow" />

    <div
        v-if="rect"
        class="overlay-tip__target"
        :style="dynamicStyle"
    >
      <div ref="overlayDialog" class="overlay-tip__dialog">
        <Component
            :is="currentElement.slot.component"
            v-if="currentElement.slot && currentElement.slot.component"
            v-bind="currentElement.slot.props"
            v-on="currentElement.slot.listeners"
        />

        <img
            v-if="currentElement.image"
            class="overlay-tip__dialog-image"
            :src="currentElement.image"
            alt="image"
        >

        <div v-if="currentElement.text" class="overlay-tip__dialog-content">
          <div
              v-if="isShowSign"
              class="overlay-tip__dialog-title"
          >
            {{ signText }}
          </div>
          <div class="overlay-tip__dialog-text">
            {{ currentElement.text }}
          </div>
        </div>

        <div class="overlay-tip__dialog-footer">
                    <span class="overlay-tip__dialog-count">
                        {{ currentIndex + 1 }}<span>/{{ total }}</span>
                    </span>

          <button
              v-show="currentIndex !== 0"
              id="btn-pre"
              :class="['btn', `btn--${getBtnType('pre')}`]"
              @click="toPrev"
          >
            {{ getBtnText('pre') }}
          </button>

          <button
              id="btn-next"
              :class="['btn', `btn--${getBtnType(`${isLast ? 'confirm' : 'next'}`)}`]"
              @click="toNext"
          >
            {{ getBtnText(`${isLast ? 'confirm' : 'next'}`) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverlayTip',

  props: {
    elements: {
      type: Array,
      required: true,
    },

    config: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      currentIndex: 0,
      rect: null,
      originRectList: [],
    };
  },

  computed: {
    currentElement() {
      const { elements, currentIndex } = this;

      return elements[currentIndex];
    },

    total() {
      const { elements } = this;

      return elements.length;
    },

    isLast() {
      const { total, currentIndex } = this;

      return currentIndex === total - 1;
    },

    isShowSign() {
      const { currentElement } = this;

      return currentElement?.sign?.show ?? false;
    },

    signText() {
      const { currentElement } = this;

      return currentElement?.sign?.text ?? '小贴士';
    },

    dynamicStyle() {
      const {
        config,
        rect: { x, y, width, height },
        currentElement: { dialogWidth },
      } = this;

      return {
        '--top': y,
        '--left': x,
        '--width': width,
        '--height': height,

        '--dialog-width': dialogWidth || 322,
        '--mask-color-r': config?.mask?.r ?? 0,
        '--mask-color-g': config?.mask?.g ?? 0,
        '--mask-color-b': config?.mask?.b ?? 0,
        '--mask-color-a': config?.mask?.a ?? 0.3,

        '--element-border-radius': config?.element?.borderRadius ?? '4px',

        '--element-border-color-r': config?.element?.borderColor?.r ?? 33,
        '--element-border-color-g': config?.element?.borderColor?.g ?? 33,
        '--element-border-color-b': config?.element?.borderColor?.b ?? 33,
        '--element-border-color-a': config?.element?.borderColor?.a ?? 0.3,

        '--dialog-bg-color-r': config?.dialog?.bgColor?.r ?? 255,
        '--dialog-bg-color-g': config?.dialog?.bgColor?.g ?? 255,
        '--dialog-bg-color-b': config?.dialog?.bgColor?.b ?? 255,
        '--dialog-bg-color-a': config?.dialog?.bgColor?.a ?? 1,

        '--dialog-font-color': config?.dialog?.fontColor ?? '#000',
      };
    },
  },

  watch: {
    currentIndex: {
      handler(newIndex, oldindex) {
        const { render } = this;

        render(newIndex, oldindex);
      },
      immediate: true,
    },
  },

  mounted() {
    const { initRect, keyboardEvent } = this;

    initRect();

    window.addEventListener('keyup', keyboardEvent);
  },

  destroyed() {
    const { keyboardEvent } = this;

    window.removeEventListener('keyup', keyboardEvent);
  },

  methods: {
    render(newIndex, oldindex) {
      const {
        currentIndex,
        originRectList,
        currentElement: { placement = 'right-top' },
        setDiologPos,
      } = this;

      this.rect = originRectList[currentIndex];

      const { rect: { width, height, top } } = this;

      if (placement === 'left-top') {
        setDiologPos({
          top: 0,
          bottom: 'auto',
          left: 'auto',
          right: `${width + 20}px`,
        });
      };

      if (placement === 'left-bottom') {
        setDiologPos({
          top: `${height}px`,
          bottom: 'auto',
          left: 'auto',
          right: `${width + 20}px`,
        });
      };

      if (placement === 'right-top') {
        setDiologPos({
          top: 0,
          bottom: 'auto',
          left: `${width + 20}px`,
          right: 'auto',
        });
      };

      if (placement === 'right-bottom') {
        setDiologPos({
          top: `${height}px`,
          bottom: 'auto',
          left: `${width + 20}px`,
          right: 'auto',
        });
      };

      if (placement === 'top-left') {
        setDiologPos({
          top: 'auto',
          bottom: `${height + 20}px`,
          left: 0,
          right: 'auto',
        });
      };

      if (placement === 'top-right') {
        setDiologPos({
          top: 'auto',
          bottom: `${height + 20}px`,
          left: 'auto',
          right: 0,
        });
      };

      if (placement === 'bottom-left') {
        setDiologPos({
          top: `${height + 20}px`,
          bottom: 'auto',
          left: 0,
          right: 'auto',
        });
      };

      if (placement === 'bottom-right') {
        setDiologPos({
          top: `${height + 20}px`,
          bottom: 'auto',
          left: 'auto',
          right: 0,
        });
      };

      if (top > window.innerHeight - 200) {
        window.scrollTo({
          top: top - 200,
          behavior: 'smooth',
        });
      };

      if (newIndex < oldindex && originRectList[oldindex].top - originRectList[newIndex].top > 300) {
        window.scrollTo({
          top: top - 300,
          behavior: 'smooth',
        });
      };
    },

    initRect() {
      const { elements, updateRect } = this;

      this.originRectList = Array.from(elements.map(({ target }) => {
        const el = typeof target === 'string' ? document.querySelector(target) : target?.$el;

        return el.getBoundingClientRect();
      }));

      updateRect();
    },

    toPrev() {
      this.currentIndex -= 1;
    },

    toNext() {
      const { isLast } = this;

      if (isLast) {
        this.$emit('confirm');
      } else {
        this.currentIndex += 1;
      }
    },

    updateRect() {
      const { currentElement: { target } } = this;

      const el = typeof target === 'string' ? document.querySelector(target) : target?.$el;

      this.rect = el.getBoundingClientRect();
    },

    getBtnType(type) {
      const { config } = this;

      return config?.btn?.[type]?.type ?? 'default';
    },

    getBtnText(type) {
      const { config } = this;

      return config?.btn?.[type]?.text ?? {
        pre: '上一条',
        next: '下一条',
        confirm: '知道啦',
      }[type];
    },

    keyboardEvent({ keyCode }) {
      const { total, currentIndex } = this;

      if (keyCode === 37 && currentIndex !== 0) {
        document.getElementById('btn-pre').focus();
      }
      if (keyCode === 39 && currentIndex !== total - 1) {
        document.getElementById('btn-next').focus();
      }
      if (keyCode === 13 && currentIndex === 0) {
        document.getElementById('btn-next').focus();
      }
    },

    setDiologPos({ top, bottom, left, right } = {}) {
      const elStyle = this.$refs.overlayDialog.style;

      elStyle.right = right;
      elStyle.top = top;
      elStyle.left = left;
      elStyle.bottom = bottom;
    },
  },
};
</script>

<style lang="scss">
.overlay-tip {
  &__shadow {
    position: fixed;

    height: 100%;
  }

  &__target {
    position: absolute;
    top: calc(var(--top) * 1px - 2px);
    left: calc(var(--left) * 1px - 2px);

    border-radius: var(--element-border-radius);
    width: calc(var(--width) * 1px + 4px);
    height: calc(var(--height) * 1px + 4px);

    color: var(--dialog-font-color);

    box-shadow: 0 0 0 1000vw rgba(var(--mask-color-r), var(--mask-color-g), var(--mask-color-b), var(--mask-color-a)),
    0 0 1px 2px rgba(var(--element-border-color-r), var(--element-border-color-g), var(--element-border-color-b) , var(--element-border-color-a));

    transition: all .4s ease;
  }

  &__dialog {
    position: absolute;
    top: 0;
    left: calc(100% + 12px);

    border-radius: 8px;
    width: calc(var(--dialog-width) * 1px);

    font-size: 14px;

    background-color: rgba(var(--dialog-bg-color-r), var(--dialog-bg-color-g), var(--dialog-bg-color-b), var(--dialog-bg-color-a));

    &-image {
      display: block;

      width: 100%;
    }

    &-content {
      padding: 16px 24px 24px;
    }

    &-title {
      display: flex;

      margin-bottom: 12px;
      border-radius: 9px 9px 9px 0;
      width: 50px;
      height: 18px;

      font-size: 12px;

      color: #fff;
      background-color: #d16817;

      align-items: center;
      justify-content: center;
    }

    &-text {
      font-weight: 500;
    }

    &-footer {
      display: flex;

      padding: 18px 24px;

      align-items: center;

      .btn {
        margin-left: 6px;

        cursor: pointer;
      }

      .btn--text {
        border: none;

        color: #0c6bc9;
        background-color: transparent;

        transition: all .3s ease;
      }
      .btn--text:hover {
        color: #5aaded;
      }

      .btn--default {
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        padding: 3px 7px;

        color: rgba(0,0,0,.65);
        background-color: #fff;

        transition: all .3s cubic-bezier(.645,.045,.355,1);
      }
      .btn--default:hover {
        border: 1px solid #0c6bc9;

        color: #0c6bc9;
      }

      .btn--primary {
        border: 1px solid #1890ff;
        border-radius: 4px;
        padding: 3px 7px;

        color: #fff;
        background-color: #1890ff;

        transition: all .3s ease;
      }
      .btn--primary:hover {
        background-color: #0c6bc9;
      }

      .btn--danger {
        border: 1px solid #d92424;
        border-radius: 4px;
        padding: 3px 7px;

        color: #fff;
        background-color: #d92424;

        transition: all .3s ease;
      }
      .btn--danger:hover {
        background-color: #ff4d4f;
      }
    }

    &-count {
      margin-right: auto;
    }
  }
}

</style>
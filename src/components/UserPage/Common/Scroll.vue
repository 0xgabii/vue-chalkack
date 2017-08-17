<template>
  <div class="vScroll" :id="`scroll-${this.id}`">

    <div class="vScroll__content" :style="contentStyle">
      <slot />
    </div>

    {{ scrollPercent }}
    
    <div class="vScroll__rail vScroll__rail--x">
      <div 
        class="vScroll__bar vScroll__bar--x" 
        :style="scrollStyle.x"
      />
    </div>
  
    <div class="vScroll__rail vScroll__rail--y">
      <div 
        class="vScroll__bar vScroll__bar--y" 
        :style="scrollStyle.y" 
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scroll',
  props: {
    horizontal: {
      type: Boolean,
      default: true,
    },
    vertical: {
      type: Boolean,
      default: true,
    },
    scrollAtOnce: {
      type: Number,
      default: 100,
    },
  },
  data: () => ({
    id: 0,

    xScroll: 0,
    yScroll: 0,

    scrollOption: {},
  }),
  computed: {
    root() {
      return `#scroll-${this.id}`;
    },
    scrollPercent() {
      const { xScroll, yScroll } = this;
      const { maxScrollWidth, maxScrollHeight } = this.scrollOption;

      return {
        x: (xScroll / maxScrollWidth) * 100,
        y: (yScroll / maxScrollHeight) * 100,
      };
    },
    contentStyle() {
      const { xScroll, yScroll } = this;

      return {
        transform: `translate(${-xScroll}px, ${-yScroll}px)`,
      };
    },
    scrollStyle() {
      const {
        x: xScrollPercent,
        y: yScrollPercent,
      } = this.scrollPercent;
      const {
        clientWidth,
        clientHeight,
        scrollWidth,
        scrollHeight,
      } = this.scrollOption;

      /*
        Exact size of the scrollbar
        visible part * (visible part / scroll part)
      */
      const barSize = {
        x: clientWidth * (clientWidth / scrollWidth),
        y: clientHeight * (clientHeight / scrollHeight),
      };
      /*
        Exact position of the scrollbar
        (visible part - scrollbar size) * (scrolling percentage / 100)
      */
      const barPosition = {
        x: (clientWidth - barSize.x) * (xScrollPercent / 100),
        y: (clientHeight - barSize.y) * (yScrollPercent / 100),
      };

      return {
        x: {
          width: `${barSize.x}px`,
          left: `${barPosition.x}px`,
        },
        y: {
          height: `${barSize.y}px`,
          top: `${barPosition.y}px`,
        },
      };
    },
  },
  methods: {
    moveX(scroll) {
      const { maxScrollWidth } = this.scrollOption;

      if (this.xScroll + scroll <= 0) {
        this.xScroll = 0;
      } else if (this.xScroll + scroll >= maxScrollWidth) {
        this.xScroll = maxScrollWidth;
      } else {
        this.xScroll += scroll;
      }
    },
    moveY(scroll) {
      const { maxScrollHeight } = this.scrollOption;

      if (this.yScroll + scroll <= 0) {
        this.yScroll = 0;
      } else if (this.yScroll + scroll >= maxScrollHeight) {
        this.yScroll = maxScrollHeight;
      } else {
        this.yScroll += scroll;
      }
    },
    handleWheel(e) {
      const { vertical, horizontal, scrollAtOnce } = this;
      const delta = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) * scrollAtOnce;

      if (vertical && horizontal) {
        this.moveY(delta);
      } else if (vertical && !horizontal) {
        this.moveY(delta);
      } else {
        this.moveX(delta);
      }
    },
    handleResize() {
      const {
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
      } = document.querySelector(this.root);

      this.scrollOption = {
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
        maxScrollWidth: Math.max(0, scrollWidth - clientWidth),
        maxScrollHeight: Math.max(0, scrollHeight - clientHeight),
      };
    },
  },
  mounted() {
    // eslint-disable-next-line
    this.id = this._uid;

    window.addEventListener('resize', this.handleResize);

    this.$nextTick(() => {
      const root = document.querySelector(this.root);
      root.addEventListener('mousewheel', this.handleWheel);
      root.addEventListener('DOMMouseScroll', this.handleWheel);
      this.handleResize();
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

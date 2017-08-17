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

    scroll: {
      x: 0,
      y: 0,
    },

    scrollEnv: {
      scrollWidth: 0,
      scrollHeight: 0,
      clientWidth: 0,
      clientHeight: 0,
      maxScrollWidth: 0,
      maxScrollHeight: 0,
    },
  }),
  computed: {
    root() {
      return `#scroll-${this.id}`;
    },
    scrollPercent() {
      const { x, y } = this.scroll;
      const { maxScrollWidth, maxScrollHeight } = this.scrollEnv;

      return {
        x: (x / maxScrollWidth) * 100,
        y: (y / maxScrollHeight) * 100,
      };
    },
    contentStyle() {
      const { x, y } = this.scroll;

      return {
        transform: `translate(${-x}px, ${-y}px)`,
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
      } = this.scrollEnv;

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
    moveBar(newScroll, category) {
      const { maxScrollWidth, maxScrollHeight } = this.scrollEnv;

      const minScroll = 0;
      const maxScroll = category === 'x' ? maxScrollWidth : maxScrollHeight;

      const currentScroll = this.scroll[category];

      if (currentScroll + newScroll <= minScroll) {
        this.scroll[category] = 0;
      } else if (currentScroll + newScroll >= maxScroll) {
        this.scroll[category] = maxScroll;
      } else {
        this.scroll[category] += newScroll;
      }
    },
    handleWheel(e) {
      const { vertical, horizontal, scrollAtOnce } = this;
      const delta = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) * scrollAtOnce;

      if (vertical && horizontal) {
        this.moveBar(delta, 'y');
      } else if (vertical && !horizontal) {
        this.moveBar(delta, 'y');
      } else {
        this.moveBar(delta, 'x');
      }
    },
    handleResize() {
      const {
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
      } = document.querySelector(this.root);

      this.scroll = {
        x: 0,
        y: 0,
      };

      this.scrollEnv = {
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

<template>
  <div class="vScroll" :id="`scroll-${this.id}`">
    <div class="vScroll__content">
      <slot />
    </div>

    <div class="vScroll__bar--x" :bar="scrollPercent" />
    <div class="vScroll__bar--y" />
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
  },
  data: () => ({
    id: 0,
    scroll: 0,
    scrollOption: {},
  }),
  computed: {
    root() {
      return `#scroll-${this.id}`;
    },
    scrollPercent() {
      return (this.scroll / -this.scrollOption.scrollWidth) * 100;
    },
  },
  methods: {
    handleWheel(e) {
      const content = document.querySelector(`${this.root} .vScroll__content`);
      const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) * 150;

      console.log(this.scroll + delta);

      if (this.scroll + delta >= 0) {
        this.scroll = 0;
      } else if (this.scroll + delta <= -this.scrollOption.scrollWidth) {
        this.scroll = -this.scrollOption.scrollWidth;
      } else {
        this.scroll += delta;
      }

      content.style.transform = `translateX(${this.scroll}px)`;
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
};
</script>

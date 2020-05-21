<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        v-for="(item,index) in dots"
        :key="index"
        :class="{active: currentPageIndex === index}"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import slider from "@better-scroll/slide";
import { addClass } from "@/assets/js/dom";
BScroll.use(slider);
export default {
  name: "Slider",
  data() {
    return {
      slider: null,
      dots: [],
      currentPageIndex: 0,
      playTimer: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted() {
    // 浏览器17毫秒刷新
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      // if (this.autoPlay) {
      //   this._play();
      // }
    }, 20);

    window.addEventListener("resize", () => {
      if (!this.slide) {
        return;
      }
      this._setSliderWidth(true);
      this.slide.refresh();
    });
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");

        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _initSlider() {
      clearTimeout(this.playTimer);
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        slide: {
          loop: this.loop,
          threshold: 100
        },
        useTransition: true,
        momentum: false,
        bounce: false,
        probeType: 2
      });
      this.slider.on("scrollEnd", this._onScrollEnd);
      this.slider.on("beforeScrollStart", () => {
        clearTimeout(this.playTimer);
      });
      // user touched the slide done
      this.slider.on("scrollEnd", () => {
        this.autoGoNext();
      });
      this.slider.on("slideWillChange", page => {
        this.currentPageIndex = page.pageX;
      });
      this.autoGoNext();
    },
    nextPage() {
      this.slider.next();
    },
    prePage() {
      this.slider.prev();
    },
    _onScrollEnd() {
      this.autoGoNext();
    },
    autoGoNext() {
      clearTimeout(this.playTimer);
      this.playTimer = setTimeout(() => {
        this.nextPage();
      }, 4000);
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;

        img {
          display: block;
          width: 100%;
        }
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>

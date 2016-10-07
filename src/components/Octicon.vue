<template>
  <svg version="1.1" :class="clazz" :role="label ? 'img' : 'presentation'" :aria-label="label" :width="width" :height="height" :viewBox="box" :style="style">
    <path :d="icon.d" />
  </svg>
</template>

<style>
.octicon {
  display: inline-block;
  fill: currentColor;
}

.octicon.flip-horizontal {
  transform: scale(-1, 1);
}

.octicon.flip-vertical {
  transform: scale(1, -1);
}

.octicon.spin {
  animation: octicon-spin 1s 0s infinite linear;
}

@keyframes octicon-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
import { warn } from '../util'

let icons = {}

export default {
  props: {
    name: {
      type: String,
      required: true,
      validator: function (val) {
        return val in icons
      }
    },
    scale: [Number, String],
    spin: Boolean,
    flip: {
      validator: function (val) {
        return val === 'horizontal' || val === 'vertical'
      }
    },
    label: String
  },
  computed: {
    normalizedScale() {
      let scale = this.scale
      scale = typeof scale === 'undefined' ? 1 : Number(scale)
      if (isNaN(scale) || scale <= 0) {
        warn(`Invalid prop: prop "scale" should be a number over 0.`, this)
        return 1
      }
      return scale
    },
    clazz() {
      return {
        'octicon': true,
        spin: this.spin,
        'flip-horizontal': this.flip === 'horizontal',
        'flip-vertical': this.flip === 'vertical'
      }
    },
    icon() {
      return icons[this.name]
    },
    box() {
      return `0 0 ${this.icon.width} ${this.icon.height}`
    },
    width() {
      return this.icon.width * this.normalizedScale
    },
    height() {
      return this.icon.height  * this.normalizedScale
    },
    style() {
      if (this.normalizedScale === 1) {
        return false
      }
      return {
        fontSize: this.normalizedScale + 'em'
      }
    }
  },
  register: function (data) {
    for (let name in data) {
      icons[name] = data[name]
    }
  },
  icons
}
</script>

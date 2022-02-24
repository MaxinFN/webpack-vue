<template>
  <div>
    <div
      v-drag
      class="box"
      @mousemove="handleMove"
    >
      {{ count ? count : '' }}
    </div>
    <div>
      <svg style="background-color: blue;"  width="300" height="300" version="1.1">
        <g transform=" scale(0.5)">
          <circle
            cx="50"
            cy="50"
            r="49"
            stroke="white"
            stroke-width="1" fill="red"
          />
          <animateMotion
            path="M100,50 100,200 M100,100"
            begin="0s"
            rotate="auto"
            dur="5s"
            repeatCount="indefinite"
          />
        </g>
        <!-- <path d="M73.8616812,68.8664775
            L74.5015359,74.5939423
            L68.1746283,71.7969507
            C66.2299599,72.4159872 64.1377269,72.7711218 61.9444643,72.7711218
            C51.9719158,72.7711218 43.8883163,65.7823167 43.8883163,57.1611168
            C43.8883163,48.5399169 51.9719158,41.5511118 61.9444643,41.5511118
            C80,61.8286883 77.6181486,66.006419 73.8616812,68.8664775"
            id="Fill-1"
            fill="#FFFFFF"> -->
      <!-- </path> -->
      </svg>
    </div>
  </div>
</template>
<script>
import * as utils from '../utils/utils.js'
export default {
  data () {
    return {
      count: 0,
      move: utils.deBounce(this.countUpdate, 500)
    }
  },
  created () {
    console.log(utils)
  },
  methods: {
    handleMove () {
      // console.log(utils)
      // const move = utils.deBounce(this.countUpdate, 500)
      this.countUpdate()
    },
    countUpdate: utils.deBounce(function () {
      console.log(this)
      console.log(this.count)
      this.count++
    }, 500)
  }
}
</script>
<style lang="scss">
.box {
  width: 220px;
  height: 220px;
  background-color: #f40;
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>

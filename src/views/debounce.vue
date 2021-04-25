<template>
  <div>
    <div
      v-drag
      class="box"
      @mousemove="handleMove"
    >
      {{ count ? count : '' }}
    </div>
    123131312313
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

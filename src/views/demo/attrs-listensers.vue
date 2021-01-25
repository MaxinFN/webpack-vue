<template>
  <div>
    <el-input
      v-model="value"
      @input="$emit('input', value)"
    />
  </div>
</template>
<script>
export default {
  model: {
    prop: 'initValue',
    event: 'input'
  },
  props: {
    initValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      value: this.initValue
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 20%;
  /deep/ .el-input__inner{
    border-top: none;
    border-left: none;
  }
}
</style>

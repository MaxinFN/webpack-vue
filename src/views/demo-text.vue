<template>
  <div>
    <h2>我是demo-text插槽</h2>
    <slot
      name="a"
      :row="val"
    >
      <slot name="b">
        bbb
      </slot>
      <slot name="c">
        ccc
      </slot>
    </slot>
    <!-- <slot>默认插槽</slot>
    <slot name="a">
      具名插槽a
      <el-input
        v-model="val"
        type="text"
      />
    </slot> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      val: {
        a: 123,
        b: 321
      }
    }
  }
}
</script>

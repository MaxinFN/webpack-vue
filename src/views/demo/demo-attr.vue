<template>
  <div>
    <attrs-listensers
      v-model="value"
    />
    <div>
      value: {{ value }}
    </div>
  </div>
</template>
<script>
import AttrsListensers from './attrs-listensers.vue'
export default {
  components: {
    AttrsListensers
  },
  data () {
    return {
      value: '父组件'
    }
  },
  created () {
    console.log('this', this)
  },
  watch: {
    value (val) {
      console.log('val----', val)
    }
  }
}
</script>

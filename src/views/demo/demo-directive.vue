<template>
  <div v-resize:[direction].quite="reSizeCallBack">
    {{ height }}
  </div>
</template>
<script>
export default {
  // directives: {
  //   resize: {
  //     inserted (el, binding, vnode) {
  //       const callback = binding.value
  //       const direction = binding.arg
  //       const modifiers = binding.modifiers
  //       const result = () => {
  //         return direction === 'vertical' ? window.innerHeight : window.innerWidth
  //       }
  //       window.addEventListener('resize', () => callback(result()))
  //       if (!modifiers || !modifiers.quite) {
  //         callback(result())
  //       }
  //       el._onResize = callback
  //     },
  //     unbind (el, binding, vnode) {
  //       if (!el._onResize) return
  //       window.removeEventListener('resize', el._onResize)
  //       delete el._onResize
  //     }
  //   }
  // },
  data () {
    return {
      direction: 'vertical',
      height: 0
    }
  },
  methods: {
    reSizeCallBack (value) {
      this.height = value
    }
  }
}
</script>

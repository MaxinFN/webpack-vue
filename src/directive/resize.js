// 简单的resize指令
// direction 的值为vertical计算垂直高度，否则是水平高度
// modifiers为修饰符，指令后跟.quite的修饰符不立即执行
export default {
  resize: {
    inserted (el, binding) {
      const callback = binding.value
      const direction = binding.arg
      const modifiers = binding.modifiers

      const result = () => {
        return direction === 'vertical' ? window.innerHeight : window.innerWidth
      }
      window.addEventListener('resize', () => callback(result()))
      if (!modifiers || !modifiers.quite) callback(result())
      el._onResize = callback
    },
    unbind (el, binding) {
      if (!el._onResize) return
      window.removeEventListener('resize', el._onResize)
      delete el._onResize
    }
  }
}

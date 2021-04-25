export default {
  drag: {
    inserted (el, binding) {
      el.style.cursor = 'move'

      let mouseX // 鼠标x轴开始位置
      let mouseY // 鼠标y轴开始位置
      let targetLeft // 拖拽目标初始left
      let targetTop // 拖拽目标初始top

      const screenWidth = document.body.clientWidth || document.body.offsetWidth // 屏幕宽度
      const screenHeight = window.innerHeight // 屏幕高度
      const maxWidth = screenWidth - el.offsetWidth
      const maxHeight = screenHeight - el.offsetHeight

      // 鼠标按下
      const onMouseDown = function (event) {
        el.style.position = 'relative'
        const e = event || window.event
        mouseX = e.clientY
        mouseY = e.clientX
        targetLeft = el.offsetLeft
        targetTop = el.offsetTop
      }

      // 鼠标移动
      const onMouseMove = function (event) {
        const e = event || window.event
        e.preventDefault()
        console.log('e---', e)
        const moveX = e.clientY
        const moveY = e.clientX
        let diffX = targetLeft + moveX - mouseX
        let diffY = targetTop + moveY - mouseY
        if (diffX >= maxWidth) {
          diffX = maxWidth
        }
        if (diffY >= maxHeight) {
          diffY = maxHeight
        }
        if (diffX <= 0) {
          diffX = 0
        }
        if (diffY <= 0) {
          diffY = 0
        }
        el.style.left = diffX + 'px'
        el.style.top = diffY + 'px'
        console.log('e-----onMouseMove', diffX, diffY)
      }
      el._onMouseDown = onMouseDown
      el._onMouseMove = onMouseMove
      el.addEventListener('mousedown', onMouseDown)
      el.addEventListener('mousemove', onMouseMove)
      // window.addEventListener('resize', function (e) {
      //   screenWidth = document.body.clientWidth || document.body.offsetWidth
      //   screenHeight = document.body.clientHeight || document.body.offsetHeight
      //   maxWidth = screenWidth - el.offsetWidth
      //   maxHeight = screenHeight - el.offsetHeight
      // })
    },
    unbind (el) {
      if (!el._onMouseDown && !el.onMouseMove) return
      if (el._onMouseDown) {
        el.removeEventListener('mousedown', el._onMouseDown)
        delete el._onMouseDown
      }
      if (el._onMouseMove) {
        el.removeEventListener('mousedown', el._onMouseMove)
        delete el._onMouseMove
      }
    }
  }
}

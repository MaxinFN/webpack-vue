<!--
 * @Author: your name
 * @Date: 2020-08-18 19:51:46
 * @LastEditTime: 2021-08-04 15:30:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\src\app.vue
-->
<template>
  <div
    id="app"
    ref="demo"
  >
    <button @click="dowmload">
      click-button
    </button>
    <router-view />
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import canvasToImage from './Canvas2Image'
export default {
  name: 'App',
  data () {
    return {
      text: 'I am Vue'
    }
  },
  methods: {
    dowmload () {
      const downloadContent = this.$refs.demo
      console.log('downloadContent', downloadContent)
      const width = downloadContent.offsetWidth
      const height = downloadContent.offsetHeight
      const canvas = document.createElement('canvas')
      const scale = 2
      canvas.width = width * 2
      canvas.height = height * scale
      canvas.getContext('2d').scale(scale, scale)
      const opts = {
        scale: scale,
        canvas: canvas,
        // 日志开关，便于查看html2canvas的内部执行流程
        // logging: true,
        width: width,
        height: height,
        // 避免下载不全
        backgroundColor: null,
        // 【重要】开启跨域配置
        useCORS: true
      }
      html2canvas(downloadContent, opts).then(canvas => {
        const context = canvas.getContext('2d')
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false
        const img = canvasToImage.convertToJPEG(canvas, canvas.width, canvas.height)
        console.log('img---', img)
        // const dataURL = canvas.toDataURL('image/png')
        // console.log('dataURL---', dataURL)
        // 下载图片
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = img.src
        // 设置下载标题
        a.download = 'aaa'
        a.click()
      })
    }
  }
}
</script>

<style lang="sass" scoped>
</style>

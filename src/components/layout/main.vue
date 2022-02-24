<!--
 * @Author: your name
 * @Date: 2021-04-27 18:02:24
 * @LastEditTime: 2021-07-27 15:56:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\src\components\layout\main.vue
-->
<template>
  <el-container id="demo-layout">
    <el-side class="layout-side">
      <w-side-menu />
    </el-side>
    <el-container class="right-container">
      <el-header class="container-header">
        <div class="container-header-content">
          container-header
        </div>
      </el-header>
      <el-main class="container-content">
        <div class="container-content-item">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import WSideMenu from './side-menu'
export default {
  components: {
    WSideMenu
  },
  data () {
    return {}
  }
}
</script>

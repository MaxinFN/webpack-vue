<!--
 * @Author: your name
 * @Date: 2021-04-27 18:38:17
 * @LastEditTime: 2021-07-27 14:24:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\src\components\layout\side-menu.vue
-->
<template>
  <div class="w-side-menu">
    <w-collapse-aside
      :menus="menus"
      :collapsed="collapse"
    />
  </div>
</template>
<script>
import WCollapseAside from './menu'
export default {
  components: {
    WCollapseAside
  },
  data () {
    return {
      menus: null,
      collapse: false
    }
  }
}
</script>

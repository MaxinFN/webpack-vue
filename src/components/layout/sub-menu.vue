<!--
 * @Author: your name
 * @Date: 2021-04-27 19:01:34
 * @LastEditTime: 2021-07-27 14:50:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \m\src\components\layout\sub-menu.vue
-->
<template>
  <!-- 外面包装一层div,防止collapse为true时内存溢出的情况 -->
  <div>
    <el-submenu
      v-if="menu.children"
      :index="getMenuKey(menu)"
    >
      <template slot="title">
        <i
          :class="menu.icon"
        />
        <span>
          {{ menu.name }}
        </span>
      </template>
      <el-menu-item
        v-for="item in menu.children"
        :key="item.id"
        :index="getMenuKey(item)"
      >
        {{ item.name }}
      </el-menu-item>
    </el-submenu>
    <el-menu-item
      v-else
      :index="getMenuKey(menu)"
    >
      <span slot="title">
        <i :class="menu.icon" />
        {{ menu.name }}
      </span>
    </el-menu-item>
  </div>
</template>
<script>
export default {
  props: {
    menu: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {}
  },
  methods: {
    getMenuKey (menu) {
      return menu.menuKey || menu.routePath || menu.path || menu.name
    }
  }
}
</script>

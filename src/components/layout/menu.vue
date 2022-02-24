<template>
  <el-menu
    :collapse="collapsed"
    :default-active="showActive"
    @select="select"
  >
    <template
      v-for="item in menuList"
    >
      <w-sub-menu
        :key="item.id"
        :menu="item"
      />
    </template>
  </el-menu>
</template>
<script>
import WSubMenu from './sub-menu.vue'
import MenuJson from './menu.json'
export default {
  name: 'WMenu',
  title: '菜单组件',
  desc: '菜单组件',
  components: {
    WSubMenu
  },
  props: {
    menus: {
      type: Array,
      default: () => ([])
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menuList: []
    }
  },
  computed: {
    allMenuList () {
      return this.turnTreeToArray(this.menuList)
    },
    showActive () {
      const showMenu = this.allMenuList.find(item => item.path === this.$route.path) || {}
      return showMenu.path
    }
  },
  created () {
    this.initMenu()
  },
  methods: {
    async initMenu () {
      const data = await this.getMenu()
      console.log('data-----', data)
      this.menuList = data
    },
    getMenu () {
      return new Promise((resolve, reject) => {
        resolve(MenuJson)
      })
    },
    select (path) {
      console.log('select----path', path)
      if (path !== this.$route.path) {
        this.$router.push(path)
      }
    },
    arrToTree (arr, parentId) {
      if (!Array.isArray(arr)) return
      const result = []
      const itemMap = {}
      for (const item of arr) {
        const id = item.id
        const pid = item.pid
        if (!itemMap[id]) {
          itemMap[id] = {
            children: []
          }
        }
        itemMap[id] = {
          ...item,
          children: itemMap[id].children
        }
        const treeItem = itemMap[id]
        if (pid === parentId) {
          result.push(treeItem)
        } else {
          if (!itemMap[pid]) {
            itemMap[pid] = {
              children: []
            }
          }
          itemMap[pid].children.push(treeItem)
        }
      }
      return result
    },
    turnTreeToArray (arr, childrenKey = 'children', hasParse = false) {
      if (!hasParse) { arr = JSON.parse(JSON.stringify(arr)) }
      let rt = []
      if (!Array.isArray(arr)) { arr = [arr] }
      arr.forEach(item => {
        const children = item[childrenKey]
        if (!hasParse) { delete item[childrenKey] }
        rt.push(item)
        if (children && children.length) {
          rt = rt.concat(this.turnTreeToArray(children, childrenKey, 1))
        }
      })
      return rt
    }
  }
}
</script>

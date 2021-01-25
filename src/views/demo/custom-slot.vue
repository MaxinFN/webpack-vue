<template>
  <div>
    <div
      v-if="loadding"
      style="color: #f33"
    >
      Loadding~~~~~~~拼命加载中
    </div>
    <slot
      v-else
      :data="slotData"
    >
      子组件默认的内容
    </slot>
    <div>
      <slot
        v-if="hasContent"
        name="content"
      >
        子组件slot默认的content
      </slot>
    </div>
    <div>
      <slot
        v-if="hasFooter"
        name="footer"
      >
        子组件slot默认的 footer
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loadding: true,
      slotData: {
      },
      hasContent: false,
      hasFooter: false
    }
  },
  created () {
    setTimeout(() => {
      this.slotData = {
        name: '来自子组件传出的name',
        value: '来自子组件传出的value'
      }
      this.loadding = false
    }, 2000)
    this.init()
  },
  methods: {
    // 外部动态切换的时候 可以主动调用此方法
    init () {
      this.hasContent = this.$slots.content && this.$slots.content.length
      this.hasFooter = this.$slots.footer && this.$slots.footer.length
      console.log('this--init', this)
      console.log('this.$slot--init', this.$slots)
      console.log('this.$scopedSlots--init', this.$scopedSlots)
    }
  }
}
</script>

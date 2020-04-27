<template>
  <div>
    <slot :slotData="mydata">
      {{ mydata.title }}
    </slot>
    <header>
      <slot name="header">
        默认header的内容
      </slot>
    </header>
    <footer>
      <slot name="footer">
        默认的footer内容
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MySlot',
  data () {
    return {
      mydata: {
        a: 1,
        b: 2,
        c: 3,
        title: '默认的slot内容',
        header: '我是header，fromchildrenComponent'
      }
    }
  }
}
</script>

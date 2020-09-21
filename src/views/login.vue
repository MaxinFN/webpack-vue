<template>
  <div class="login">
    <!-- Login in~~~ -->
    <span>{{ name }}</span>
    <my-input v-model="name" />
    <my-slot>
      <template v-slot="slotProps">
        {{ slotProps.slotData.header }}
        这是来自子组件的动态属性
      </template>
      <template #header>
        <h1>修改header内容</h1>
        <p>12313</p>
      </template>
    </my-slot>
  </div>
</template>

<script>
import MyInput from './my-input.vue'
import MySlot from './slot.vue'
export default {
  name: 'Login',
  components: {
    MyInput,
    MySlot,
  },
  data () {
    return {
      name: '双向数据绑定原理'
    }
  }
}
</script>

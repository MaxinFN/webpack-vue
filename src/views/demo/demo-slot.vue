<template>
  <div>
    <custom-load>
      <template #default="{data}">
        {{ content }}
        <span>{{ data.name }}</span>
      </template>
      <template #content />
      <template slot="footer">
        父组件 footer
      </template>
    </custom-load>
  </div>
</template>
<script>
import CustomLoad from './custom-slot.vue'
export default {
  components: {
    CustomLoad
  },
  data () {
    return {
      content: '父组件传入的默认内容'
    }
  }
}
</script>

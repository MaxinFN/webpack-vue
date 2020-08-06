<template>
  <div>
    <my-slot />
  </div>
</template>
<script>
import MySlot from './slot.vue'
export default {
  name: 'SlotName',
  components: {
    MySlot
  },
  data () {
    return {}
  }
}
</script>

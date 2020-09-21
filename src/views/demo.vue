<template>
  <div class="demo">
    <my-slot>
      <div slot="a">
        <!-- demo---aaaa -->
        <p slot="b">
          demo---pppp
        </p>
      </div>
    </my-slot>
  </div>
</template>

<script>
import MySlot from './demo-text.vue'
export default {
  name: 'Demo',
  components: {
    MySlot
  }
}
</script>

<style lang="sass" scoped>
.demo{
  color: #f40;
  font-size: 20px;
}
</style>

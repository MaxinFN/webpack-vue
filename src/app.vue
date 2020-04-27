<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      text: 'I am Vue'
    }
  }
}
</script>

<style lang="sass" scoped>
#app{
  color: #f33;
  font-size: 40px;
  font-weight: bolder;
}
</style>

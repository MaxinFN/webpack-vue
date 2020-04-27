<template>
  <div>
    <header class="header">
      i am header11
      text:{{ text }}
      mapState_a {{ myA }}
      <button
        @click.prevent="myUpdate(8)"
      >
        点击
      </button>
    </header>
    <router-link to="/demo">
      DEMO
    </router-link>
    <router-link to="/login">
      LOGIN
    </router-link>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Todo',
  data () {
    return {
      text: 'i am todo component !!!'
    }
  },
  computed: {
    ...mapState({
      myA: 'a'
    })
  },
  methods: {
    ...mapMutations({
      update_a: 'UPDATE_A'
    }),
    myUpdate (val) {
      console.log('val', val)
      // this.update_a(val)
      this.$store.commit('UPDATE_A', 55)
    }
  }
}
</script>

<style lang="sass" scoped>
.header{
  color: red;
  font-weight: 900;
  font-size: 40px;
}
</style>

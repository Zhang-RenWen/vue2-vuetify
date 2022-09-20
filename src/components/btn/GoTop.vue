<template>
  <v-btn
    v-show="fab"
    v-scroll:#application-scroll="onscroll"
    fab
    fixed
    right
    bottom
    small
    @click.stop="toTop"
  >
    <i class="fas fa-angle-up" />
  </v-btn>
</template>

<script>
export default {
  name: 'GoTopBtn',
  data() {
    return {
      fab: false,
      target: null
    }
  },

  methods: {
    onscroll(e) {
      if (typeof window == 'undefined') return
      const top = e.target.scrollTop || 0
      this.fab = top > 50
      this.$emit('showButton', this.fab)
    },

    toTop() {
      const appScroll = document.getElementById('application-scroll')
      appScroll.scrollTo({
        top: 0,
        left: 0,
        behavior: ' smooth'
      })
    }
  }
}
</script>

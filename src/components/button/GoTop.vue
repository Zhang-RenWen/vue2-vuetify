<template>
  <v-btn
    v-show="display"
    v-scroll:#application-scroll="onscroll"
    fab
    fixed
    right
    bottom
    small
    @click.stop="toTop"
  >
    <v-icon>fas fa-angle-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'GoTopBtn',
  data() {
    return {
      display: false
    }
  },

  methods: {
    onscroll(e) {
      if (typeof window == 'undefined') return
      const top = e.target.scrollTop || 0
      this.display = top > 50
      this.$emit('showButton', this.display)
    },

    toTop() {
      const appScroll = document.getElementById('application-scroll')
      appScroll.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

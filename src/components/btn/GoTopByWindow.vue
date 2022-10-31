<template>
  <v-scale-transition>
    <v-btn v-show="display" fab fixed right bottom small @click.stop="toTop">
      <v-icon>fas fa-angle-up</v-icon>
    </v-btn>
  </v-scale-transition>
</template>

<script>
export default {
  name: 'GoTopBtnByWindow',
  data() {
    return {
      display: true
    }
  },

  mounted() {
    addEventListener('scroll', this.onScroll)
  },

  beforeDestroy() {
    removeEventListener('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      this.display = window.scrollY > 0
    },

    toTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

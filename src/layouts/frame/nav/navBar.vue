<template>
  <nav id="navBar">
    <div class="sideMenuButton" :class="[sideMenuOpen ? 'active' : '']" @click="toggleSlider">
      <div />
      <div />
      <div />
    </div>
    <div class="trademark">
      <span>UI Elements</span>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {}
  },

  computed: {
    ...mapGetters('ui', ['sideMenuOpen'])
  },

  mounted() {},
  methods: {
    toggleSlider() {
      this.toggleSideMenuOpen(!this.sideMenuOpen)
    },

    ...mapActions('ui', ['toggleSideMenuOpen'])
  }
}
</script>

<style lang="scss" scoped>
$background-color: #001529;
$elements-color: #fff;
$transition-speed: 300ms;
$asideWidth: 290px;

#navBar {
  background-color: $background-color;
  display: flex;
  justify-content: space-between;
  z-index: 3;
  height: 60px;
  position: fixed;
  width: 100%;
  flex-direction: row-reverse;

  nav {
    height: 60px;
    width: 100%;
    background-color: $background-color;
    color: $elements-color;
    position: relative;
    display: inline-block;
  }

  .sideMenuButton {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 5rem;

    div {
      width: 3rem;
      height: 5px;
      background-color: $elements-color;
      margin-bottom: 0.4rem;
      -webkit-transition: all $transition-speed ease;
      -moz-transition: all $transition-speed ease;
      transition: all $transition-speed ease;
      position: absolute;
    }

    div:nth-child(1) {
      left: 1rem;
      top: 1rem;
    }

    div:nth-child(2) {
      left: 1rem;
      top: 1.8rem;
    }

    div:nth-child(2)::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 3rem;
      height: 5px;
      background-color: $elements-color;
      -webkit-transition: all $transition-speed ease;
      -moz-transition: all $transition-speed ease;
      transition: all $transition-speed ease;
    }

    div:nth-child(3) {
      right: 1rem;
      top: 2.6rem;
    }
  }

  .active {
    div {
      width: 3rem;
      height: 5px;
      background-color: $elements-color;
      margin-bottom: 0.3rem;
      -webkit-transition: all $transition-speed ease;
      -moz-transition: all $transition-speed ease;
      transition: all $transition-speed ease;
      position: absolute;
    }

    div:nth-child(1),
    div:nth-child(3) {
      width: 0;
      opacity: 0;
    }

    div:nth-child(2) {
      transform: rotate(-45deg);
    }

    div:nth-child(2)::after {
      transform: rotate(90deg);
    }
  }

  .trademark {
    height: 60px;
    line-height: 60px;
    width: $asideWidth;
    color: $elements-color;
    font-size: 26px;
    font-weight: 600;
    padding-left: 20px;
  }
}

@media screen and (min-width: 1024px) {
  #navBar {
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>

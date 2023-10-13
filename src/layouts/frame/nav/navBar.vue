<template>
  <nav id="nav-bar">
    <div class="side-menu-button" :class="[sideMenuOpen ? 'active' : '']" @click="toggleSlider">
      <div />
      <div />
      <div />
    </div>
    <div class="trademark">
      <span>Vuetify Demo</span>
    </div>
  </nav>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },

  computed: {},

  mounted() {},
  methods: {
    toggleSlider() {
      this.toggleSideMenuOpen(!this.sideMenuOpen)
    }
  }
}
</script>

<style lang="scss" scoped>
$background-color: #001529;
$elements-color: #fff;
$transition-speed: 300ms;
$aside-width: 250px;
$nav-height: 50px;
$toggle-button-stroke: 3px;
$toggle-button-width: 2.6rem;

#nav-bar .active div {
  position: absolute;
  width: $toggle-button-width;
  height: $toggle-button-stroke;
  background-color: $elements-color;
  transition: all $transition-speed ease;
}

#nav-bar {
  position: fixed;
  z-index: 11;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  width: 100%;
  height: $nav-height;
  background-color: $background-color;

  nav {
    position: relative;
    display: inline-block;
    width: 100%;
    height: $nav-height;
    color: $elements-color;
    background-color: $background-color;
  }

  .side-menu-button {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 5rem;

    div {
      position: absolute;
      width: $toggle-button-width;
      height: $toggle-button-stroke;
      background-color: $elements-color;
      transition: all $transition-speed ease;
    }

    div:nth-child(1) {
      top: 1rem;
      left: 1rem;
    }

    div:nth-child(2) {
      top: 1.6rem;
      left: 1rem;
    }

    div:nth-child(2)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: $toggle-button-width;
      height: $toggle-button-stroke;
      background-color: $elements-color;
      transition: all $transition-speed ease;
    }

    div:nth-child(3) {
      top: 2.2rem;
      right: 1.4rem;
    }
  }

  .active {
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
    padding-left: 20px;
    width: $aside-width;
    height: $nav-height;
    line-height: $nav-height;
    font-size: 26px;
    font-weight: 600;
    color: $elements-color;
  }
}

@media screen and (min-width: 1024px) {
  #nav-bar {
    flex-direction: row;
    justify-content: flex-start;
  }
}
</style>

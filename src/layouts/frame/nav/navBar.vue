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
$aside-width: 290px;

#nav-bar .active div {
  position: absolute;
  margin-bottom: 0.3rem;
  width: 3rem;
  height: 5px;
  background-color: $elements-color;
  transition: all $transition-speed ease;
}

#nav-bar {
  position: fixed;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  width: 100%;
  height: 60px;
  background-color: $background-color;

  nav {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 60px;
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
      margin-bottom: 0.4rem;
      width: 3rem;
      height: 5px;
      background-color: $elements-color;
      transition: all $transition-speed ease;
    }

    div:nth-child(1) {
      top: 1rem;
      left: 1rem;
    }

    div:nth-child(2) {
      top: 1.8rem;
      left: 1rem;
    }

    div:nth-child(2)::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3rem;
      height: 5px;
      background-color: $elements-color;
      transition: all $transition-speed ease;
    }

    div:nth-child(3) {
      top: 2.6rem;
      right: 1rem;
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
    height: 60px;
    line-height: 60px;
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

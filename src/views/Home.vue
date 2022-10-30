<template>
  <v-app light>
    <div id="wrap">
      <SideBar class="side-bar" :class="[sideMenuOpen ? '' : 'side-bar-closed']" />
      <NavBar />

      <section
        id="application-scroll"
        class="contents"
        :class="[sideMenuOpen ? '' : 'contents-closed']"
      >
        <router-view />
      </section>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import NavBar from '@/layouts/frame/nav/navBar.vue'
import SideBar from '@/layouts/frame/menu/sideBar.vue'

export default {
  components: {
    NavBar,
    SideBar
  },

  props: {},
  data() {
    return {}
  },

  computed: {
    ...mapGetters('ui', ['sideMenuOpen'])
  },

  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
$aside-width: 290px;
$content-width-mobile: calc(100%);
$content-width-pad: calc(100%);
$content-width: calc(100% - 290px);
$background-color-aside: #24282c;
$transition-speed: 300ms;

#wrap {
  display: flex;
  width: 100%;
  height: 100%;

  .side-bar {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    overflow-x: auto;
    padding-top: 60px;
    width: $aside-width;
    border-radius: 0;
    color: #000;
    background-color: $background-color-aside;
    transform: translateX(0);
    transition: all $transition-speed ease-in-out;
  }

  .side-bar-closed {
    width: 0;
    border-radius: 100% 0 0 100%;
  }

  .contents {
    overflow-y: auto;
    padding: 100px 40px 40px;
    width: $content-width-mobile;
    height: 100vh;
    background-color: #d9d9d9;
    transition: all $transition-speed ease-in-out;
    transition: $transition-speed;
    transition: $transition-speed;
  }
}

@media screen and (min-width: 768px) {
  #wrap {
    .contents {
      width: $content-width-pad;
    }
  }
}

@media screen and (min-width: 1024px) {
  #wrap {
    .contents {
      width: $content-width;
    }

    .side-bar {
      position: relative;
    }

    .side-bar-closed {
      width: 0;
      border-radius: 0;
    }

    .contents-closed {
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
.home {
  width: calc(100vw - 315px);

  > .home {
    display: flex;
    flex-wrap: wrap;
    height: 400px;
  }
}
</style>

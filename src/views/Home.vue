<template>
  <div id="wrap">
    <SideBar class="sideBar" :class="[sideMenuOpen ? '' : 'sideBarClosed']" />
    <NavBar />
    <section class="contents" :class="[sideMenuOpen ? '' : 'contentsClosed']">
      <v-app light v-if="$route.path.includes('Vuetify')">
        <router-view />
      </v-app>
      <router-view v-else />
    </section>
  </div>
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

<style lang="scss">
@import '@/components/charts/scss/chartsBase';
</style>

<style lang="scss" scoped>
$asideWidth: 290px;
$contentWidth-mobile: calc(100%);
$contentWidth-pad: calc(100%);
$contentWidth: calc(100% - 290px);
$aslidebar: 15px;
$background-color-aside: #24282c;
$transition-speed: 300ms;

#wrap {
  width: 100%;
  height: 100%;
  display: flex;

  .sideBar {
    width: $asideWidth;
    padding-top: 60px;
    background-color: $background-color-aside;
    color: rgb(0, 0, 0);
    -webkit-transform: translateX(0);
    transform: translateX(0);
    -webkit-transition: all $transition-speed ease-in-out;
    -webkit-transition: $transition-speed;
    transition: $transition-speed;
    overflow-x: auto;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    border-radius: 0;
  }

  .sideBarClosed {
    width: 0;
    border-radius: 100% 0 0 100%;
  }

  .contents {
    -webkit-transition: all $transition-speed ease-in-out;
    -webkit-transition: $transition-speed;
    transition: $transition-speed;
    width: $contentWidth-mobile;
    overflow-y: auto;
    height: 100vh;
    padding-top: 60px;
    background-color: #fff;
  }
}

@media screen and (min-width: 768px) {
  #wrap {
    .contents {
      width: $contentWidth-pad;
    }
  }
}
@media screen and (min-width: 1024px) {
  #wrap {
    .contents {
      width: $contentWidth;
    }

    .sideBar {
      position: relative;
    }

    .sideBarClosed {
      width: 0;
      border-radius: 0;
    }

    .contentsClosed {
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

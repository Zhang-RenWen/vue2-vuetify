<template>
  <aside>
    <div class="searchBox" />
    <div class="menu">
      <TreeMenu
        v-for="(children, index) of TreeMenuLise__FuzzySearch"
        :key="`${index}`"
        :node="children"
        :index="index"
        :parent-layer="String(index)"
      />
    </div>
  </aside>
</template>

<script>
import { routes } from '@/router/index'
import TreeMenu from './recursiveMenu.vue'

export default {
  components: {
    TreeMenu
  },

  data() {
    return {
      TreeMenuLise: [
        {
          name: '第一層',
          children: []
        }
      ],

      TreeMenuLise__FuzzySearch: [
        {
          name: '第一層',
          children: []
        }
      ]
    }
  },

  mounted() {
    const meanuRoot = routes[0].children
    this.TreeMenuLise = meanuRoot
    this.TreeMenuLise__FuzzySearch = meanuRoot
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
$asideWidth: 290px;
$slidebar: 20px;
$background-color-trademark: #001529;
$background-color-searchBox: #373d41;
$elements-color: #fff;

aside {
  .trademark {
    height: 60px;
    line-height: 60px;
    width: $asideWidth;
    background-color: $background-color-trademark;
    color: $elements-color;
    font-size: 36px;
    font-weight: 600;
    text-align: center;
  }

  .menu {
    height: calc(100vh - 120px);
    min-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  .searchBox {
    background-color: $background-color-searchBox;
    width: $asideWidth;
    height: 60px;
  }
}
</style>

<template>
  <aside>
    <div class="search-box" />
    <div class="menu">
      <TreeMenu
        v-for="(children, index) of treeMenuFuzzySearch"
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
      treeMenu: [
        {
          name: '第一層',
          children: []
        }
      ],

      treeMenuFuzzySearch: [
        {
          name: '第一層',
          children: []
        }
      ]
    }
  },

  mounted() {
    const menuRoot = routes[0].children
    this.treeMenu = menuRoot
    this.treeMenuFuzzySearch = menuRoot
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
$aside-width: 250px;
$background-color-trademark: #001529;
$background-color-search-box: #373d41;
$elements-color: #fff;
$height: 50px;

aside {
  .trademark {
    width: $aside-width;
    height: $height;
    line-height: $height;
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    color: $elements-color;
    background-color: $background-color-trademark;
  }

  .menu {
    overflow-y: auto;
    height: calc(100vh - $height * 2);
    min-height: calc(100vh - $height * 2);
  }

  .search-box {
    width: $aside-width;
    height: $height;
    background-color: $background-color-search-box;
  }
}
</style>

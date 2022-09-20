<template>
  <aside>
    <div class="search-box" />
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
$aside-width: 290px;
$slidebar: 20px;
$background-color-trademark: #001529;
$background-color-search-box: #373d41;
$elements-color: #fff;

aside {
  .trademark {
    width: $aside-width;
    height: 60px;
    line-height: 60px;
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    color: $elements-color;
    background-color: $background-color-trademark;
  }

  .menu {
    overflow-y: auto;
    height: calc(100vh - 120px);
    min-height: calc(100vh - 120px);
  }

  .search-box {
    width: $aside-width;
    height: 60px;
    background-color: $background-color-search-box;
  }
}
</style>

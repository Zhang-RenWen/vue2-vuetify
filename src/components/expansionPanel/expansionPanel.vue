<template>
  <v-container class="section-expansion-panels" fluid>
    <v-row>
      <slot name="top" />
      <v-spacer />
      <v-btn icon @click="togglePanelAll(configs.persistentList)">
        <v-icon>
          {{ isPanelAll ? 'mdi-chevron-double-up' : 'mdi-chevron-double-down' }}
        </v-icon>
      </v-btn>
    </v-row>
    <v-row justify="center">
      <v-expansion-panels v-model="panel" class="c-expansion-panels" focusable multiple title>
        <slot name="panel">
          <v-expansion-panel v-for="(item, index) of compoList" :key="index">
            <v-expansion-panel-header>
              {{ item.text }}
              <template #actions>
                <v-icon>mdi-chevron-down</v-icon>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content class="pa-0">
              <v-container fluid>
                <component :is="item.name" :id="item.name" v-on="$listeners" />
              </v-container>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </slot>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ExpansionPanels',
  props: {
    /**
     * 動態component列表
     * @values [f name, path, text]]
     * components[name] = () =>import("@/views" + path + name + ".vue")
     */

    compoList: {
      type: Array,
      default: () => []
    },
    /**
     * 使用slot#panel時,需博人itemList以計算全展開數量
     */

    itemList: {
      type: Array,
      default: () => []
    },
    /**
     * 設定檔
     * @values { isPanelAll, panel, persistentList }
     */

    configs: {
      type: Object,
      default() {}
    }
  },

  data() {
    return {
      panel: [],
      isPanelAll: false
    }
  },

  created() {
    this.compoList.forEach((item) => {
      let { name, path } = item
      this.$options.components[name] = () => import('@/views' + path + name + '.vue')
    })
  },

  beforeMount() {
    if (this.configs.isPanelAll && !this.isPanelAll)
      this.togglePanelAll(this.configs.persistentList)
    if (!this.configs.isPanelAll && this.configs.persistentList)
      this.panel = this.configs.persistentList
    if (this.configs.panel) {
      this.panel = this.configs.panel
    }
  },

  methods: {
    togglePanelAll(val) {
      this.isPanelAll = !this.isPanelAll
      const compoLeng = this.compoList.length
      this.panel = this.isPanelAll
        ? (compoLeng ? this.compoList : this.itemList).map((item, idx) => idx)
        : val || []
    }
  }
}
</script>

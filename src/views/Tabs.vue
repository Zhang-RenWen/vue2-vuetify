<template>
  <v-sheet v-hotkey="keyMap" outlined>
    <v-tabs v-model="tab" show-arrows>
      <v-tabs-slider />
      <v-tab v-for="item of list" :key="item">Tab {{ item }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item of list" :key="item">
        <v-card color="basil" flat>
          <v-card-text>{{ item }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-sheet>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tab: null,
      tabs: [],
      list: ['0', '1']
    }
  },

  mounted() {},
  methods: {
    keyMap() {
      return this.tabs.reduce((r, o) => {
        const matched = o.title.match(/\((\w)\)$/)
        if (!matched) return r
        const [, shortKey] = matched
        return { ...r, [shortKey]: () => this.focusedComponent(o) }
      }, {})
    },

    focusedComponent({ component }) {
      const index = this.tabs.findIndex((o) => {
        if (o.component) {
          return o.component === component
        }
      })
      if (index === -1) {
        return
      }
      this.activeTab = index
    }
  }
}
</script>

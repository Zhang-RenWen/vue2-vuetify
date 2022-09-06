<template>
  <div v-hotkey="keyMap">
    <v-card>
      <h3>
        Expansions
      </h3>
      <v-sheet outlined class="pa-4">
        <v-btn @click="toggleAll">
          <v-icon>mdi-chevron-double-down</v-icon>
        </v-btn>
        <v-expansion-panels hover v-model="panel" multiple>
          <v-expansion-panel v-for="(o, i) of tabs" :key="i">
            <v-expansion-panel-header>header {{ o }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-sheet>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},

  data() {
    return { panel: [], tabs: ['(A)', '(B)'] }
  },

  async mounted() {},

  destroyed() {},

  methods: {
    toggleAll() {
      if (this.isCloseAll) {
        this.all()
      } else {
        this.none()
      }
    },

    all() {
      this.panel = this.tabs.map((o, index) => index)
    },

    none() {
      this.panel = []
    },

    focusComponent(tab, togglePanel = false) {
      const index = this.tabs.findIndex(o => o === tab)
      if (index === -1) return
      const idx = this.panel.findIndex(o => o === index)
      if (idx === -1) {
        this.panel.push(index)
      } else if (togglePanel) this.panel.splice(idx, 1)
    }
  },

  computed: {
    isCloseAll() {
      return this.panel.length === 0
    },

    keyMap() {
      return this.tabs.reduce((r, o) => {
        const matched = o.match(/\((\w)\)$/)
        if (!matched) return r
        const [, shortKey] = matched
        return { ...r, [shortKey]: () => this.focusComponent(o, true) }
      }, {})
    }
  }
}
</script>

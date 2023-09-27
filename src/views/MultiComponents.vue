<template>
  <div>
    <v-card v-hotkey="keymap" class="mb-6">
      <v-card-title>MultiComponents</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form ref="form1">
          <v-tabs v-model="activeTab">
            <draggable v-model="tabs" class="d-flex" @update="tabUpdate">
              <v-tab v-for="(tab, index) of tabs" :key="index">
                {{ tab.title }}
              </v-tab>
            </draggable>
          </v-tabs>
          <v-tabs-items v-model="activeTab">
            <v-tab-item
              v-for="(tab, index) of tabs"
              :key="index"
              style="overflow-y: auto; max-height: calc(100vh - 500px)"
              :eager="isTabPreload(tab.component)"
            >
              <template v-if="!TabComp[tab.component]">
                {{ `組件「${tab.title}-${tab.component}」待建立` }}
              </template>
              <components
                :is="TabComp[tab.component]"
                :id="`${tab.title}-${TabComp.component}`"
                :ref="tab.component"
                :key="`${tab.title}-${TabComp.component}`"
                v-model="tabForms[tab.component]"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-form>
        <v-row class="justify-end">
          <v-btn color="accent" class="mr-1" @click="check('form1', 'aaa')">檢核 aaa</v-btn>
          <v-btn color="accent" class="mr-1" @click="check('form1', 'bbb')">檢核 bbb</v-btn>
          <v-btn color="accent" @click="check('form1')">檢核 all</v-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>MultiComponents</v-card-title>
      <v-divider />
      <v-card-text />
    </v-card>
  </div>
</template>

<script>
import vue from 'vue'
import draggable from 'vuedraggable'

const TabComp = require
  .context('@/views/MultiComponentsTabs/', false, /.*\.vue$/)
  .keys()
  .reduce((components, filename) => {
    const name = filename.replace(/(^.\/)|(\.vue$)/g, '')
    components[name] = () => ({
      component: import(`@/views/MultiComponentsTabs/${name}.vue`),
      error: vue.extend({
        render(h) {
          return h('p', `待建立`)
        }
      })
    })
    return components
  }, {})
export default {
  components: {
    draggable
  },

  props: {},
  data() {
    return {
      tabs: [
        { title: 'Tab1(A)', component: 'aaa' },
        { title: 'Tab2(2)', component: 'bbb' },
        { title: 'Tab3(3)', component: 'ccc' }
      ],

      tabForms: {},
      TabComp,
      activeTab: null,
      errorCompList: []
    }
  },

  computed: {
    keymap() {
      return this.tabs.reduce((r, o) => {
        const matched = o.title.match(/\((\w)\)$/)
        if (!matched) return r
        const [, shortKey] = matched
        return { ...r, [shortKey]: () => this.focusComponent(o) }
      }, {})
    }
  },

  mounted() {},
  methods: {
    isTabPreload(key) {
      // Forces the component’s content to render when it mounts. This is useful if you have content that will not be rendered in the DOM that you want crawled for SEO.
      // pages need to be set eager

      const TrackPages = [] // component in tab of tabs
      return TrackPages.includes(key)
    },

    getComponents() {
      return this.tabs
        .map((k) => this.$refs[k.component] && this.$refs[k.component][0])
        .filter((o) => o)
    },

    async resetValidate() {
      const comps = this.getComponents()
      await Promise.all(
        comps.map((c) => {
          if (c.resetValidation) {
            return c.resetValidation()
          }
          return c
        })
      )
    },

    async check(form, component) {
      await this.resetValidate()
      await new Promise((resolve) => setTimeout(resolve, 0))
      if (this.$refs[component]) {
        this.$refs[component][0].validate()
      } else {
        // check all
        await this.validate()
      }
    },

    showFirstErrorTab() {
      if (this.errorCompList > 0) {
        const name = this.errorCompList[0].$options.name
        this.activeTab = this.tabs.findIndex((o) => o.component === name)
      }
    },

    async asyncInterval(callback, ms, triesLeft = 5) {
      return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          const result = await callback()
          if (result) {
            resolve(result)
            clearInterval(interval)
          } else if (triesLeft <= 1) {
            reject()
            clearInterval(interval)
          }
          triesLeft = triesLeft - 1
        }, ms)
      })
    },

    tabUpdate(event) {
      const tabNumber = Number(this.activeTab)
      const oldIndex = event.oldIndex
      const newIndex = event.newIndex
      const hasChanged =
        (oldIndex < tabNumber && newIndex > tabNumber) ||
        (oldIndex > tabNumber && newIndex < tabNumber)
      let tabActive = null
      if (tabNumber === oldIndex) {
        tabActive = newIndex
      } else if (tabNumber === newIndex && newIndex < oldIndex) {
        tabActive = tabNumber + 1
      } else if (tabNumber === newIndex && newIndex > oldIndex) {
        tabActive = tabNumber - 1
      } else if (tabNumber > newIndex && newIndex < oldIndex && hasChanged) {
        tabActive = tabNumber + 1
      } else if (tabNumber < newIndex && newIndex > oldIndex && hasChanged) {
        tabActive = tabNumber - 1
      }

      if (this.tabActive !== null) {
        this.tabActive = tabActive
      }
    },

    async focusComponent({ component }) {
      const index = this.tabs.findIndex((o) => {
        if (o.component) {
          return o.component === component
        }
      })
      if (index === -1) {
        return
      }
      this.activeTab = index
      // 會噴錯
      // return this.asyncInterval(
      //   () => (this.$refs[component] ? this.$refs[component][0] : false),
      //   50
      // )
    },

    async validate() {
      const comps = this.getComponents()
      const result = await Promise.all(comps.map((c) => c.validate()))
      const isValid = !result.includes(false)
      this.errorCompList = result.map((o, index) => (o ? null : comps[index])).filter((o) => o)
      if (!isValid) {
        this.showFirstErrorTab()
      }
      return isValid
    }

    // directionTo(e) {
    //   e.stopPropagation()
    //   e.preventDefault()
    // }
  }
}
</script>

<style lang="scss" scoped></style>

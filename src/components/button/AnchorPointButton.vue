<template>
  <v-speed-dial
    v-model="toggle"
    class="anchor-point"
    :style="inlineStyle"
    direction="bottom"
    transition="slide-y-reverse-transition"
  >
    <template #activator>
      <v-btn fab small color="primary">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-btn
      v-for="(item, index) of itemList"
      :key="index"
      small
      color="secondary"
      @click="onClickDial(item, index)"
    >
      <a>
        {{ item.title }}
      </a>
    </v-btn>
  </v-speed-dial>
</template>

<script>
/**
 *  要保文件錨點按鈕(依照要保文件格式)
範例 proposal.vue
使用方法
@param {$refs} pageRef
外層綁定ref在<v-card>
@param {Array} itemList
面元件陣列資訊 ex:title compo等等
@param {String} anchorTag
scrollElement舆itemList錨點目標預設 title
 */
export default {
  name: 'AnchorPointButton',
  props: {
    itemList: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },

    icon: {
      type: String,
      require: true,
      default: 'mdi-format-list-bulleted-square'
    },

    scrollBehavior: {
      type: String,
      require: true,
      default: 'smooth'
    },

    inlineStyle: { type: [Array, String], default: '' }
  },

  data() {
    return {
      toggle: false
    }
  },

  watch: {
    toggle(val) {
      this.$emit('onToggle', val)
    }
  },

  methods: {
    getTopDistance(elem) {
      // Get current location's distance from the top of the page
      // let position = window.pageYOffset

      // Get an element's distance from the top of the page
      let location = 0
      if (elem.offsetParent) {
        do {
          location += elem.offsetTop
          elem = elem.offsetParent
        } while (elem)
      }

      return location >= 0 ? location : 0
    },

    async onClickDial(item) {
      const id = `#${item.title}`
      const element = document.querySelector(id)
      const elementOffsetY = this.getTopDistance(element)
      const paddingTop = 60
      const toTop = elementOffsetY - paddingTop >= 0 ? elementOffsetY - paddingTop : elementOffsetY
      const applicationScroll = document.querySelector('#application-scroll')
      const behavior = this.scrollBehavior

      if (behavior !== '') {
        applicationScroll.scrollTo({
          top: toTop,
          left: 0,
          behavior
        })
      }
      element.style.position = 'absolute'
      element.style.top = '-100px'
      setTimeout(
        () => {
          if (location.hash === id) {
            return true
          }
          location.hash = id
        },
        behavior !== '' ? 300 : 0
      )

      this.$emit('onDial', item)
    }
  }
}
</script>

<style lang="scss" scoped>
/* stylelint-disable */
.anchor-point {
  ::v-deep .v-speed-dial__list {
    z-index: 3;
    width: auto;
    align-items: flex-start;
  }
  a {
    text-decoration: none;
    color: currentColor;
  }
}
</style>

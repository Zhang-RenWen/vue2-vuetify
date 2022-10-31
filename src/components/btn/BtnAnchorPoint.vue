<template>
  <v-speed-dial
    v-model="toggle"
    class="btnAnchorPoint"
    :style="inlineStyle"
    direction="bottom"
    transition="slide-y-reverse-transition"
  >
    <template #activator>
      <v-btn fab dark small color="primary">Anchor</v-btn>
    </template>
    <v-btn
      v-for="(item, index) of []"
      :key="index"
      small
      color="fourth"
      @click="scrollToElement(item, index)"
    >
      {{ item.title }}
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
pageRef舆itemList點標預 title
 */
export default {
  name: 'BtnAnchorPoint',
  // props: ["pageRef", "itemList", "inlineStyle", "iconSvg", "inlineClass"],
  props: {
    pageRef: {
      type: Object,
      require: true
    },

    itemList: {
      type: Array,
      require: true
    },

    anchorTag: {
      type: String,
      default: 'title'
    },

    iconSvg: {
      type: String,
      require: true
    },

    inlineClass: [Array, String],
    inlineStyle: [Array, String]
  },

  data() {
    return {
      toggle: false
    }
  },

  methods: {
    async scrollToElement(item, index) {
      let compo = item[this.anchorTag]
      if (this.pageRef) {
        this.$emit('scrollToElement', item, index)
        await setTimeout(() => {
          const el = this.pageRef[compo][0].$el
          const ParentHeight = el.parentElement.offsetParent.offsetTop
          const elHeight = el.$el.offsetTop
          const toTopDistance = ParentHeight + elHeight + 40
          let parentElement = document.querySelector('#application-scroll')
          parentElement.scrollTo(
            {
              top: toTopDistance,
              behavior: 'auto'
            },
            200
          )
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sticky-top {
  top: 0;
  z-index: 2;
  display: flex;

  .v-speed-dial > .v-btn {
    width: 24px;
    height: 24px;
  }
}
</style>

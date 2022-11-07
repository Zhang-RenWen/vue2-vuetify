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
    onClickDial(item) {
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
}
</style>

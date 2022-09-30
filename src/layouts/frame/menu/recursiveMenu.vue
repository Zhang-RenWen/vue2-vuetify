<template>
  <div class="recursive-cell" :class="[open ? 'is-opened' : '']">
    <div class="label" @click="selectThis($event, node)">
      <div
        :class="[
          node.children && node.children.length !== 0 ? 'is-folder' : 'not-folder',
          open ? 'labelIcon-wrap' : ''
        ]"
      >
        <Icon name="arrow-line" :w="16" :h="16" />
      </div>
      <span
        unselectable="on"
        class="labelText"
        :style="{
          'margin-left': labelTextPosition
        }"
      >
        {{ node.text }}
        <!-- {{ index }} -->
      </span>
    </div>

    <div class="sub-folder">
      <template v-for="(childNode, idx) of node.children">
        <treeMenu
          :key="idx"
          :node="childNode"
          :parent-layer="`${parentLayer}-${idx}`"
          :index="idx"
        />
      </template>
    </div>
    <div v-if="!node.children" @click="selectThis($event, node)">
      {{ node.text }}{{ parentLayer }}{{ index }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeMenu',
  components: {},
  props: {
    node: {
      type: Object,
      default() {
        return {
          name: ''
        }
      }
    },

    index: {
      type: Number,
      default: 1
    },

    parentLayer: {
      type: String,
      default: '1'
    }
  },

  data() {
    return {
      open: false
    }
  },

  computed: {
    labelTextPosition() {
      const { parentLayer } = this
      const parentLayerStrLen = parentLayer.split('-').length
      const firstLayerMarginLeft = 40
      const isFirstLayer = parentLayerStrLen === 1
      const otherLayerMarginScale = 15
      return `${
        isFirstLayer
          ? firstLayerMarginLeft
          : parentLayerStrLen * otherLayerMarginScale + firstLayerMarginLeft
      }px`
    }
  },

  mounted() {},
  methods: {
    selectThis(e, node) {
      const { name } = this.$route
      const hasChildren = node.children
      const nodeName = node.name
      if (!hasChildren) {
        this.$router.push({
          name: nodeName
        })
        return
      }
      const hasNode = hasChildren.length !== 0
      if (hasNode) {
        this.open = !this.open
      } else if (name !== nodeName) {
        this.$router.push({
          name: nodeName
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$aside-width: 100%;
$background-color: #24282c;
$elements-color: #ddd;
$transition-speed: 300ms;
$aside-cell-height: 60px;
$icon-height: 16px;

.label {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  width: $aside-width;
  height: $aside-cell-height;
  text-align: left;
  color: $elements-color;
  background-color: $background-color;

  span {
    user-select: none;
  }
}

.sub-folder {
  width: 100%;
  min-height: 10px;

  .label {
    background-color: #1d1d1d;
  }
}

.label:hover {
  color: #1890ff;
  background-color: #e6f7ff;
  cursor: pointer;
}

.recursive-cell {
  overflow: hidden;
  max-height: $aside-cell-height;
  transition: all $transition-speed ease;
}

.is-folder {
  position: absolute;
  top: calc(50% - #{$icon-height / 2px});
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all $transition-speed ease;
  transform: rotate(-90deg);
}

.not-folder {
  display: none;
}

.is-opened {
  max-height: 700px;
  transition: all $transition-speed ease;
}

.label-icon-wrap {
  transition: all $transition-speed ease;
  transform: rotate(0deg);
}

.icon {
  width: $icon-height;
  height: $icon-height;
}

@media screen and (max-width: 768px) {
  .is-folder {
    left: 15px;
  }
}

@media screen and (min-width: 768px) {
  .is-folder {
    right: 15px;
  }
}
</style>

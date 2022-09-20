<template>
  <div class="recursiveCell" :class="[open ? 'isOpended' : '']">
    <div class="label" @click="selectThis($event, node)">
      <div
        :class="[
          node.children && node.children.length !== 0 ? 'isFolder' : 'isntFolder',
          open ? 'labelIconWrap' : ''
        ]"
      >
        <icon name="arrow-line" :w="16" :h="16" />
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

    <div class="subForder">
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
$asideWidth: 100%;
$slidebar: 20px;
$background-color: #24282c;
$elements-color: #ddd;
$transition-speed: 300ms;
$asidecellHeight: 60px;
$iconHeight: 16px;

.label {
  width: $asideWidth;
  height: $asidecellHeight;
  text-align: left;
  background-color: $background-color;
  color: $elements-color;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;

  span {
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
}

.subForder {
  width: 100%;
  min-height: 10px;

  .label {
    background-color: #1d1d1d;
  }
}

.label:hover {
  background-color: #e6f7ff;
  color: #1890ff;
  cursor: pointer;
}

.recursiveCell {
  -webkit-transition: all $transition-speed ease;
  -moz-transition: all $transition-speed ease;
  transition: all $transition-speed ease;
  max-height: $asidecellHeight;
  overflow: hidden;
}

.isFolder {
  -webkit-transition: all $transition-speed ease;
  -moz-transition: all $transition-speed ease;
  transition: all $transition-speed ease;
  position: absolute;
  top: calc(50% - #{$iconHeight/ 2px});
  // left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
}

.isntFolder {
  display: none;
}

.isOpended {
  -webkit-transition: all $transition-speed ease;
  -moz-transition: all $transition-speed ease;
  transition: all $transition-speed ease;
  max-height: 700px;
}

.labelIconWrap {
  -webkit-transition: all $transition-speed ease;
  -moz-transition: all $transition-speed ease;
  transition: all $transition-speed ease;
  transform: rotate(0deg);
}

.icon {
  width: $iconHeight;
  height: $iconHeight;
}
@media screen and (max-width: 768px) {
  .isFolder {
    left: 15px;
  }
}
@media screen and (min-width: 768px) {
  .isFolder {
    right: 15px;
  }
}
</style>

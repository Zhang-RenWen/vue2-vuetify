<template>
  <v-tooltip v-if="showToolTips" bottom>
    <template #activator="{ on, attrs }">
      <div
        v-bind="attrs"
        :class="labelClass"
        :style="inlineStyle"
        class="app-input-label"
        v-on="on"
      >
        {{ label }}
      </div>
    </template>
    <div>{{ label }}</div>
  </v-tooltip>
  <div v-else class="app-input-label" :class="labelClass" :style="inlineStyle">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'ToolTipsLabel',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },

    showLetters: {
      type: Number,
      default: 6
    },

    labelClass: {
      type: [String, Array, Object],
      default: ''
    },

    inlineStyle: {
      type: String,
      default: ''
    }
  },

  computed: {
    showToolTips() {
      return this.label.length >= this.showLetters
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-label {
  width: 105px;
}

.tooltip-label-90 {
  width: 99px;
}

.tooltip-label-0 {
  width: 0;
}

.checkbox-label {
  min-width: 20px;
}
</style>

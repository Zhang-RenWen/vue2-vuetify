<template>
  <v-btn class="white--text mx-1" v-bind="{ ...getConfigs, ...$attrs }" v-on="$listeners">
    <slot>{{ text }}</slot>

    <template v-if="loading" #loader>
      <slot>
        <v-progress-circular indeterminate color="#fff" size="14" width="2" />
      </slot>
    </template>
  </v-btn>
</template>

<script>
export default {
  name: 'BasicBtn',
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      default: ''
    },

    color: {
      type: String,
      default: 'grey darken-2'
    },

    loading: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    small: {
      type: Boolean,
      default: true
    },

    forceActive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },

  computed: {
    getConfigs() {
      return {
        color: this.color,
        small: this.small,
        loading: this.loading,
        disabled: this.getDisabled
      }
    },

    getDisabled() {
      if (this.forceActive) {
        return false
      } else {
        return this.disabled || this.loading
      }
    }
  }
}
</script>

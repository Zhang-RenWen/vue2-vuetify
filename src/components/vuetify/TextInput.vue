<template>
  <div>
    <div v-if="label !== ''">{{ label }}</div>
    <div>
      <v-text-field
        ref="inputRef"
        outlined
        :rules="rules"
        :value="value"
        validate-on-blur
        @blur="updateValueOnblur"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    rules: {
      type: Array,
      default() {
        return []
      }
    },

    label: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },

  mounted() {},
  methods: {
    // updateValue(event) {
    //   const {
    //     target: { value }
    //   } = event
    //   this.$emit('input', value)
    // }
  }
}
</script>

<template>
  <div>
    <tooltipLabel
      v-if="label"
      :label="label"
      :label-class="labelClass"
      :inline-style="labelStyle"
    />
    <b v-if="name" class="pl-0">{{ name }}</b>
    <v-text-field
      ref="inputRef"
      v-model.trim="localValue"
      :type="type"
      :placeholder="placeholder"
      :rules="localRules"
      :readonly="readonly"
      :disabled="disabled"
      class="inputTextField"
      :class="{
        'input-textField--colorChanged': hasChanged,
        'input-textField--disabled': disabled
      }"
      :label="label"
      :counter="[0, '0', '', undefined, null].includes(maxLength) ? false : true"
      :maxlength="[0, '0', undefined, null].includes(maxLength) ? null : maxLength"
      :minlength="[0, '0', '', undefined, null].includes(minLength) ? null : minLength"
      :error-messages="errorMessages"
      solo
      outlined
      flat
      hide-details="auto"
      vue
      dense
      validate-on-blur
      v-bind="$attrs"
      v-on="listeners"
      @focus="onFocus"
      @blur="validate"
      @reset="reset"
      @keyup.prevent="formatValue"
    />
  </div>
</template>

<script>
import { changeColorMixin, inputRefMixin, formatterMixin, rulesMixin } from './inputMixin.js'
import tooltipLabel from '@/components/tooltip/tooltipLabel'
export default {
  components: { tooltipLabel },

  mixins: [changeColorMixin, inputRefMixin, formatterMixin, rulesMixin],
  inheritAttrs: false,

  props: {
    name: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'text' // text password number date time
    },

    label: {
      type: String,
      default: ''
    },

    labelClass: { type: String, default: '' },

    labelStyle: { type: String, default: '' },

    placeholder: {
      type: String,
      default: ''
    },

    maxLength: {
      type: [Number, String, null],
      default: 0 // null closed
    },

    minLength: {
      type: [Number, String, null],
      default: 0 // null closed
    },

    rules: {
      type: Array,
      default: () => []
    },

    disabled: {
      type: Boolean,
      default: false
    },

    readonly: {
      type: Boolean,
      default: false
    },

    errorMessages: {
      type: [Array, String],
      default: () => []
    }
  },

  data() {
    return {}
  },

  computed: {
    localRules() {
      const rules = this.rules
      const newRules = []
      const allCheckMethods = Object.keys(rulesMixin.methods)
      if (this.disabled) {
        return newRules
      }
      if (this.required) {
        newRules.unshift(this.checkEmpty)
      }
      if (this.maxLength) {
        newRules.unshift(this.checkMaxLength)
      }
      if (this.minLength) {
        newRules.unshift(this.checkMinLength)
      }
      rules.forEach((rule) => {
        if (allCheckMethods.includes(rule)) {
          // name
          newRules.unshift(this[rule])
        } else {
          newRules.unshift(rule)
        }
      })

      return newRules
    },

    listeners() {
      const { ...listeners } = this.$listeners
      // 移除原有input 事件
      if (listeners.input) {
        delete listeners.input
      }
      return listeners
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss" scoped>
/* stylelint-disable */

::v-deep .input-textField--colorChanged input,
.input-textField--colorChanged textarea {
  color: red;
}

::v-deep .input-textField--disabled {
  .v-input__slot {
  }

  input {
  }
}
</style>

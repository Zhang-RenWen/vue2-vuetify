<template>
  <div>
    <tooltipLabel
      v-if="label"
      :label="label"
      :label-class="labelClass"
      :inline-style="labelStyle"
    />
    <b v-if="name" class="pl-0">{{ name }}</b>
    <v-textarea
      ref="inputRef"
      v-model.trim="localValue"
      :type="type"
      :placeholder="placeholder"
      :rules="localRules"
      :readonly="readonly"
      :disabled="disabled"
      class="inputTextField"
      :class="{
        'input-textField--colorChanged': hasChanged && !disableSetColor,
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
      @blur="
        () => {
          validate()
          formatValue()
        }
      "
      @reset="reset"
    >
      <template #prepend>
        <slot name="prepend" />
      </template>
      <template #prepend-inner>
        <slot name="prepend-inner" />
      </template>
      <template #append>
        <slot name="append" />
      </template>
      <template #append-outer>
        <slot name="append-outer" />
      </template>
    </v-textarea>
  </div>
</template>

<script>
import { valueChangedSetColor, inputRefEvent, formatters, rulesSetting } from './inputMixin.js'
import tooltipLabel from '@/components/tooltip/tooltipLabel'
export default {
  components: { tooltipLabel },

  mixins: [valueChangedSetColor, inputRefEvent, formatters, rulesSetting],
  inheritAttrs: false,

  props: {
    name: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      default: 'textarea'
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

    disabled: {
      type: Boolean,
      default: false
    },

    readonly: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isFocused: false
    }
  },

  computed: {
    localRules() {
      const rules = this.rules
      const newRules = []
      const allCheckMethods = Object.keys(rulesSetting.methods)
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
::v-deep .input-textField--colorChanged textarea {
  color: red;
}

::v-deep .input-textField--disabled input,
::v-deep .input-textField--disabled textarea {
  color: rgb(155, 155, 155);
}

::v-deep .input-textField--disabled {
  .v-input__slot {
  }

  input {
  }
}
</style>

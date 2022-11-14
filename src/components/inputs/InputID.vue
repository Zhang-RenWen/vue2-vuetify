<template>
  <div>
    <b v-if="name" class="pl-0">{{ name }}</b>
    <v-text-field
      ref="inputRef"
      v-model.trim="localValue"
      :placeholder="!name && type[0] === 'insrdId' ? '事故人ID' : ''"
      :rules="localRules"
      :readonly="isDisabled"
      class="multiLine inputId"
      :class="{ 'inputId--colorChanged': hasChanged, 'inputId--disabled': isDisabled, isChanged }"
      :max-length="24"
      solo
      outlined
      flat
      hide-details="auto"
      v-on="listeners"
      @paste.prevent="onPaste"
      @keyup.prevent="toUpperCase"
    />
  </div>
</template>

<script>
import { disabledMixin, changeColorMixin, inputRefMixin } from './inputMixin.js'
export default {
  mixins: [disabledMixin, changeColorMixin, inputRefMixin],
  props: {
    name: {
      type: String,
      default: ''
    },

    value: { type: String, default: '' },
    types: {
      type: Array,
      default() {
        return ['TaiwanOnly'] // ['includingForeign', 'TaiwanOnly']
      }
    },

    errorCode: {
      type: Number,
      default: 0 // success
    },

    rules: {
      type: Array,
      default() {
        return []
      }
    },

    required: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      errorMessages: {
        0: '身分證字號錯誤',
        1: '此欄位僅可輸入半形 英文/正數(包含0)'
      }
    }
  },

  computed: {
    localValue: {
      get() {
        return this.value
      },

      set(newValue) {
        if (newValue) {
          this.$emit('input', newValue)
        }
      }
    },

    localRules() {
      if (this.disabled) {
        return []
      }
      const rules = this.rules
      rules.push(this.checkEmpty)
      rules.push(this.checkId)
      return rules
    },

    localCustomMessages() {
      const mergedMessages = Object.assign(this.errorDefaultMessages.errorCustomMessage)
      return mergedMessages
    },

    listeners() {
      const { ...listeners } = this.$listeners
      return listeners
    }
  },

  methods: {
    // inputId
    onPaste(e) {
      const value = e.clipboardData.getData('text').toUpperCase().trim()
      this.$emit('input', value)
    },

    checkId(item) {
      if (!item) {
        true
      }

      const canBeTaiwanId = this.type.includes('TaiwanOnly')
      const canBeForeignId = this.type.includes('includingForeign')
      let auditCode = 0
      if (canBeTaiwanId) {
        auditCode += 1
      }
      if (canBeForeignId) {
        auditCode += 2
      }

      let errorCode = 0
      switch (auditCode) {
        case 1: {
          item = item.toUpperCase()
          if (!this.checkTaiwanId(item)) {
            errorCode = auditCode
          }
          break
        }
        case 2: {
          item = item.toUpperCase()
          if (!this.checkInsrdId(item)) {
            errorCode = auditCode
          }
          break
        }
      }
      this.$emit('update:errorCode', errorCode)
      return !errorCode || this.localErrorMessages[errorCode]
    },

    checkInsrdId(item) {
      // 只可輸入半形英文數字
      const regex = /^[a-zA-Z0-9]+$/.test(item)
      return regex
    },

    checkTaiwanId(item) {
      const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const m = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
      const s =
        (abc.indexOf(item.substring(0, 1).toUpperCase()) + 10).toString() + item.substring(1, 10)
      let sum = 0
      for (let i = 0; i < s.length; i++) {
        sum += s[i] * m[i]
      }
      return sum % 10 === 0
    },

    toUpperCase() {
      const el = this.$refs.$el.querySelector('input')
      const formatValue = el.value.trim().toUpperCase()
      el.value = formatValue
      this.$emit('input', formatValue)
    }
  }
}
</script>

<style lang="scss" scoped>
/* stylelint-disable */
.multiline {
  white-space: pre-line;
}

::v-deep {
  .input--colorChanged {
    input {
      color: red;
    }
  }
  &.inputId .v-input__control {
    min-height: unset;
  }
}
</style>

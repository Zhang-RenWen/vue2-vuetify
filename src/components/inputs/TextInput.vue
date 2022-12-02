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
      :error.sync="localError"
      :max-length="maxLength"
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
      @blur="validate()"
      @reset="reset"
      @paste.prevent="onPaste"
      @keyup.prevent="toUpperCase"
    />
  </div>
</template>

<script>
import { changeColorMixin, inputRefMixin, formatterMixin, limitInputMixin } from './inputMixin.js'
import tooltipLabel from '@/components/tooltip/tooltipLabel'
export default {
  components: { tooltipLabel },

  mixins: [changeColorMixin, inputRefMixin, formatterMixin, limitInputMixin],
  inheritAttrs: false,

  props: {
    name: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    maxLength: {
      type: Number,
      default: null
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
    },

    errorCustomMessages: {
      type: Object,
      default() {}
    },

    types: {
      type: Array,
      default() {
        return ['chinese', 'english', 'number', 'symbol'] // ['中文','英文','數字', '特殊字元']
      }
    },

    required: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      errorDefaultMessages: {
        3: '此欄位僅可輸入半形英文數字'
      },

      localError: ''
    }
  },

  computed: {
    localRules() {
      if (this.disabled) {
        return []
      }
      const rules = this.rules
      if (this.maxLength) {
        rules.unshift(this.checkLength)
      }

      rules.unshift(this.checkTypes)
      rules.unshift(this.checkEmpty)

      return rules
    },

    localCustomMessages() {
      const mergedMessages = Object.assign(this.errorDefaultMessages, this.errorCustomMessages)
      return mergedMessages
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

  mounted() {
    let showWebFont = this.$refs.inputRef
    if (this.isWebFont) {
      showWebFont.$refs.input['alt'] = 'webfont'
    }
  },

  methods: {
    validate(showMessage = false) {
      return this.$refs.inputRef.validate(showMessage)
    },

    reset() {
      return this.$refs.inputRef.reset()
    },

    checkEmpty(value) {
      const name = this.name ? this.name : '此欄位'
      return !this.required || !!value || `${name}為必填不可空白`
    },

    checkLength(value) {
      if (typeof value === 'boolean' || (!value && value !== 0)) return true
      return String(value).length <= this.maxLength || '此欄位值超過可輸入之長度'
    },

    checkIsChinese(character) {
      return (
        !this.checkIsEnglish(character) &&
        !this.checkIsNumber(character) &&
        !this.checkIsSymbol(character)
      )
    },

    checkIsEnglish(character) {
      // 半形檢核
      const regex = /^[a-zA-Z \-',.]$/
      const isNormal = regex.test(character)
      // 全形
      const charCode = character.charCodeAt(0)
      const isFullWidthUpperCase = 65313 <= charCode && charCode <= 65338
      const isFullWidthLowerCase = 65345 <= charCode && charCode <= 65370
      return isNormal || isFullWidthUpperCase || isFullWidthLowerCase
    },

    checkIsNumber(character) {
      const regex = /^[0-9]+$/
      return regex.test(character)
    },

    checkIsSymbol(character) {
      // 半形字元檢核
      const regex = /^[\u0021-\u002F\u003A-\u0040\u005B\u0060\u007B-\u007E\s\u3001-\u303F]/
      // 全形字元檢核
      const regexFullWidth =
        /^\u3000|[\uFE01-\uFF0F]|[\uFF1A-\uFF20]|[\uFF3B-\uFF40]|[\uFF5B-\uFFEE]/
      return regex.test(character) || regexFullWidth.test(character)
    },

    checkTypes(value) {
      value = String(value)
      value = [...value]
      const hasEnglish = this.types.includes('english')
      const hasNumber = this.types.includes('number')
      const hasSymbol = this.types.includes('symbol')
      const hasChinese = this.types.includes('chinese')

      let statusCode = 0
      if (hasEnglish) {
        statusCode += 1
      }
      if (hasNumber) {
        statusCode += 2
      }
      if (hasSymbol) {
        statusCode += 4
      }
      if (hasChinese) {
        statusCode += 8
      }

      let isValid = true
      let errorMessage = ''
      switch (statusCode) {
        // 檢核英文
        case 1: {
          value.forEach((character) => {
            if (!this.checkIsEnglish(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }
        // 檢核數字
        case 2: {
          value.forEach((character) => {
            if (!this.checkIsNumber(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }
        // 檢核英文數字
        case 3: {
          value.forEach((character) => {
            if (!this.checkIsEnglish(character) && !this.checkIsNumber(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核特殊字元
        case 4: {
          value.forEach((character) => {
            if (!this.checkIsSymbol(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核英文特殊字元
        case 5: {
          value.forEach((character) => {
            if (!this.checkIsEnglish(character) && !this.checkIsSymbol(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核數字特殊字元
        case 6: {
          value.forEach((character) => {
            if (!this.checkIsNumber(character) && !this.checkIsSymbol(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核英文數字特殊字元
        case 7: {
          value.forEach((character) => {
            if (
              !this.checkIsEnglish(character) &&
              !this.checkIsNumber(character) &&
              !this.checkIsSymbol(character)
            ) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核中文
        case 8: {
          value.forEach((character) => {
            if (!this.checkIsChinese(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核中文英文
        case 9: {
          value.forEach((character) => {
            if (!this.checkIsChinese(character) && !this.checkIsEnglish(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核中文數字
        case 10: {
          value.forEach((character) => {
            if (!this.checkIsChinese(character) && !this.checkIsNumber(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核中文英文數字
        case 11: {
          value.forEach((character) => {
            if (
              !this.checkIsChinese(character) &&
              !this.checkIsEnglish(character) &&
              !this.checkIsNumber(character)
            ) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核中文符號
        case 12: {
          value.forEach((character) => {
            if (!this.checkIsChinese(character) && !this.checkIsSymbol(character)) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }
        // 檢核中文英文符號
        case 13: {
          value.forEach((character) => {
            if (
              !this.checkIsChinese(character) &&
              !this.checkIsEnglish(character) &&
              !this.checkIsSymbol(character)
            ) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核中文數字符號
        case 14: {
          value.forEach((character) => {
            if (
              !this.checkIsChinese(character) &&
              !this.checkIsNumber(character) &&
              !this.checkIsSymbol(character)
            ) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        // 檢核中文英文數字符號
        case 15: {
          value.forEach((character) => {
            if (
              !this.checkIsChinese(character) &&
              !this.checkIsEnglish(character) &&
              !this.checkIsNumber(character) &&
              !this.checkIsSymbol(character)
            ) {
              isValid = false
              errorMessage = this.localCustomMessages[statusCode]
            }
          })
          break
        }

        case 0:
        default: {
          if (statusCode !== 0) {
            console.log('InputTextField statusCode exception!')
          }
        }
      }

      // 錯誤處理
      if (isValid) {
        return true
      } else if (!errorMessage) {
        errorMessage = '格式錯誤'
      }
      return errorMessage
    },

    toUpperCase() {
      if (this.uppercase) {
        const el = this.$refs.inputRef.$el.querySelector('input')
        const formatValue = el.value.trim().replace(' ', '').toUpperCase()
        el.value = formatValue
        this.$emit('input', formatValue)
      }
    },

    onFocus(e) {
      this.$emit('focus', e)
    }
  }
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

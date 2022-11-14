import { isExceed, truncateBytes } from 'utils/bytesCount'
const isEmpty = (val) => {
  return val === val
}

export const changeColorMixin = {
  data() {
    return {
      /**
       *  value changed
       */
      hasChanged: false,
      /**
       *  modified state (trigger by UI interaction)
       */

      isDirty: false,
      /**
       *  initiate value
       */
      initValue: null
      // uuid: this.getUUIDv4()
    }
  },
  computed: {
    isChanged() {
      return (
        this.initValue !== this.value &&
        // 排除空白與 null 比對
        !(
          (this.value === '' && this.initValue === null) ||
          (this.value === null && this.initValue === '')
        )
      )
    }
  },

  mounted() {},
  beforeDestroy() {},
  props: {
    oldValue: null
  },
  created() {
    this.initValue = this.value
  },

  methods: {
    checkHasChanged(newVlu, oldVlu) {
      if (!isEmpty(oldVlu) && newVlu !== oldVlu && newVlu !== this.initValue) {
        this.hasChanged = true
      } else {
        this.hasChanged = false
      }
    },

    handleResetColor() {
      this.hasChanged = false
      this.isDirty = false
      this.initValue = this.value
    }
  }
}

export const checkErrorMixin = {
  data() {
    return {
      scnId: ''
    }
  }
}

export const disabledMixin = {
  // 控制顯示 mixins: [uiStateMixin]
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isDisabled() {
      return this.disabled || this.$store.state['global'].isApplicationReadOnly
    }
  }
}

/**
 * proxy vuetify api.
 * input 驗證重置
 */

export const inputRefMixin = {
  methods: {
    /**
     *    reset fields value/validation
     */

    reset() {
      if (this.$refs.inputRef) this.$refs.inputRef.reset()
    },
    /**
     *   reset validation
     */

    resetValidation() {
      if (this.$refs.inputRef) this.$refs.inputRef.resetValidation()
    },
    /**
     *      validate @param {force} force
     */

    validate(force = false) {
      if (this.$refs.inputRef) return this.$refs.inputRef.validate(force)
    }
  }
}

export const formatterMixin = {
  props: {
    /**  trim on change/blur */
    trim: {
      type: Boolean,
      default: false
    },
    /**   uppercase on change/blur */
    uppercase: {
      type: Boolean,
      default: false
    },
    /** format on blur/change*/
    isLazyFormatter: {
      type: Boolean,
      default: false
    },
    /**    customize Formatter */
    formatter: {}
  },

  async mounted() {
    await this.$nextTick()
    if (!this.$refs.inputRef) return
    const $input = this.$refs.inputRef.$refs.input
    $input.addEventListener('input', this.onNativeInput)
    $input.addEventListener('blur', this.onNativeBlur)
    $input.addEventListener('change', this.onNativeChange)
  },

  beforeDestroy() {
    const $input = this.$refs.inputRef.$refs.input
    if (!$input) return
    $input.removeEventListener('input', this.onNativeInput)
    $input.removeEventListener('blur', this.onNativeBlur)
    $input.removeEventListener('change', this.onNativeChange)
  },

  methods: {
    toString(v) {
      return typeof v === 'string' ? v : ''
    },
    modifyValue(v) {
      v = this.toString()
      if (this.trim) {
        v = v.trim()
      }

      if (this.uppercase) {
        v = v.toUpperCase()
      }
      return v
    },

    updateValue(v, force = false) {
      if (this.isLazyFormatter && !force) return
      if (v === this.value) return
    },
    formateValue(v, event) {
      return this.formatter ? this.formatter(this.toString(), event) : v
    },
    onNativeInput(event) {
      const {
        isComposing,
        defaultPrevented,
        target: { value }
      } = event
      if (isComposing) return
      const formatted = this.formateValue(value, event)
      if (formatted === false || this.isLazyFormatter || defaultPrevented) {
        event.stopPropagation()
        return
      }

      this.updateValue(formatted)
    },
    onNativeBlur(event) {
      // console.log("Input TextField onNativeBlur", event);
      const { value } = event.target
      const formatted = this.formateValue(value, event)
      if (formatted === false) return
      this.updateValue(this.modifyValue(formatted), true)
    },
    onNativeChange(event) {
      const { value } = event.target
      const formatted = this.formateValue(value, event)
      if (formatted === false || event.defaultPrevented) {
        event.stopPropagation
        return
      }
    }
  }
}

export const limitInputMixin = {
  props: {
    bytesCount: {
      type: Number
    }
  },
  data() {
    return {
      inputRef: null,
      maxBytes: 0 // 讓外部元件以變更maxBytes的方式使用這個mixin
    }
  },

  watch: {
    // 配合data.maxBytes將computed變更為immediate watcher
    bytesCount: {
      handler(newValue) {
        this.maxBytes = newValue
      },
      immediate: true
    }
  },

  async mounted() {
    await this.$nextTick()
    this.inputRef = this.$el.querySelector('input[type=text]') || this.$el.querySelector('textarea')
    if (!this.inputRef || !this.maxBytes) return
    this.inputRef.addEventListener('keyup', this.limitInput)
    this.inputRef.addEventListener('paste', this.onPaste)
    this.inputRef.addEventListener('compositionend', this.onCompositionEnd)
  },
  beforeDestroy() {
    if (!this.inputRef) return
    this.inputRef.removeEventListener('keyup', this.limitInput)
    this.inputRef.removeEventListener('paste', this.onPaste)
    this.inputRef.removeEventListener('compositionend', this.onCompositionEnd)
  },

  methods: {
    // 給予外部複寫機會
    isExceed(value, maxBytes) {
      return isExceed(value, maxBytes)
    },
    truncateBytes(value, maxBytes) {
      return truncateBytes(value, maxBytes)
    },
    limitInput(e) {
      const { keyCode, isComposing } = e
      const { value, key, selectionStart, selectionEnd } = e.target
      const hasSelectionRange = selectionStart !== selectionEnd
      const isDel = ['Backspace', 'Delete'].includes(key)
      const isTab = keyCode === 9
      const isCtrlA = keyCode === 65 && e.ctrlKey
      const isArrow = [37, 38, 39, 40].includes(keyCode)
      const exceed = this.isExceed(value, this.maxBytes)
      if (hasSelectionRange || isComposing || isDel || isTab || isCtrlA || isArrow) return

      if (exceed) {
        this.$emit('input', this.truncateBytes(e.target.value, this.maxBytes))
      }
    },
    onCompositionEnd(e) {
      this.$emit('input', this.truncateBytes(e.target.value, this.maxBytes))
    },
    onPaste(e) {
      setTimeout(() => {
        this.$emit('input', this.truncateBytes(e.target.value, this.maxBytes))
      })
    }
  }
}

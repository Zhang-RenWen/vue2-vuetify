import { isExceed, truncateBytes } from '@/utils/bytesCount'

export const changeColorMixin = {
  data() {
    return {
      /**
       *  value changed
       */
      hasChanged: false
    }
  },
  computed: {
    localValue: {
      get() {
        this.checkHasChanged()
        return this.value
      },
      set(newValue) {
        this.checkHasChanged()
        this.$emit('input', newValue)
      }
    }
  },

  mounted() {},
  beforeDestroy() {},
  props: {
    oldValue: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: ''
    }
  },
  created() {
    this.initValue = this.value
  },

  methods: {
    checkHasChanged() {
      const emptyTheSameGroups = ['', null, 'null', undefined]
      // 記得型別檢查
      if (
        ![undefined].includes(this.oldValue) &&
        this.value !== this.oldValue &&
        !(emptyTheSameGroups.includes(this.oldValue) && emptyTheSameGroups.includes(this.value))
      ) {
        this.hasChanged = true
      } else {
        this.hasChanged = false
      }
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
    /** trim on change/blur */
    trim: {
      type: Boolean,
      default: false
    },
    /** uppercase on change/blur */
    uppercase: {
      type: Boolean,
      default: false
    },
    /** format on blur/change*/
    isLazyFormatter: {
      type: Boolean,
      default: false
    },
    /** customize Formatter */
    formatter: {}
  },

  async mounted() {},

  beforeDestroy() {},

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

    formateValue(v, event) {
      return this.formatter ? this.formatter(this.toString(), event) : v
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

export const rules = {}

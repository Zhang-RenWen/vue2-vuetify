export const valueChangedSetColor = {
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
      type: [String, Number, null],
      default: 'A'
    },

    value: {
      type: [String, Number, null],
      default: ''
    },

    disableSetColor: {
      type: Boolean,
      default: false
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

export const inputRefEvent = {
  methods: {
    onFocus(e) {
      this.$emit('focus', e)
    },
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
     *  validate @param {force} force 強制通過
     */

    validate(force = false) {
      if (this.$refs.inputRef) return this.$refs.inputRef.validate(force)
    }
  }
}

export const formatters = {
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
    /** customize Formatter */
    formatter: {}
  },

  async mounted() {},

  beforeDestroy() {},

  methods: {
    toTrim() {
      if (this.trim) {
        const el = this.$refs.inputRef.$el.querySelector('input')
        const formatValue = el.value.replaceAll(' ', '')
        el.value = formatValue
        this.$emit('input', formatValue)
      }
    },

    toUpperCase() {
      if (this.uppercase) {
        const el = this.$refs.inputRef.$el.querySelector('input')
        const formatValue = el.value.toUpperCase()
        el.value = formatValue
        this.$emit('input', formatValue)
      }
    },

    formatValue() {
      this.toTrim()
      this.toUpperCase()
    }
  }
}

export const rulesSetting = {
  props: {
    required: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: [Number, String, null],
      default: null // null closed
    },

    minLength: {
      type: [Number, String, null],
      default: null // null closed
    },

    rules: {
      type: Array,
      default: () => []
    },

    errorMessages: {
      type: [Array, String],
      default: () => []
    }
  },
  methods: {
    checkEmpty(value) {
      const name = this.name ? this.name : '此欄位'
      return !this.required || !!value || `${name}為必填不可空白`
    },
    checkMinLength(value) {
      if (['', 0, '0', null, undefined, false].includes(value)) return true
      if (['', 0, '0', null, undefined, false].includes(this.minLength)) return true

      return String(value).length >= this.minLength || `此欄位請輸入至少${this.minLength}個字`
    },

    checkMaxLength(value) {
      if (['', 0, '0', null, undefined, false].includes(value)) return true
      if (['', 0, '0', null, undefined, false].includes(this.maxLength)) return true
      return String(value).length <= this.maxLength || '此欄位值超過可輸入之長度'
    }
  }
}

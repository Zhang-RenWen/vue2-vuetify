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
  created() {},

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

import {
  checkEnglish,
  checkChineseWords,
  checkTaiwanPhoneNumber,
  checkTaiwanTelephoneNumber,
  checkTaxNumber,
  checkEnglishIntegrate,
  checkNumberRange,
  checkTaiwanId,
  checkForeignerId,
  checkNewForeignerId,
  checkTaiwanAndForeignerId,
  checkNumberAndSymbol,
  checkNumber,
  checkIntegrate,
  checkDate,
  checkDateRange,
  checkStartDateRange,
  checkEndDateRange,
  checkIntAndDecimal,
  checkInteger,
  checkIntegerZeroToNinetyNine,
  checkIntegerRange,
  check100WithFloat,
  checkIntegerDecimal,
  checkPositiveNumber,
  checkPositiveInteger,
  checkOver6Decimals,
  checkSymbol,
  checkEnglishInteger,
  checkEnglishNumberLength8To16,
  checkEmail
} from '@/utils/validation'
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
    },

    checkEnglish(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkEnglish(value) || '請輸入英文'
    },

    checkChineseWords(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkChineseWords(value) || '請輸入中文字'
    },

    checkTaiwanPhoneNumber(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkTaiwanPhoneNumber(value) || '開頭必須為 09 且欄位長度限定10碼'
    },

    checkTaiwanTelephoneNumber(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkTaiwanTelephoneNumber(value) || '輸入區碼並檢視長度是否正確'
    },

    checkTaxNumber(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkTaxNumber(value) || '統編錯誤（ 8 個數字）'
    },

    checkEnglishIntegrate(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkEnglishIntegrate(value) || '限輸入英文數字'
    },

    checkNumberRange(value, min, max) {
      if (['', null, undefined, false].includes(value)) return true
      return checkNumberRange(value, min, max) || '數值超出限制'
    },

    // ID

    checkTaiwanId(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkTaiwanId(value) || '身份證驗證錯誤'
    },

    checkForeignerId(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkForeignerId(value) || '居留證號碼驗證錯誤'
    },

    checkNewForeignerId(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkNewForeignerId(value) || '居留證號碼驗證錯誤'
    },

    checkForeignerOtherId(otherId, id = '') {
      if (![null, '', undefined].includes(id)) {
        // 身分證 為舊式統一證號 其他ID不可輸入
        if (checkForeignerId(id) && ![null, ''].includes(otherId)) {
          return '身分證ID非新式外來人口統一證號,其他ID不可輸入'
        }
        // 身分證 為新式統一證號 其他ID不可輸入 新式統一證號
        if (
          checkNewForeignerId(id) &&
          ![null, ''].includes(otherId) &&
          checkNewForeignerId(otherId)
        ) {
          return '(角色)ID欄位應輸入為新式統一證號、其他ID欄位英數入為舊式統一證號'
        }
      }
      return true
    },

    checkTaiwanAndForeignerId(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkTaiwanAndForeignerId(value) || '身分證字號與統一證號格式驗證錯誤'
    },

    checkNumberAndSymbol(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkNumberAndSymbol(value) || '必須為數字或+#-的符號'
    },

    checkIntegrate(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkIntegrate(value) || '須為整數'
    },

    // date

    checkDate(value) {
      return checkDate(value) || '日期格式錯誤'
    },

    checkDateRange(value, startDate, endDate, checkDateTimeFlag, text = '日期') {
      return (
        checkDateRange(value, startDate, endDate, checkDateTimeFlag) ||
        `${text}區間(迄日)不可小於${text}區間(起日)`
      )
    },

    checkStartDateRange(startDate, endDate) {
      return checkStartDateRange(startDate, endDate) || '日期不可大於迄日'
    },

    checkEndDateRange(startDate, endDate) {
      return checkEndDateRange(startDate, endDate) || '日期不可小於起日'
    },

    // number

    checkIntAndDecimal(value, int, decimal) {
      if (['', null, undefined, false].includes(value)) return true
      return checkIntAndDecimal(value, int, decimal) || `限制整數位${int}位及小數點${decimal}位`
    },

    checkNumber(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkNumber(value) || '必須為數字'
    },

    checkInteger(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkInteger(value) || '必須為整數'
    },

    checkIntegerZeroToNinetyNine(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkIntegerZeroToNinetyNine || '輸入範圍0~99'
    },

    checkIntegerRange(value, min, max) {
      if (['', null, undefined, false].includes(value)) return true
      return checkIntegerRange(value) || `輸入範圍${min}~${max - 1}`
    },

    check100WithFloat(value, allowNegative = false) {
      if (['', null, undefined, false].includes(value)) return true
      return check100WithFloat(value) || `請輸入範圍${!allowNegative ? '-10' : ''}0.00~100.00`
    },

    checkIntegerDecimal(value, integer, decimal) {
      if (['', null, undefined, false].includes(value)) return true
      return (
        checkIntegerDecimal(value, integer, decimal) || `限制整數${integer}位及小數點${decimal}位`
      )
    },

    checkPositiveNumber(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkPositiveNumber(value) || '輸入正數'
    },

    checkPositiveInteger(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkPositiveInteger(value) || '請輸入正整數'
    },

    checkOver6Decimals(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkOver6Decimals(value) || '輸入小數位數需在 6 位以內'
    },

    // mix

    checkSymbol(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkSymbol(value) || '請輸入符號'
    },

    checkEnglishInteger(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkEnglishInteger(value) || '只能輸入半形英文正整數'
    },

    checkEnglishNumberLength8To16(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkEnglishNumberLength8To16(value) || '請輸入8-16位英文數字'
    },

    // email
    checkEmail(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkEmail(value) || '電子郵件格式有誤'
    }
  }
}

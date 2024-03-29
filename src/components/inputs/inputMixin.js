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
      type: [String, Number, Array],
      default: ''
    },

    value: {
      type: [String, Number, Array],
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
    },

    onFocusFormatField() {
      this.isFocused = true
      setTimeout(() => {
        const el =
          this.$refs.inputRef.$el.querySelector('input') ||
          this.$refs.inputRef.$el.querySelector('textarea')
        if (el) {
          el.focus()
        }
      }, 0)
    }
  }
}

import {
  ToDec,
  ToCDB,
  rocDate,
  toRound,
  toPad0AfterPoint,
  toClearPrefix0,
  toCurrency,
  toHalfWidth,
  toFullWidth
} from '@/utils/format'
export const formatters = {
  props: {
    /** customize Formatter */
    format: {
      type: Array,
      default() {
        return []
      }
    },
    displayFormat: {
      type: Array,
      default() {
        return []
      }
    }
  },

  async mounted() {
    this.formatLocalValue = structuredClone(this.localValue)
    this.formatValue()
  },

  beforeDestroy() {},

  methods: {
    // 定義在 methods 可以讓所有 input 訪問 format.js 增加彈性
    toString(v) {
      return typeof v === 'string' ? v : ''
    },
    toTrim(v) {
      return String(v).replaceAll(' ', '')
    },

    toUpperCase(v) {
      return String(v).toUpperCase()
    },

    toHalfWidth(v) {
      return toHalfWidth(v)
    },

    toFullWidth(v) {
      return toFullWidth(v)
    },

    ToDec(v) {
      return ToDec(v)
    },
    ToCDB(v) {
      return ToCDB(v)
    },
    rocDate() {
      console.log(rocDate)
    },

    toRound(v) {
      return toRound(v)
    },

    toPad0AfterPoint(v) {
      return toPad0AfterPoint(v)
    },

    toClearPrefix0(v) {
      return toClearPrefix0(v)
    },

    toCurrency(v) {
      return toCurrency(v, this.precision)
    },

    formatValue() {
      let formatValue = ''
      let allFormatMethods = this.format
      let allDisplayFormatMethods = this.displayFormat
      if (!allFormatMethods.includes('toPad0AfterPoint') && this.precision > 0) {
        allFormatMethods.unshift('toPad0AfterPoint')
      }
      if (!allFormatMethods.includes('toClearPrefix0') && !this.precision) {
        allFormatMethods.unshift('toClearPrefix0')
      }
      allFormatMethods.forEach((methodName) => {
        if (this[methodName] && !['formatValue', 'toCurrency'].includes(methodName)) {
          formatValue = this[methodName](this.localValue)
        }
      })
      allDisplayFormatMethods.forEach((methodName) => {
        if (!['formatValue'].includes(methodName)) {
          this.formatLocalValue = this[methodName](formatValue)
        }
      })
      this.localValue = formatValue
    },

    /**
     * 限制數字類型 input 位數
     * 注意： format 在輸入時
     * @param { $event } e
     * @param { Number } maxLength
     * @returns
     */
    // 輸入時 format
    limitNumberLength(text, maxLength) {
      if (!text) {
        return
      }
      if (!maxLength) {
        return text
      }
      maxLength = Number(maxLength)
      const splitText = [...text]
      const hasDot = splitText.includes('.')
      const diff = hasDot ? 1 : 0
      setTimeout(() => {
        if (text.length > maxLength + diff) {
          splitText.length = maxLength + diff
          this.$emit('input', Number(splitText.join('')))
        } else {
          this.$emit('input', text)
        }
      }, 0)
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
  checkEmail,
  checkValidEmail,
  checkURL,
  checkHttpUrl,
  checkRegURL,
  checkRegHttpUrl
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

    min: {
      type: [Number, String, null],
      default: null // null closed
    },

    max: {
      type: [Number, String, null],
      default: null // null closed
    },

    precision: {
      type: [Number],
      default: 0
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
      if (['', 0, '0', null, 'null', undefined, false].includes(value)) return true
      if (['', 0, '0', null, 'null', undefined, false].includes(this.minLength)) return true

      return String(value).length >= this.minLength || `此欄位請輸入至少${this.minLength}個字`
    },

    checkMaxLength(value) {
      if (['', 0, '0', null, 'null', undefined, false].includes(value)) return true
      if (['', 0, '0', null, 'null', undefined, false].includes(this.maxLength)) return true
      if (
        this.format.includes('toCurrency') &&
        this.type === 'number' &&
        this.isFocused === false
      ) {
        const diff = [...String(value)].filter((text) => text === ',').length
        return (
          String(value).length <= Number(this.maxLength) + Number(diff) ||
          '此欄位值超過可輸入之長度'
        )
      }
      return String(value).length <= this.maxLength || '此欄位值超過可輸入之長度'
    },

    checkEnglish(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkEnglish(value) || '請輸入英文'
    },

    checkChineseWords(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkChineseWords(value) || '請輸入中文字'
    },

    checkTaiwanPhoneNumber(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkTaiwanPhoneNumber(value) || '開頭必須為 09 且欄位長度限定10碼'
    },

    checkTaiwanTelephoneNumber(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkTaiwanTelephoneNumber(value) || '輸入區碼並檢視長度是否正確'
    },

    checkTaxNumber(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkTaxNumber(value) || '統編錯誤（ 8 個數字）'
    },

    checkEnglishIntegrate(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkEnglishIntegrate(value) || '限輸入英文數字'
    },

    checkNumberRange(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkNumberRange(value, this.min, this.max) || '數值超出限制'
    },

    // ID

    checkTaiwanId(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkTaiwanId(value) || '身份證驗證錯誤'
    },

    checkForeignerId(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkForeignerId(value) || '居留證號碼驗證錯誤'
    },

    checkNewForeignerId(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkNewForeignerId(value) || '居留證號碼驗證錯誤'
    },

    checkForeignerOtherId(otherId, id = '') {
      if (![null, 'null', '', undefined].includes(id)) {
        // 身分證 為舊式統一證號 其他ID不可輸入
        if (checkForeignerId(id) && ![null, ''].includes(otherId)) {
          return '身分證ID非新式外來人口統一證號,其他ID不可輸入'
        }
        // 身分證 為新式統一證號 其他ID不可輸入 新式統一證號
        if (
          checkNewForeignerId(id) &&
          ![null, 'null', ''].includes(otherId) &&
          checkNewForeignerId(otherId)
        ) {
          return '(角色)ID欄位應輸入為新式統一證號、其他ID欄位英數入為舊式統一證號'
        }
      }
      return true
    },

    checkTaiwanAndForeignerId(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkTaiwanAndForeignerId(value) || '身分證字號與統一證號格式驗證錯誤'
    },

    checkNumberAndSymbol(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkNumberAndSymbol(value) || '必須為數字或+#-的符號'
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
      if (['', null, 'null', undefined, false].includes(value)) return true
      return checkIntAndDecimal(value, int, decimal) || `限制整數位${int}位及小數點${decimal}位`
    },

    checkNumber(value) {
      if (['', null, 'null', undefined, false].includes(value)) return true
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

    // Email
    checkEmail(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkEmail(value) || '電子郵件格式有誤'
    },
    checkValidEmail(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkValidEmail(value) || '電子郵件格式有誤'
    },
    // 網址
    checkURL(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkURL(value) || '網址格式有誤'
    },
    checkHttpUrl(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkHttpUrl(value) || '網址格式有誤'
    },
    checkRegURL(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkRegURL(value) || '網址格式有誤'
    },
    checkRegHttpUrl(value) {
      if (['', null, undefined, false].includes(value)) return true
      return checkRegHttpUrl(value) || '網址格式有誤'
    }
  }
}

import moment from 'moment'
import { inRange } from 'lodash'

/**
 * 必填
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function isRequired(value, args) {
  const { msg = '必填欄位' } = { ...args }
  // value 為 0 要為 truthy
  if (value === 0 || value) {
    if (typeof value === 'string' && value.trim()) {
      return true
    } else {
      return false
    }
  }
  return msg
}

/**
 * 台灣手機號碼
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function isMobile(value, args) {
  const { msg = '開頭必須為 09 且欄位長度限定10碼' } = { ...args }
  if (!value) return true
  const mobileReg = /^(\+886\s)?[0]{1}[9]{1}\d{8}$/
  return mobileReg.test(value) || msg
}

/**
 * 家用電話
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function isTelephoneNumber(value, args) {
  const { msg = '輸入區碼並檢視長度是否正確' } = { ...args }
  if (!value) return true
  const telephoneReg = /^([0]{1})[#\d]{8,}$/
  return telephoneReg.test(value) || msg
}

/**
 * 統一編號
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function checkTaxNumber(value, args) {
  const { msg = '統編錯誤（ 8 個數字）' } = { ...args }
  if (!value) return true
  const cx = [1, 2, 1, 2, 1, 2, 4, 1]
  const cNumber = value.split('')
  let sum = 0
  function cc(number) {
    let total = number
    if (total > 9) {
      let s = total.toString()
      const n1 = s.substring(0, 1) * 1
      const n2 = s.substring(1, 2) * 1
      total = n1 + n2
    }
    return total
  }

  cNumber.forEach((item, index) => {
    sum += cc(item * cx[index])
  })
  const taxNumberReg = /^\d{8}$/

  return (
    (taxNumberReg.test(value) && sum % 10 === 0) ||
    (cNumber[6] === '7' && (sum + 1) % 10 === 0) ||
    msg
  )
}

/**
 * 只有英文數字
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function EnDigit(value, args) {
  const { msg = '限輸入英文數字' } = { ...args }
  return /[A-Za-z0-9]*$/g.test(value) || msg
}

/**
 * 驗證資料長度
 * @param {*} value
 * @param {object} args - {length:資料長度,欄位名稱, msg: 自訂錯誤訊息}
 * @returns
 */
export function checkTextLength(value, args) {
  const { length = null, label = '', msg = `${label}應為${length}碼，請修正` } = { ...args }

  if (value || !length) return true
  return String(value).length === +length || msg
}

/**
 * 檢查數字範圍
 * @param {*} value
 * @param {object} args - {min:最小值, max:最大值 ,msg: 自訂錯誤訊息}
 * @returns
 */
export function numberRange(value, args) {
  const { min = 0, max = 0, msg = `輸入範圍${min}~${max}` } = { ...args }
  const maxNumber = Math.max(min, max)
  const minNumber = Math.min(min, max)
  return (value >= minNumber && value <= maxNumber) || msg
}

/**
 * 台灣身分證驗證
 * @param {*} value
 * @param {object} args - { msg: 自訂錯誤訊息}
 * @returns
 */
export function checkTaiwanId(value, args) {
  const ID = value.toUpperCase()
  const { msg = '身份證驗證錯誤' } = { ...args }
  const isTaiwanId =
    /[A-Z][1-2]\d{8}$/g.test(ID) &&
    (function (item) {
      const abc = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
      const m = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
      const s = (abc.indexOf(item.substring(0, 1)) + 10).toString() + item.substring(0, 10)
      let sum = 0
      for (let i = 0; i < s.length; i++) {
        sum += s[i] * m[i]
      }
      return sum % 10 === 0
    })(ID)

  return isTaiwanId || msg
}

/**
 * 檢查台灣居留證號碼 舊式統一證號
 * @param id 居留證號碼
 */
export function checkForeignerId(id) {
  const ID = id.toUpperCase()
  if (!/[A-Z]{2}\d{8}$/g.test(ID)) return false
  const abc = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
  const m = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  const s =
    (abc.indexOf(ID.substring(0, 1)) + 10).toString() +
    (abc.indexOf(ID.substring(1, 2)) % 10).toString() +
    ID.substring(2)

  let sum = 0
  for (let i = 0; i < s.length; i++) {
    sum += s[i] * m[i]
  }
  return sum % 10 === 0
}

/**
 * 檢查台灣居留證號碼 新式統一證號
 * @param id 居留證號碼
 */
export function checkNewForeignerId(id) {
  const ID = id.toUpperCase()
  if (!/[A-Z][8,9]\d{8}$/g.test(ID)) {
    return false
  }
  // A 845120013
  const m = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  let number1to2 = null
  // 統一證號的1碼英文字對應『統號』的第1-2碼
  // 統一證號的2-9碼作為『統號』的第3-10碼
  // 統一證號的第10碼（最後一碼）為檢查碼
  switch (ID.substring(0, 1)) {
    case 'A':
      number1to2 = [1, 0]
      break
    case 'B':
      number1to2 = [1, 1]
      break
    case 'C':
      number1to2 = [1, 2]
      break
    case 'D':
      number1to2 = [1, 3]
      break
    case 'E':
      number1to2 = [1, 4]
      break
    case 'F':
      number1to2 = [1, 5]
      break
    case 'G':
      number1to2 = [1, 6]
      break
    case 'H':
      number1to2 = [1, 7]
      break
    case 'J':
      number1to2 = [1, 8]
      break
    case 'K':
      number1to2 = [1, 9]
      break
    case 'L':
      number1to2 = [2, 0]
      break
    case 'M':
      number1to2 = [2, 1]
      break
    case 'N':
      number1to2 = [2, 2]
      break
    case 'P':
      number1to2 = [2, 3]
      break
    case 'Q':
      number1to2 = [2, 4]
      break
    case 'R':
      number1to2 = [2, 5]
      break
    case 'S':
      number1to2 = [2, 6]
      break
    case 'T':
      number1to2 = [2, 7]
      break
    case 'U':
      number1to2 = [2, 8]
      break
    case 'V':
      number1to2 = [2, 9]
      break
    case 'X':
      number1to2 = [3, 0]
      break
    case 'Y':
      number1to2 = [3, 1]
      break
    case 'W':
      number1to2 = [3, 2]
      break
    case 'Z':
      number1to2 = [3, 3]
      break
    case 'I':
      number1to2 = [3, 4]
      break
    case 'O':
      number1to2 = [3, 5]
      break
    default:
      return false
  }

  // 檢查碼＋ 『統號』各碼乘上其對應特定數（倍數）取 10 的餘數等於 0 即為有效的統一證號
  let sum = number1to2[0] * m[0] + number1to2[1] * m[1]
  for (let i = 1; i < 9; i++) {
    sum += parseInt(ID.substring(i, i + 1)) * m[i + 1]
  }
  return (parseInt(ID.substring(9, 10)) + sum) % 10 === 0
}

export function checkForeignerOtherId(otherId, id = '') {
  if (![null, '', undefined].includes(id)) {
    // 身分證 為舊式統一證號 其他ID不可輸入
    if (checkForeignerId(id) && ![null, ''].includes(otherId)) {
      return {
        valid: false,
        type: 'Msg02',
        msg: '身分證ID非新式外來人口統一證號,其他ID不可輸入'
      }
    }
    // 身分證 為新式統一證號 其他ID不可輸入 新式統一證號
    if (checkNewForeignerId(id) && ![null, ''].includes(otherId) && checkNewForeignerId(otherId)) {
      return {
        valid: false,
        type: 'Msg01',
        msg: '(角色)ID欄位應輸入為新式統一證號、其他ID欄位英數入為舊式統一證號'
      }
    }
    return { valid: true }
  } else {
    return { valid: true }
  }
}

/**
 * 檢查身分證字號與統一證號格式
 */
export function verifyTaiwanAndForeignerId(id) {
  if (checkTaiwanId(id) === true || checkForeignerId(id) || checkNewForeignerId(id)) {
    return true
  }
  return false
}

/**
 * 用身分證字號回傳性別
 * M 男
 * F 女
 * U 不明
 */
export function idCheckGender(id) {
  if ([null, '', undefined].includes(id)) return ''
  const oneWord = id.charAt(0)
  const checkWord = id.charAt(1)
  let gender = ''
  if (id.length === 10) {
    // 第一碼為英文
    if (/^[A-Za-z]*$/g.test(oneWord)) {
      if (['A', 'C'].includes(checkWord)) gender = 'M'
      if (['B', 'D'].includes(checkWord)) gender = 'F'
      if (['1', '8'].includes(checkWord)) gender = 'M'
      if (['2', '9'].includes(checkWord)) gender = 'F'
    }
  }
  return gender
}

/**
 * 驗證只有數字和符號
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function numberAndSymbol(value, args) {
  const { msg = '必須為數字或+#-的符號' } = { ...args }
  return /^([0-9+#-]*)$/.test(value) || msg
}

/**
 * 羅馬拼音符號 編碼
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function romeSystemCodeList() {
  const arr = [
    'ff1a', // 全形：
    'ff0e', // 全形。
    'e863', // ，
    'e936', // ＾
    'ee15', //
    'ee49', //
    'f576', //
    'f583', //
    '20' // 空白
  ]
  return arr
}

export function isNumber(value, args) {
  const { msg = '必須為數字' } = { ...args }
  const numberString = String(value)
  const regex = /^[0-9]*(\.\d*)?$/
  return regex.test(numberString) || msg
}

export function validDate(value) {
  if (!value) return true
  const isoRegex =
    /^\d{4}([-/.]?)\d{2}([-/.]?)\d{2}((.([01][0-9][2][03]):[0-5]:[0-9]:[0-5][0-9])?)$/
  return (isoRegex.test(value) && moment(value, 'YYYY/MM/DD HH:mm:ss').isValid()) || '日期格式錯誤'
}

// 日期區間 迄日不可小於起日
export function dateRange(startDate, endDate, text = '日期') {
  // 預期已先驗證日期格式是否正確
  if (!startDate || !endDate) return true
  return startDate <= endDate || `${text}區間(迄日)不可小於${text}區間(起日)`
}

// 日期區間
export function checkDateStartEnd({ start, end, text = '', msg = '' }) {
  // 預期已先驗證日期格式是否正確
  if (!start || !end) return true
  const from = new Date(Date.parse(start))
  const to = new Date()(Date.parse(end))
  if (validDate(start) !== true || validDate(end) !== true) return '日期格式錯誤'
  const showText = msg !== '' ? msg : `${text}(起日)不可大於${text}(迄日)`
  return to >= from || showText
}

/**
 *
 * @param {*} startDate
 * @param {*} endDate
 * @param {*} text
 * @returns
 */
export function checkDateRange(value, args) {
  const {
    dateRange = { startDate: '', endDate: '' },
    checkDateTimeFlag = 'minutes',
    msg = '不在日期區間內'
  } = { ...args }
  if (
    !moment(dateRange.startDate).isValid() ||
    !moment(dateRange.endDate).isValid() ||
    !moment(value).isValid()
  )
    return true
  return moment(value).isBetween(dateRange.startDate, dateRange.endDate, checkDateTimeFlag) || msg
}

/**
 * 針對日期區間的起日檢核不能大於迄日
 * @param {*} value
 * @param {object} args - {dateRange:{startDate:起始日期,endDate:結束日期},msg: 自訂錯誤訊息}
 * @returns
 */
export function checkStartDateRange(args) {
  const { dateRange = { startDate: '', endDate: '' }, msg = '日期不可大於迄日' } = { ...args }
  if (
    validDate(dateRange.startDate) !== true ||
    validDate(dateRange.endDate) !== true ||
    !moment(dateRange.startDate).isValid() ||
    !moment(dateRange.endDate).isValid()
  ) {
    return true
  }
  return moment(dateRange.startDate).isSameOrBefore(dateRange.endDate) || `${msg}`
}

/**
 * 針對日期區間的起日檢核不可小於起日
 * @param {*} value
 * @param {object} args - {dateRange:{startDate:起始日期,endDate:結束日期},msg: 自訂錯誤訊息}
 * @returns
 */
export function checkEndDateRange(args) {
  const { startDate = '', endDate = '', msg = '日期不可小於起日' } = { ...args }
  // 兩個沒值不驗證
  if (!startDate && !endDate) {
    return true
  }
  // 其一有格式錯誤不驗證
  if (validDate(startDate) !== true || validDate(endDate) !== true) {
    return true
  }
  return (!!startDate && !!endDate) || `${msg}`
}

/**
 * 起迄日需同時存在
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function checkExistStartEndDate(args) {
  const { dateRange = { startDate: '', endDate: '' }, msg = '日期不可小於起日' } = { ...args }
  if (
    validDate(dateRange.startDate) !== true ||
    validDate(dateRange.endDate) !== true ||
    !moment(dateRange.startDate).isValid() ||
    !moment(dateRange.endDate).isValid()
  ) {
    return true
  }
  return moment(dateRange.endDate).isSameOrAfter(dateRange.startDate) || `${msg}`
}

/**
 * 同時檢查整數位和小數位
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function checkIntAndDecimal(value, args) {
  const { int = 0, decimal = 0, msg = `限制整數位${int}位及小數點${decimal}位` } = { ...args }
  const str = '^(\\d{0,' + int + '})(\\.\\d{0,' + decimal + '})?$'
  const regex = new RegExp(str)
  return regex.test(value) || msg
}

/**
 * 檢查是否為整數
 * @param {*} value
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function isInteger(value, args) {
  const { msg = '須為整數' } = { ...args }
  return (
    (!isNaN(value) && !isFinite(parseInt(Number(value)) == value && !isNaN(parseInt(value, 10)))) ||
    msg
  )
}

export function checkLength({ value, length, text = '' }) {
  if (!value || !length) {
    return true
  }
  return String(value).length == +length || `${text}應為${length}碼`
}

export function integerZeroToNinetyNine(val) {
  return /^([1-9]?\d?|null)$/.test(val) || '輸入範圍0~99'
}

/**
 * 檢查數字範圍
 * @param {Number} value
 * @param {Number} start
 * @param {Number} end
 * @param {object} args - {msg: 自訂錯誤訊息}
 * @returns
 */
export function integerRange(value, start = 0, end = 0, args) {
  if (!value) {
    return true
  }
  const { msg = `輸入範圍${start}~${end - 1}` } = { ...args }
  return inRange(value, start, end) || msg
}

export function floatOneHundredRule(value, allowNegative = false, args) {
  const { msg = `請輸入範圍${!allowNegative ? '-10' : ''}0.00~100.00` } = { ...args }
  return /^-?(((\d{1,2})([.]((\d{1,2})?))?|100(\.(0{1,2})?)?))$/.test(value) || !value || msg
}

// 動態檢驗整數、小數點
export function integerAndDecimal(value, integer, decimal, args) {
  const { msg = `限制整數${integer}位及小數點${decimal}位` } = { ...args }
  const str = '^(\\d{0,' + integer + '})(\\.\\d{0,' + decimal + '})?$)'
  const regex = new RegExp(str)
  return regex.test(value) || msg
}

export function parseROCDate(value) {
  const regRocDate = /^(\d{3})\/(\d{1,2})\/(\d{1,2})$/
  const regRocTimeDate = /^(\d{3})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2})[:(\d{1,2})]*$/
  if (regRocDate.test(value)) {
    const [, year, m, d] = regRocDate.exec(value)
    return new Date(+year, 1911 + m - 1, d)
  }
  if (regRocTimeDate.test(value)) {
    const [, rocDate, hour, minutes] = regRocTimeDate.exec(value)
    const [year, m, d] = rocDate.split('/')
    return new Date(+year + 1911 + m - 1, d, hour, minutes)
  }
  return value
}

export function getAge_moment(birthDate, baseDate = new Date()) {
  return moment(baseDate).diff(moment(birthDate), 'year')
}

export function isDST(date) {
  let Jan1 = new Date(date.getFullYear(), 0)
  let Jul1 = new Date(date.getFullYear(), 6)
  // DST in the Northern hemisphere is "fall back"
  if (
    Jan1.getTimezoneOffset() > Jul1.getTimezoneOffset() &&
    Date.getTimezoneOffset() != Jan1.getTimezoneOffset()
  ) {
    return true
  }

  // DST in the Southern hemisphere is "leap ahead"
  if (
    Jan1.getTimezoneOffset() < Jul1.getTimezoneOffset() &&
    date.getTimezoneOffset() != Jul1.getTimezoneOffset()
  ) {
    return true
  }

  return false
}

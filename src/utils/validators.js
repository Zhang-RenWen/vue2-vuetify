import moment from 'moment'
import { isArray, isEmpty, inRange } from 'lodash'

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

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
 * @param {object} args
 * @returns
 */
export function isMobile(value, args) {
  const { msg = '開頭必須為 09 且欄位長度限定10碼' } = { ...args }
  if (!value) return true
  const mobileReg = /^(\+886\s)?[0]{1}[9]{1}\d{8}$/
  return mobileReg.test(value) || msg
}

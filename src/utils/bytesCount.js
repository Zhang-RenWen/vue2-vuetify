const byteCount = (str) => {
  return str ? new Blob([str]).size : 0
}

const truncateBytes = (value, maxBytes, rule) => {
  if (maxBytes) {
    while (isExceed(value, maxBytes, rule)) {
      value = value.substring(0, value.length - 1)
    }
  }
  return value
}

/**
 * 檢驗輸入是否超過Bytes長度
 * @param {string} str inputd.chinalife.com.tw
 * @param {number} bytes
 * @param {function} rule convert string before counting bytes
 * @param{boolean}equal 長度若一樣也是回 true
 * @returns {boolean}
 */

const isExceed = (str, bytes, rule = null, equal = false) => {
  if (!bytes || typeof str !== 'string') return false
  const count = byteCount(rule ? rule(str) : str)
  return count > bytes || (equal && count === bytes)
}

export { isExceed, byteCount, truncateBytes }

/**
 * 動態頁面object單頁資料轉換
 * @param {String} pushData 帯入所有資料
 *
 *
 *
 *
 */

export function submitObjectData(pushData) {
  let newObjData = {}
  // 參數資料處理
  Object.keys(pushData).foreach((key) => {
    let dataValue = pushData[key]
    if (Array.isArray(dataValue)) {
      dataValue = dataValue.join()
      newObjData[key] = dataValue
    }
  })
  // console.log("new0bjData", new0bjData);
  return newObjData
}

export function submitArrayData(pushData, viewShow = true) {
  let newData = []
  if (viewShow) {
    pushData.forEach((obj, i) => {
      newData[i] = {}
      Object.keys(obj).forEach((key) => {
        if (Array.isArray(pushData[i][key])) {
          newData[i][key] = pushData[i][key].join()
        } else {
          newData[i][key] = pushData[i][key]
        }
      })
    })
  }

  return newData
}

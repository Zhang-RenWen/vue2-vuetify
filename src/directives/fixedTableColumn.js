function setStickyLeft(el, { value }) {
  let leftTotal = 0
  for (let i = 0; i < value; i++) {
    const th = el.querySelectorAll(`th:nth-child(${i + 1})`)
    const td = el.querySelectorAll(`td:nth-child(${i + 1})`)
    th.forEach((item) => {
      item.style.position = 'sticky'
      item.style.zIndex = 3
      item.style.left = leftTotal + 'px'
    })
    td.forEach((item) => {
      item.style.position = 'sticky'
      item.style.zIndex = 1
      item.style.left = leftTotal + 'px'
      item.classList.add('fixed-table-col')
    })
    if (!th.length) return
    leftTotal += th[0].getBoundingClientRect().width
  }
}

export const FixedTableColumn = function () {
  setTimeout(() => {
    setStickyLeft(...arguments)
  }, 0)
}

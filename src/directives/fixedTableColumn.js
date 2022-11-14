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
      if (!item.parentNode.classList.value.includes('ignoreFixedCol')) {
        item.style.position = 'sticky'
        item.style.zIndex = 3
        item.style.left = leftTotal + 'px'
        item.classList.add('fixed-table-col')
      }
      leftTotal += th[0].getBoundingClientRect().width
    })
  }
}

export const FixedTableColumn = function () {
  setTimeout(() => {
    setStickyLeft(...arguments)
  }, 0)
}

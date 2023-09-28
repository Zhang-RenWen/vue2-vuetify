export default {
  install(Vue) {
    Vue.directive('columns-resizable', {
      inserted(el, binding) {
        const table = el.querySelector('table')
        if (!table) {
          return
        }
        function resizableGrid(table) {
          let row = table.getElementsByTagName('tr')[0],
            cols = row ? row.children : undefined
          if (!cols) return
          let tableHeight = table.offsetHeight
          for (let i = 0; i < cols.length; i++) {
            const element = cols[i]
            let div = createDiv(tableHeight)
            element.appendChild(div)
            setListeners(div)
          }

          function setListeners(div) {
            let pageX, curCol, curColWidth
            function mouseMove(e) {
              if (curCol) {
                let diffX = e.pageX - pageX

                curCol.style.width = curColWidth + diffX + 'px'
                curCol.style.minWidth = curColWidth + diffX + 'px'
              }
            }
            div.addEventListener('mousedown', function (e) {
              e.stopPropagation()
              e.preventDefault()
              curCol = e.target.parentElement

              pageX = e.pageX

              let padding = paddingDiff(curCol)

              curColWidth = curCol.offsetWidth - padding

              el.addEventListener('mousemove', mouseMove)
            })

            div.addEventListener('mouseover', function (e) {
              e.stopPropagation()
              e.preventDefault()
              e.target.style.borderRight = '3px solid rgba(0, 0, 255,0.1)'
            })

            div.addEventListener('mouseout', function (e) {
              e.stopPropagation()
              e.preventDefault()
              e.target.style.borderRight = ''
            })

            el.addEventListener('mouseup', function () {
              pageX = undefined
              curCol = undefined
              curColWidth = undefined

              el.removeEventListener('mousemove', mouseMove)
              if (binding.value) {
                binding.value.onEnd()
              }
            })
          }
          function createDiv(height) {
            let div = document.createElement('div')
            div.style.top = 0
            div.style.right = 0
            div.style.width = '10px'
            div.style.position = 'absolute'
            div.style.cursor = 'col-resize'
            div.style.userSelect = 'none'
            div.style.height = height + 'px'
            return div
          }

          function paddingDiff(col) {
            if (getStyleVal(col, 'box-sizing') === 'border-box') {
              return 0
            }
            let padLeft = getStyleVal(col, 'padding-left')
            let padRight = getStyleVal(col, 'padding-right')

            return parseInt(padLeft) + parseInt(padRight)
          }

          function getStyleVal(elm, css) {
            return window.getComputedStyle(elm, null).getPropertyValue(css)
          }
        }

        resizableGrid(table)
      }
    })
  }
}

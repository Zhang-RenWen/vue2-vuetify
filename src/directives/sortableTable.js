import { Sortable } from 'sortablejs'
const namespace = '@@vue-sortable-table'

export default {
  bind(el, binding) {
    if (el[namespace]) {
      el[namespace].destroy()
      el[namespace] = undefined
    }
    el[namespace] = Sortable.create(
      el.querySelector('tbody'),
      binding.value ? { ...binding.value } : {}
    )
  },
  unbind(el) {
    if (el[namespace]) {
      el[namespace].destroy()
      el[namespace] = undefined
    }
  }
}

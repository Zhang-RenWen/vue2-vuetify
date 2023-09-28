import Vue from 'vue'
import StickyDirective from './sticky'
import { FixedTableColumn } from './fixedTableColumn'
import vueResizableColumns from './vue-resizable-columns'
import sortableTable from './sortableTable'

Vue.use(vueResizableColumns)
Vue.directive('sortableTable', sortableTable)
Vue.directive('sticky', StickyDirective)
Vue.directive('fixed-table-column', FixedTableColumn)

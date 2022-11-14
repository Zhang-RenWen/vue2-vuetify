import Vue from 'vue'
import StickyDirective from './sticky'
import { FixedTableColumn } from './fixedTableColumn'

Vue.directive('sticky', StickyDirective)
Vue.directive('fixed-table-column', FixedTableColumn)

import Vue from 'vue'

import textInput from '@/components/inputs/TextInput.vue'
import textAreaInput from '@/components/inputs/TextAreaInput.vue'
import inputAutoComplete from '@/components/inputs/InputAutoComplete.vue'
import inputDate from '@/components/inputs/InputDate.vue'
import icon from '@/components/icon/SvgIcon.vue'
import goTop from '@/components/button/GoTop.vue'
import goTopByWindow from '@/components/button/GoTopByWindow.vue'
import anchorPointButton from '@/components/button/AnchorPointButton.vue'
// import vueResizable from 'vue-resizable'
// import Dialog from '@/components/vuetify/Dialog.vue'
import TablePagination from '@/components/pagination/TablePagination.vue'
import LinearLoading from '@/components/loading/LinearLoading'
import CircularLoading from '@/components/loading/CircularLoading'
import OverlayLoading from '@/components/loading/OverlayLoading'

Vue.component('TablePagination', TablePagination)
Vue.component('Icon', icon)
Vue.component('GoTopButton', goTop)
Vue.component('GoTopByWindow', goTopByWindow)
Vue.component('AnchorPointButton', anchorPointButton)
Vue.component('TextInput', textInput)
Vue.component('TextAreaInput', textAreaInput)
Vue.component('InputAutoComplete', inputAutoComplete)
Vue.component('InputDate', inputDate)
Vue.component('LinearLoading', LinearLoading)
Vue.component('CircularLoading', CircularLoading)
Vue.component('OverlayLoading', OverlayLoading)
// Vue.component('Dialog', Dialog)
// Vue.component('VueResizable', vueResizable)

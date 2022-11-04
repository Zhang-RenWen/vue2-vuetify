import Vue from 'vue'
// import input from '@/components/inputs/input.vue'
import icon from '@/components/icon/SvgIcon.vue'
import goTop from '@/components/button/GoTop.vue'
import goTopByWindow from '@/components/button/GoTopByWindow.vue'
import anchorPointButton from '@/components/button/AnchorPointButton.vue'
// import vueResizable from 'vue-resizable'
// import vueHotkey from 'v-hotkey'
// import DynamicForm from '@/components/vuetify/DynamicForm.vue'
// import Dialog from '@/components/vuetify/Dialog.vue'
// import FormGroup from '@/components/vuetify/FormGroup.vue'
// import VCustomPaginationCustom from '@/components/vuetify/Pagination.vue'

// Vue.use(vueHotkey)
Vue.component('Icon', icon)
Vue.component('GoTopButton', goTop)
Vue.component('GoTopByWindow', goTopByWindow)
Vue.component('AnchorPointButton', anchorPointButton)

// Vue.component('Input', input)
// Vue.component('Dialog', Dialog)
// Vue.component('DynamicForm', DynamicForm)
// Vue.component('FormGroup', FormGroup)
// Vue.component('VueResizable', vueResizable)
// Vue.component('VCustomPaginationCustom', VCustomPaginationCustom)

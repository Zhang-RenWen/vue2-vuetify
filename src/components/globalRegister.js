import Vue from 'vue'
import input from '@/components/inputs/input.vue'
import icon from '@/components/svg/svg.vue'
import vueResizable from 'vue-resizable'
import vueHotkey from 'v-hotkey'
import DynamicForm from '@/components/vuetify/DynamicForm.vue'
import Dialog from '@/components/vuetify/Dialog.vue'
import FormGroup from '@/components/vuetify/FormGroup.vue'
import VCustomPaginationCustom from '@/components/vuetify/Pagination.vue'

Vue.use(vueHotkey)
Vue.component('Icon', icon)
Vue.component('Input', input)
Vue.component('Dialog', Dialog)
Vue.component('DynamicForm', DynamicForm)
Vue.component('FormGroup', FormGroup)
Vue.component('VueResizable', vueResizable)
Vue.component('VCustomPaginationCustom', VCustomPaginationCustom)

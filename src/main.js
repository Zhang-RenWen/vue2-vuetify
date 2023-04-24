import Vue from 'vue'
import store from '@/store'
import { router } from '@/router'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import '@/components/globalRegister'
import '@/directives/index'
import VueHotKey from 'v-hotkey'

import '@/assets/scss/style.scss'

Vue.use(VueHotKey)
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')

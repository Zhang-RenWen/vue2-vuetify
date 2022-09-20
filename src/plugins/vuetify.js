import Vue from 'vue'
import Vuetify from 'vuetify'
// import { zhHant, en } from 'vuetify/es5/locale/zh-Hant'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
const opts = {
  icons: {
    icon: 'fa'
  },
  theme: {
    themes: {
      light: {
        primary: '#d9534f',
        accent: '#006064',
        secondary: '#1e94a0',
        third: '#ffad60',
        fourth: '#96ceb4',
        error: '#dc3548',
        submit: '#6ab660',
        cancel: '#ca5c53',
        danger: '#f06966',
        success: '#1e94a0',
        functional: '#006064',
        warning: '#ff8000',
        info: '#145488',
        input: '#0066ff'
      }
    }
  }
}

export default new Vuetify(opts)

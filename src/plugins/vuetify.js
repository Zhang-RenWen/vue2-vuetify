import Vue from 'vue'
import Vuetify from 'vuetify'
import { zhHant } from 'vuetify/es5/locale/zh-Hant'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(Vuetify)
const options = {
  icons: {
    icon: 'fa'
  },
  theme: {
    icons: {
      iconfont: 'fa'
    },
    themes: {
      light: {
        primary: '#79031d',
        secondary: '#aa201f',
        accent: '#006064',
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
    },
    lang: {
      locale: { zhHant },
      current: 'zhHant'
    }
  }
}

export default new Vuetify(options)

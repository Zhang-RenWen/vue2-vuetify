import Vue from "vue";

import { router } from "@/router";
import App from "@/App.vue";
import vuetify from "@/plugins/vuetify";
import "@/components/globalRegister";

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

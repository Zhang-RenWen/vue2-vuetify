import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import createRouterTree from '@/router/getRouterTree'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: createRouterTree()
  }
]
const router = new VueRouter({
  mode: 'history',
  base: '/ComponentWebVue2/',
  routes
})

router.beforeEach((to, from, next) => {
  // 設定每頁的 title (by meta title attribute)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// router for router ,routes for ui menu
export { router, routes }

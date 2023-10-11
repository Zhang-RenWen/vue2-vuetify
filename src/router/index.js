import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import createRouterTree from '@/router/getRouterTree'

Vue.use(VueRouter)
const rootName = 'Home'
const routes = [
  {
    path: '/',
    name: rootName,
    component: Home,
    children: createRouterTree()
  }
]
const router = new VueRouter({
  mode: 'history',
  base: '/vue2vuetify/',
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next({ name: rootName })
  }
  // 設定每頁的 title (by meta title attribute)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
// router for router ,routes for ui menu
export { router, routes }

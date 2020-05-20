import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/rank',
    component: () => import('@/views/rank/rank')
  },
  {
    path: '/recommend',
    component: () => import('@/views/recommend/recommend')
  },
  {
    path: '/search',
    component: () => import('@/views/search/search')
  },
  {
    path: '/singer',
    component: () => import('@/views/singer/singer')
  }
]

const router = new VueRouter({
  routes
})

export default router

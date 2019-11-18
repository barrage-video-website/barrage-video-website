import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 登录页
    path: '/',
    name: 'Home',
    component: () => import( '@/views/Home.vue'),
  },
  {
    // 登录页
    path: '/login',
    name: 'Login',
    component: () => import( '@/views/Login.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

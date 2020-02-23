import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
    // 主页
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
    // 主页
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
    // 登录页
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
    // 注册
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue')
    },
    {
        // 播放video
        path: '/video/:videoId',
        name: 'Video',
        component: () => import('@/views/Video.vue')
    },
    {
        // 个人中心
        path: '/center',
        name: 'Center',
        component: () => import('@/views/Center.vue'),
        children: [
            {
                // 投稿
                path: '/account/contribute',
                name: 'Contribute',
                component: () => import('@/views/Account/Contribute.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

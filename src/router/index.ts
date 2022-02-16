import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home/Index.vue'
import { App } from 'vue'
import { createRouterGuards } from '@/router/router-guards'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        meta: { title: '首页' },
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        meta: { title: '登录' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export function setupRouter (app: App): void {
    app.use(router)
    // 创建路由守卫
    createRouterGuards(router)
}

export default router

import { isNavigationFailure, Router, RouteRecordName } from 'vue-router'
import { store } from '@/store'
import { loadJWTFromLocalstorage } from '@/utils/jwt-at-localstorage'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const allowList = ['Login']

export const loginRoutePath = '/login'
export const defaultRoutePath = '/'

// 是否需要从后端获取菜单
// const isGetMenus = debounce(
//   ({ to, from, next, hasRoute }) => {
//     自行补充user/generateRoutes action
//     store
//       .dispatch('user/generateRoutes')
//       .then(() => {
//         // 根据roles权限生成可访问的路由表
//         // 动态添加可访问路由表
//         if (allowList.includes(to.name as string)) return
//
//         if (!hasRoute) {
//           // 请求带有 redirect 重定向时，登录自动重定向到该地址
//           const redirect = decodeURIComponent((from.query.redirect || '') as string)
//           if (to.path === redirect) {
//             next({ ...to, replace: true })
//           } else {
//             // 跳转到目的路由
//             next({ ...to, replace: true })
//           }
//         }
//       })
//       .catch(() => next({ path: defaultRoutePath }))
//   },
//   1800,
//   { leading: true }
// )

export function createRouterGuards (router: Router): void {
    router.beforeEach((to, from, next) => {
        NProgress.start()
        const { jwtToken } = loadJWTFromLocalstorage()
        if (jwtToken) {
            if (to.name === 'Login') {
                next({ path: defaultRoutePath })
                NProgress.done()
            } else {
                const hasRoute = router.hasRoute(to.name as RouteRecordName)
                if (store.getters['user/menus'].length === 0) {
                    // 如果需要每次切换路由获取最新的动态路由，可把下面注释放开
                    // 防抖获取菜单
                    // isGetMenus({ to, from, next, hasRoute })

                    if (allowList.includes(to.name as string) || hasRoute) {
                        // 在免登录名单，直接进入
                        next()
                    }
                } else {
                    next()
                }
            }
        } else {
            // not login
            if (allowList.includes(to.name as string)) {
                // 在免登录名单，直接进入
                next()
            } else {
                next({ path: loginRoutePath, query: { redirect: to.fullPath }, replace: true })
                NProgress.done()
            }
        }
    })

    router.afterEach((to, from, failure) => {
        document.title = (to?.meta?.title as string) || document.title
        if (isNavigationFailure(failure)) {
            console.log('failed navigation', failure)
        }
        NProgress.done()
    })

    router.onError((error) => {
        console.log(error, '路由错误')
    })
}

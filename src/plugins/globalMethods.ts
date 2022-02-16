import { App } from 'vue'

/**
 * 注册全局方法
 * @param app
 */
export function setupGlobalMethods (app: App) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((app) => {
        // 示例
        // app.config.globalProperties.$hasPermission = () => {}
    })
}

import { createStore, createLogger, useStore as baseUseStore, Store } from 'vuex'
import { App, InjectionKey } from 'vue'
import { modules } from './modules'
import { IUserState } from '@/store/modules/user/state'

export interface IStore {
    auth: IUserState
}

export const key: InjectionKey<Store<IStore>> = Symbol('lima')

// 在开发环境中开启logger
export const store: Store<IStore | unknown> = createStore({
    modules,
    plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [], // 在开发环境中开启logger,
    strict: process.env.NODE_ENV !== 'production' // 严格模式
})

export function useStore (): Store<IStore> {
    return baseUseStore(key)
}

export function setupStore (app: App): void {
    app.use(store, key)
}

export type RootState = Store<IStore | unknown>
export type AppDispatch = ReturnType<typeof store.dispatch>

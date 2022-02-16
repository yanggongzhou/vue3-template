import axios, { AxiosResponse, AxiosPromise, AxiosError } from 'axios'
import { RootState, store as storeCenter } from '@/store'
import { JWTDto } from '@/store/modules/user/actions'
import Dayjs from 'dayjs'
import decode from 'jwt-decode'
import { loginRoutePath } from '@/router/router-guards'

const service = axios.create({
    baseURL: '/api'
})

declare module 'axios' {
    export interface AxiosInstance {
        store: RootState
    }
}

export const initAxios: (store: RootState) => void = async (store: RootState) => {
    if (!service.store) {
        Object.defineProperty(service, 'store', {
            get () {
                return store
            }
        })
        window.addEventListener('pageshow', () => initAxios(store))

        const { jwtToken, refreshToken, tokenType } = store.getters['user/auth']
        if (jwtToken) {
            const jwtInfo = decode<JWTDto>(jwtToken)
            // 如果还有10分钟过期，就刷新token
            if (
                Dayjs()
                    .add(10, 'm')
                    .isAfter(jwtInfo.exp * 1000) &&
        refreshToken
            ) {
                await store.dispatch('user/refreshToken')
            }
            if (Dayjs().isBefore(jwtInfo.exp * 1000)) {
                setAuthorization(jwtToken, tokenType)
            } else {
                setAuthorization()
            }
        }
    }
    // 5分钟检查一次jwt状态
    setTimeout(() => initAxios(storeCenter), 5 * 60 * 1000)
}

export const setAuthorization = (jwtToken?: string, tokenType: string | null = 'bearer') => {
    service.defaults.headers.options = {
        ...(service.defaults.headers.options || {}),
        Authorization: `${tokenType || 'bearer'} ${jwtToken}`
    }
    if (!jwtToken) {
        delete service.defaults.headers.options.Authorization
    }
}

service.interceptors.request.use(
    (config) => {
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

service.interceptors.response.use(
    (response: AxiosResponse): AxiosPromise => {
        try {
            const { data } = response
            if (data?.code === 0) {
                alert(data?.message || 'something error')
                return Promise.reject(data)
            }
            return Promise.resolve(data?.data)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    (err: AxiosError) => {
        const navigator = window.navigator
        if (!navigator.onLine) {
            alert('offline')
        } else if (err.response?.status === 401) {
            alert('登录失效')
            setAuthorization()
            location.href = loginRoutePath
        } else if (err.response) {
            const { data } = err.response
            alert(data?.message)
        } else {
            alert('network error')
        }
        return Promise.reject(err)
    }
)

export default service

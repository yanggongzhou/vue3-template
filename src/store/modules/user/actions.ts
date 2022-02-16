import { ActionContext as BaseActionContext, ActionTree } from 'vuex'
import { setAuthorization } from '@/utils/request'
import { clearJWTLocalstorage, defaultEmptyJwt, setJWTToLocalstorage } from '@/utils/jwt-at-localstorage'
import { IAuthState, IUserState } from '@/store/modules/user/state'
import { IStore } from '@/store'
import { SET_JWT } from '@/store/mutation-types'
import _ from 'lodash'

export interface JWTDto {
    exp: number;
}

type ActionContext = BaseActionContext<IUserState, IStore>;
export const actions: ActionTree<IUserState, IStore> = {
    async setJwt ({ state, commit }: ActionContext, { jwtToken, tokenType, refreshToken }: IAuthState) {
        if (!jwtToken) {
            setAuthorization()
        }
        console.log(_)
        const authInfo = {
            jwtToken,
            tokenType,
            refreshToken
        }
        setJWTToLocalstorage(authInfo)
        commit(SET_JWT, authInfo)
        return {
            ...state
        }
    },
    async refreshToken ({ state, commit }: ActionContext) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokenInfo: any = await new Promise((resolve) => setTimeout(() => {
            resolve({ access_token: null, token_type: null, refresh_token: null, expires_in: null })
        }, 1000))

        commit(SET_JWT, {
            jwtToken: tokenInfo.access_token,
            tokenType: tokenInfo.token_type,
            refreshToken: tokenInfo.refresh_token,
            expiresIn: tokenInfo.expires_in,
            nowTime: Date.parse(new Date() as unknown as string) / 1000
        })
        return {
            ...state
        }
    },

    async logout ({ commit }: ActionContext) {
    // 退出登录
        await new Promise((resolve) => setTimeout(resolve, 1000))
        commit(SET_JWT, defaultEmptyJwt)
        clearJWTLocalstorage()
    }
}

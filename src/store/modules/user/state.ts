import { defaultEmptyJwt, loadJWTFromLocalstorage } from '@/utils/jwt-at-localstorage'

export const defaultEmptyUserState = {
    auth: defaultEmptyJwt,
    userInfo: {
        name: 'lima'
    },
    menus: []
}

export type IAuthState = {
    jwtToken: string | null;
    tokenType: string | null;
    refreshToken: string | null;
}

export type IUserInfoState = {
    name: string |null;
}

export type IUserMenuItem = {
    [key: string]: unknown
}

export type IUserState = {
    auth: IAuthState,
    userInfo: IUserInfoState,
    menus: IUserMenuItem[],
}

export const state: IUserState = Object.assign({}, defaultEmptyUserState, {
    auth: loadJWTFromLocalstorage()
})

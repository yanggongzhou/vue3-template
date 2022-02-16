import { GetterTree } from 'vuex'
import { IStore } from '@/store'
import { IUserState } from './state'

export const getters: GetterTree<IUserState, IStore> = {
    auth: (state: IUserState) => state.auth,
    jwtToken: (state: IUserState) => state.auth.jwtToken,
    tokenType: (state: IUserState) => state.auth.tokenType,
    refreshToken: (state: IUserState) => state.auth.refreshToken,
    userInfo: (state: IUserState) => state.userInfo,
    menus: (state: IUserState) => state.menus
}

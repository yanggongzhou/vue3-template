import { MutationTree } from 'vuex'
import { IAuthState, IUserState } from '@/store/modules/user/state'

export const mutations: MutationTree<IUserState> = {
    SET_JWT (state: IUserState, payload: IAuthState) {
        state.auth = {
            jwtToken: payload.jwtToken,
            tokenType: payload.tokenType,
            refreshToken: payload.refreshToken
        }
    }
}

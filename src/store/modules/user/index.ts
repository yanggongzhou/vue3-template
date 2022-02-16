/**
 * 鉴权模块
 */
import { IUserState, state } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'
import { Module } from 'vuex'
import { IStore } from '@/store'

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
} as Module<IUserState, IStore>

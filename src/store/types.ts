import { Store } from 'vuex'
import { IUserState } from '@/store/modules/user/state'
import { store } from '@/store'

export interface IStore {
    auth: IUserState
}
export type RootState = Store<IStore>;
export type AppDispatch = ReturnType<typeof store.dispatch>

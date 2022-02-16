import { IAuthState } from '@/store/modules/user/state'

const jwtPosition = '@@LIMA/jwt-token'

export const defaultEmptyJwt = {
    jwtToken: null,
    tokenType: null,
    refreshToken: null
}

export const clearJWTLocalstorage: ()=> void = () => {
    localStorage.removeItem(jwtPosition)
}

export function setJWTToLocalstorage (jwt: IAuthState): void {
    localStorage.setItem(jwtPosition, JSON.stringify(jwt))
}

export function loadJWTFromLocalstorage (): IAuthState {
    return loadJWTFrom(jwtPosition)
}

export function loadJWTFrom (place: string): IAuthState {
    try {
        return localStorage.getItem(place) ? JSON.parse(<string>localStorage.getItem(place)) : defaultEmptyJwt
    } catch {
        localStorage.removeItem(place)
        return defaultEmptyJwt
    }
}

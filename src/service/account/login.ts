import request from '@/utils/request'

export const login = async () => {
    return await request.post('/account/auth/login')
}

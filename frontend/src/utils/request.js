import axios from 'axios'
import store from '@/store'
import {setToken, removeToken, getToken} from '@/utils/authentication';
import { refresh } from '@/api/user';

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        'Content-Type' : 'application/json',
    },
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Authorization'] = `Bearer ${getToken()}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => response,
    async (error) => {
        if (error.response.data.code === 'token-expired') {
            // try to get new token with refresh token
            try {
                await store.dispatch('user/refresh')
                service.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`

                return service(error.config)
            } catch (err) {
                if (err.response && err.response.data) {
                    return Promise.reject(err.response.data)
                }

                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)

export default service
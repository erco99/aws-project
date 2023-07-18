import axios from 'axios'
import store from '@/store'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Accept: "application/json",
    },
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['Authorization'] = store.getters.token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default service
import axios from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Accept: "application/json",
    },
    timeout: 5000
})

export default service
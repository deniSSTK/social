import axios from 'axios'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

export const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
    validateStatus: () => true
})

api.interceptors.response.use(
    response => {
        if (response.status < 200 || response.status >= 300) {
            console.error("[API] Error: ", response.data)
        }
        return response
    }
)

export const ok = (status: number) => {
    return status >= 200 && status < 300
}

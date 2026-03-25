import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const dispatchBackendState = (isOnline) => {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new Event(isOnline ? 'careerx:backend-online' : 'careerx:backend-offline'))
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('careerx_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    dispatchBackendState(true)
    return response
  },
  (error) => {
    if (!error.response) {
      dispatchBackendState(false)
    }

    return Promise.reject(error)
  }
)

export default api

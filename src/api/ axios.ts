import axios from 'axios'
import { getCookieValue } from '@/utils/storage'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const locale = getCookieValue('NEXT_LOCALE') || 'uz'
  config.headers['Accept-Language'] = locale
  return config
})

export default api
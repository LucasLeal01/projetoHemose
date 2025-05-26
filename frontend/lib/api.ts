import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ✅ Substituir fetch por axios.get, usando baseURL e interceptors

export async function getPacientes() {
  const res = await api.get('/pacientes')
  return res.data
}

export async function getTriagem() {
  const res = await api.get('/triagem')
  return res.data
}

export async function getMedicamentos() {
  const res = await api.get('/medicamentos')
  return res.data
}

export async function getLeitos() {
  const res = await api.get('/leitos')
  return res.data
}

export async function getSinaisVitais() {
  const res = await api.get('/sinais-vitais')
  return res.data
}

export default api

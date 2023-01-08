import axios from 'axios'
import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const getUser = (userId) => API.get(`/user/${userId}`)

export const uploadUserImage = (data) => API.post(`/user/upload`, data)

export const updateUser = (id, formData) => API.put(`/user/${id}`, formData)

export const deleteUser = (id, status) =>
  API.delete(`/user/${id}`, { data: { AdminStatus: status } })

export const getAllUsers = () => API.get('/user')

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data)

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data)

export const getNotify = (id) => API.get(`/user/${id}/notify`)

export const removeNotify = (id, userId) =>
  API.put(`/user/notify`, { userId: userId, notifyId: id })

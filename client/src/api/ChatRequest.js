import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const userChats = (id) => API.get(`/chat/${id}`)
export const findChat = (userId, profileUserId) =>
  API.get(`/chat/find/${userId}/${profileUserId}`)

export const createChat = (data) => API.post('/chat', data)

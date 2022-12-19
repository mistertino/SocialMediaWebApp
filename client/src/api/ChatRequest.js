import axios from 'axios'

import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

export const userChats = (id) => API.get(`/chat/${id}`)
export const findChat = (userId, profileUserId) =>
  API.get(`/chat/find/${userId}/${profileUserId}`)

export const createChat = (data) => API.post('/chat', data)

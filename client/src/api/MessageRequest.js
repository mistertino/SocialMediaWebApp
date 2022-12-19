import axios from 'axios'

import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

export const getMesssages = (id) => API.get(`/messages/${id}`)
export const addMessage = (data) => API.post('/messages/', data)

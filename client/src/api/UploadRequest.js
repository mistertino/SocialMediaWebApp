import axios from 'axios'

import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

export const uploadImage = (data) => API.post('/upload/', data)
export const uploadPost = (data) => API.post('/post', data)

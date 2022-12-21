import axios from 'axios'
import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

export const getPost = (id) => API.get(`/post/${id}`)
export const getTimlinePosts = (id, page) =>
  API.get(`/post/${id}/${page}/timeline`)
export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { currentUserId: userId })
export const getAllPosts = () => API.get('/post')
export const getPostLastWeek = () => API.get('/post/lastweek')
export const getComments = (id) => API.get(`/post/${id}/comment`)
export const addComment = (id, userId, text) =>
  API.put(`/post/${id}/comment`, { currentUserId: userId, text: text })
export const deletePost = (postId, userId) => {
  API.delete(`/post/${postId}`, { data: { currentUserId: userId } })
}

export const updatePost = (id, userId, desc) =>
  API.put(`/post/${id}`, { currentUserId: userId, desc: desc })

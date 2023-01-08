import axios from 'axios'
import { URL_SERVER } from '../constants/constants'

const API = axios.create({ baseURL: URL_SERVER })

export const getPost = (id) => API.get(`/post/${id}`)
export const getTimlinePosts = (id) => API.get(`/post/${id}/timeline`)
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

export const updatePost = (id, newPost) => API.put(`/post/${id}`, newPost)
export const reportPost = (id, userId) =>
  API.put(`post/${id}/report`, { userId: userId })
export const getPostsReport = () => API.get('/post/report')
export const getPostForHastag = (hastag) => API.get(`/post/${hastag}/hastag`)

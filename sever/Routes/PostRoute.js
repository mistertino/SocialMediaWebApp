import express from 'express'
import {
  createPost,
  deletePost,
  getPost,
  likePost,
  updatePost,
  getTimelinePosts,
  getAllPosts,
} from '../Controller/PostController.js'

const router = express.Router()

router.post('/', createPost)
router.get('/', getAllPosts)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost)
router.get('/:id/timeline', getTimelinePosts)

export default router

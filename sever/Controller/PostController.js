import postModel from '../Models/postModel.js'
import userModel from '../Models/userModel.js'
import mongoose from 'mongoose'

// Create Post
export const createPost = async (req, res) => {
  const newPost = new postModel(req.body)
  try {
    await newPost.save()
    res.status(200).json(newPost)
  } catch (error) {
    res.status(500).json(error)
  }
}

// Get Post
export const getPost = async (req, res) => {
  const postId = req.params.id
  try {
    const post = await postModel.findById(postId)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
}

// Update Post
export const updatePost = async (req, res) => {
  const postId = req.params.id
  const { currentUserId } = req.body
  try {
    const post = await postModel.findById(postId)
    if (post.userId === currentUserId) {
      await post.updateOne({ $set: req.body })
      res.status(200).json('Post Updated')
    } else res.status(403).json('This is not your post')
  } catch (error) {
    res.status(500).json(error)
  }
}

// Delete Post
export const deletePost = async (req, res) => {
  const postId = req.params.id
  const { currentUserId } = req.body
  try {
    const post = await postModel.findById(postId)
    if (post.userId === currentUserId) {
      await post.deleteOne()
      res.status(200).json('Deleted Post')
    } else res.status(403).json('This is not your post')
  } catch (error) {
    res.status(500).json(error)
  }
}

// Like/Unlike Post
export const likePost = async (req, res) => {
  const postId = req.params.id
  const { currentUserId } = req.body
  try {
    const post = await postModel.findById(postId)
    if (!post.likes.includes(currentUserId)) {
      await post.updateOne({ $push: { likes: currentUserId } })
      res.status(200).json('Post liked')
    } else {
      await post.updateOne({ $pull: { likes: currentUserId } })
      res.status(200).json('Post Unliked')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

// Get Post of user following
export const getTimelinePosts = async (req, res) => {
  const currentUserId = req.params.id
  try {
    const currentUserPosts = await postModel.find({ userId: currentUserId })
    const postUserFollowing = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(currentUserId),
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'following',
          foreignField: 'userId',
          as: 'postUserFollowing',
        },
      },
      {
        $project: {
          postUserFollowing: 1,
          _id: 0,
        },
      },
    ])
    res.status(200).json(
      currentUserPosts
        .concat(...postUserFollowing[0].postUserFollowing)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }),
    )
  } catch (error) {
    res.status(500).json(error)
  }
}

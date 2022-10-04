import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../action/PostAction'
import { useParams } from 'react-router-dom'

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [])
  if (!posts) return 'Không có bài viết nào hiện tại!'
  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id)
  }
  return (
    <div className="Posts">
      {loading
        ? 'Đang tải bài viết......'
        : posts.map((post, id) => {
            return <Post post={post} key={id} />
          })}
    </div>
  )
}

export default Posts

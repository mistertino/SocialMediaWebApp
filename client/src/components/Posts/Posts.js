import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../action/PostAction'
import { useParams } from 'react-router-dom'
import LazyLoad from 'react-lazyload'
import Spinner from 'react-bootstrap/Spinner'

const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)

  useEffect(() => {
    if (params.id) {
    }
    dispatch(getTimelinePosts(user._id))
  }, [posts.length, params.id])

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id)
  }

  if (posts.length === 0)
    return (
      <span style={{ textAlign: 'center' }}>
        Không có bài viết nào hiện tại! Hãy Theo dõi hoặc Đăng bài!
      </span>
    )
  else
    return (
      <div className="Posts">
        {loading ? (
          <div className="loading">
            <Spinner animation="border" />
            <span style={{ color: 'purple' }}>Đang tải bài viết....</span>
          </div>
        ) : (
          posts.map((post, id) => (
            <LazyLoad
              key={post._id}
              height={50}
              offset={[-50, 50]}
              placeholder={
                <div className="loading">
                  <Spinner animation="border" />
                  <span style={{ color: 'purple' }}>Đang tải bài viết....</span>
                </div>
              }
            >
              <Post post={post} posts={posts} key={id} />
            </LazyLoad>
          ))
        )}
      </div>
    )
}

export default Posts

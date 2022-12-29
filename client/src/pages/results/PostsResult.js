import React from 'react'
import { useLocation } from 'react-router-dom'
import Post from '../../components/Post/Post'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'

const PostsResult = () => {
  const location = useLocation()
  const posts = location.state.posts
  return (
    <div className="Home">
      <ProfileSide location="viewPost" />
      <div className="PostSide">
        {posts.map((post) => (
          <Post post={post} location="viewPost" />
        ))}
      </div>
      <RightSide />
    </div>
  )
}

export default PostsResult

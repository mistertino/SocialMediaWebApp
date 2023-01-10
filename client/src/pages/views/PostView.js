import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getPost } from '../../api/PostRequest'
import Post from '../../components/Post/Post'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'

const PostView = () => {
  const location = useLocation()
  console.log(location)
  const postNotify = location.state.post
  const params = useParams()
  const [post, setPost] = useState()
  // Set title
  useEffect(() => {
    document.title = 'TC Connect - Post'
    const fetchPost = async () => {
      if (!postNotify) {
        const post = await getPost(params.id)
        setPost(post.data)
      }
    }
    fetchPost()
  }, [params.id])
  console.log(post)
  return (
    <div className="Home">
      <ProfileSide location="viewPost" />
      <div className="post">
        <Post post={postNotify} location="viewPost" />
      </div>
      <RightSide />
    </div>
  )
}

export default PostView

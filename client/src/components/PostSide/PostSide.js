import React from 'react'
import './PostSide.css'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostSide = ({location}) => {
  const params = useParams()
  const {user} = useSelector((state)=>state.authReducer.authData)
  if (location === 'profilePage' && params.id !== user._id ) return (
    <div className="PostSide">
      <Posts />
    </div>
  )
  return (
    <div className="PostSide">
      <PostShare />
      <Posts />
    </div>
  )
}

export default PostSide

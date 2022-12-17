import React from 'react'
import './PostSide.css'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileCard from '../ProfileCard/ProfileCard'

const PostSide = ({ location }) => {
  const params = useParams()
  const { user } = useSelector((state) => state.authReducer.authData)
  if (location === 'profilePage' && params.id !== user._id)
    return (
      <div className="PostSide">
        <ProfileCard location="profilePage" />
        <Posts />
      </div>
    )
  if (location === 'profilePage')
    return (
      <div className="PostSide">
        <ProfileCard location="profilePage" />
        <PostShare />
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

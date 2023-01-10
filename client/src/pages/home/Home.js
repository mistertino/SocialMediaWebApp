import React, { useEffect } from 'react'
import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/PostSide/PostSide'
import './Home.css'
import RightSide from '../../components/RightSide/RightSide'
import { useSelector } from 'react-redux'
import AdminSide from '../../components/AdminSide/AdminSide'

const Home = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  // Set title
  useEffect(() => {
    document.title = 'TC Connect - Home'
  })
  return (
    <div className="Home">
      <ProfileSide location="homePage" />
      {user.isAdmin ? <AdminSide /> : <PostSide location="homePage" />}

      <RightSide location="homePage" />
    </div>
  )
}

export default Home

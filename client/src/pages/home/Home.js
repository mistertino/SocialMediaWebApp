import React, { useEffect } from 'react'
import ProfileSide from '../../components/profileSide/ProfileSide'
import PostSide from '../../components/PostSide/PostSide'
import './Home.css'
import RightSide from '../../components/RightSide/RightSide'

const Home = () => {
  // Set title
  useEffect(()=>{
    document.title = 'TC - Home'
  })
  return (
    <div className="Home">
      <ProfileSide />
      <PostSide  location = 'homePage'/>
      <RightSide />
    </div>
  )
}

export default Home

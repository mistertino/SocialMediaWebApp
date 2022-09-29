import React from 'react'
import './ProfileSide.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import FollowerCard from '../FollowerCard/FollowerCard'

const ProfileSide = () => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <ProfileCard location = 'homePage'/>
      <FollowerCard />
    </div>
  )
}

export default ProfileSide

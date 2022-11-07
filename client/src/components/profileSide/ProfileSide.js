import React from 'react'
import './ProfileSide.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'
import FollowerCard from '../FollowerCard/FollowerCard'

const ProfileSide = ({ location }) => {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      {location !== 'viewPost' ? <ProfileCard location="homePage" /> : ''}
      {location === 'homePage' ? <FollowerCard /> : ''}
    </div>
  )
}

export default ProfileSide

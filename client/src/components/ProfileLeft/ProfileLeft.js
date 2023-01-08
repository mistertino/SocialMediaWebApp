import React from 'react'
import FollowerCard from '../FollowerCard/FollowerCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import './ProfileLeft.css'

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
      <div className="ProfileLeft-box">
        <LogoSearch />
        <InfoCard />
        <FollowerCard location="profilePage" />
      </div>
    </div>
  )
}

export default ProfileLeft

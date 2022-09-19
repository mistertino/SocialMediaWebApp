import React from 'react'
import FollowerCard from '../FollowerCard/FollowerCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import './ProfileLeft.css'

const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
      <LogoSearch />
      <InfoCard />
      <FollowerCard />
    </div>
  )
}

export default ProfileLeft

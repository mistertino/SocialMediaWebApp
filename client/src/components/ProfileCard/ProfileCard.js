import React from 'react'
import './ProfileCard.css'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileimage.jpg'

const ProfileCard = () => {
  const ProfilePage = true

  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img src={Cover} alt="" />
        <img src={Profile} alt="" />
      </div>

      <div className="profileName">
        <span>Mister Tino</span>
        <span>Yêu bé Chung</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>10.000</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>1</span>
            <span>Followings</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div>
                <div className="follow">
                  <span>3</span>
                  <span>Posts</span>
                </div>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {ProfilePage ? '' : <span>My profile</span>}
    </div>
  )
}

export default ProfileCard

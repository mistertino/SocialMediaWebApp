import React from 'react'
import './FollowerCard.css'
import { Followers } from '../../Data/FollowersData'

const FollowerCard = () => {
  return (
    <div className="FollowerCard">
      <h3>Who is following you</h3>
      {Followers.map((follower, id) => {
        return (
          <div className="follower">
            <div>
              <img src={follower.img} alt="" className="followerImg" />
              <div className="name">
                <span>{follower.name}</span>
                <span>@{follower.usename}</span>
              </div>
            </div>
            <button className="button fc-button">Follow</button>
          </div>
        )
      })}
    </div>
  )
}

export default FollowerCard

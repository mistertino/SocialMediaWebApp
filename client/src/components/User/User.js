import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../action/UserAction'
import { Link } from 'react-router-dom'
import profilePicture from '../../img/user.png'

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch()
  // State
  const [following, setFollowing] = useState(
    person.followers.includes(user._id),
  )

  //Func
  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(person._id, user))
      : dispatch(followUser(person._id, user))
    setFollowing((prev) => !prev)
  }
  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture?.url
              ? person.profilePicture?.url
              : profilePicture
          }
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>
            <Link
              to={`/profile/${person._id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              {person.firstname} {person.lastname}
            </Link>
          </span>
          <span>{person.username}</span>
        </div>
      </div>
      <button
        className={
          following ? 'button fc-button unfollowbtn' : 'button fc-button'
        }
        onClick={handleFollow}
      >
        {following ? 'Bỏ Theo Dõi' : 'Theo Dõi'}
      </button>
    </div>
  )
}

export default User

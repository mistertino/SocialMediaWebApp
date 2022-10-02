import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { followUser, unFollowUser } from '../../action/UserAction'

const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch()
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
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
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + 'user.png'
          }
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>
            {person.firstname} {person.lastname}
          </span>
          <span>@{person.username}</span>
        </div>
      </div>
      <button className="button fc-button" onClick={handleFollow}>
        {following ? 'Huỷ Theo Dõi' : 'Theo Dõi'}
      </button>
    </div>
  )
}

export default User

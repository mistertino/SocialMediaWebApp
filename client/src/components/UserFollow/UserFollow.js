import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import { Link, useNavigate } from 'react-router-dom'
import './UserFollow.css'
import profilePicture from '../../img/user.png'
import LoadingUser from '../LoadingUser/LoadingUser'

const UserFollow = ({ userId, setOpenModalFollow, lengthItems, setCount }) => {
  const [user, setUser] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userId)
      setUser(user.data)
    }
    fetchUser()
  }, [])
  return user ? (
    <div className="user-item">
      <img
        src={
          user?.profilePicture?.url ? user?.profilePicture?.url : profilePicture
        }
        alt=""
        className="followerImg"
      />
      <div className="name">
        <span
          onClick={() => {
            navigate(`/profile/${user?._id}`)
            setOpenModalFollow(false)
          }}
        >
          {/* to={`/profile/${user?._id}`}
        style={{ textDecoration: 'none', color: 'black' }}
      > */}
          {user?.firstname} {user?.lastname}
        </span>
        <span>{user?.username}</span>
      </div>
    </div>
  ) : (
    <LoadingUser />
  )
}

export default UserFollow

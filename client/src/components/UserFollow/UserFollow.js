import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import { Link, useNavigate } from 'react-router-dom'
import './UserFollow.css'

const UserFollow = ({ userId, setOpenModalFollow }) => {
  const [user, setUser] = useState()
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userId)
      setUser(user.data)
    }
    fetchUser()
  }, [])
  return (
    <div className="user-item">
      <img
        src={
          user?.profilePicture
            ? serverPublic + user?.profilePicture
            : serverPublic + 'user.png'
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
        <span>@{user?.username}</span>
      </div>
    </div>
  )
}

export default UserFollow

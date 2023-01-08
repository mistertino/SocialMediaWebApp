import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { followUser, unFollowUser } from '../../action/UserAction'
import { createChat, findChat } from '../../api/ChatRequest'
import './ResultItem.css'
import profilePicture from '../../img/user.png'

const ResultItem = ({ result }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //State
  const [following, setFollowing] = useState(
    result.followers.includes(user._id),
  )

  //Func
  const handleFollow = () => {
    following
      ? dispatch(unFollowUser(result._id, user))
      : dispatch(followUser(result._id, user))
    setFollowing((prev) => !prev)
  }

  const handleSendMessage = async () => {
    const userId = user._id
    const { data } = await findChat(userId, result._id)
    if (data === null) {
      const newChat = {
        senderId: userId,
        receiverId: result._id,
      }
      await createChat(newChat)
      navigate('../chat', { state: { chat: data } })
    } else navigate('../chat', { state: { chat: data } })
  }

  return (
    <div className="container">
      <div className="user">
        <img
          src={
            result.profilePicture?.url
              ? result.profilePicture?.url
              : profilePicture
          }
          alt=""
        />
        <span>
          <Link
            to={`/profile/${result._id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <b>
              {result.firstname} {result.lastname}
            </b>
            <p>{result.username}</p>
          </Link>
        </span>
      </div>
      <div className="action">
        <button
          style={
            user._id === result._id ? { display: 'none' } : { display: 'block' }
          }
          className={
            following ? 'button fc-button unfollowbtn' : 'button fc-button'
          }
          onClick={handleFollow}
        >
          {following ? 'Bỏ Theo Dõi' : 'Theo Dõi'}
        </button>
        <button
          className="button "
          style={
            user._id === result._id ? { display: 'none' } : { display: 'block' }
          }
          onClick={handleSendMessage}
        >
          Gửi tin nhắn
        </button>
      </div>
    </div>
  )
}

export default ResultItem

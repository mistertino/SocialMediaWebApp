import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../api/UserRequest'
import profilePicture from '../../img/user.png'

const Comment = ({ comment, comments }) => {
  // State
  const [userComment, setUserComment] = useState({})
  // Get user
  useEffect(() => {
    const getUserComment = async () => {
      const userComment = await getUser(comment.userId)
      setUserComment(userComment.data)
    }
    getUserComment()
  }, [comments])
  return (
    <div>
      <span style={{ color: 'black', margin: '10px' }}>
        <Link
          to={`/profile/${userComment._id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <img
            src={
              userComment.profilePicture?.url
                ? userComment.profilePicture?.url
                : profilePicture
            }
            alt=""
            style={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              marginRight: '5px',
              objectFit: 'cover',
            }}
          />
          <b>
            {userComment.firstname} {userComment.lastname}
          </b>
        </Link>
      </span>
      <span style={{ margin: '0 10px 10px 20px' }}>{comment.text}</span>
    </div>
  )
}

export default Comment

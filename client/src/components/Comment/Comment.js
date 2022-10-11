import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../api/UserRequest'
const Comment = ({ comment, comments }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  // State
  const [userComment, setUserComment] = useState({})
  // Get user
  useEffect(() => {
    const getUserComment = async () => {
      const userComment = await getUser(comment.userId)
      setUserComment(userComment.data)
    }
    getUserComment()
  }, [])
  return (
    <div>
      <span style={{ color: 'black', margin: '10px' }}>
        <Link
          to={`/profile/${userComment._id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <img
            src={
              userComment.profilePicture
                ? serverPublic + userComment.profilePicture
                : serverPublic + 'user.png'
            }
            alt=""
            style={{
              width: '1.5rem',
              height: '1.5rem',
              borderRadius: '50%',
              marginRight: '5px',
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

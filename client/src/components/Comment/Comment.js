import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../api/UserRequest'
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
  }, [])
  return (
    <>
      <span style={{ color: 'black', margin: '10px' }}>
        <Link
          to={`/profile/${userComment._id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <b>
            {userComment.firstname} {userComment.lastname}
          </b>
        </Link>
      </span>
      <span style={{ margin: '0 15px 10px 15px' }}>{comment.text}</span>
    </>
  )
}

export default Comment

import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeNotify } from '../../action/UserAction'
import { getPost } from '../../api/PostRequest'
import { getUser } from '../../api/UserRequest'
import './NotifyItem.css'

const NotifyItem = ({ notify, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //State
  const [userMade, setUserMade] = useState()
  const [post, setPost] = useState()

  //Func
  const handleViewNotify = () => {
    dispatch(removeNotify(notify.notifyId, user._id))
    navigate(`/view/post/${notify.postId}`, { state: { post: post } })
  }

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(notify.userId)
      setUserMade(user.data)
    }
    const fetchPost = async () => {
      const post = await getPost(notify.postId)
      setPost(post.data)
    }
    fetchUser()
    fetchPost()
  }, [notify])
  if (notify?.type === 'like') {
    return (
      <div className="notify-item" onClick={handleViewNotify}>
        <span>
          <b>
            {userMade?.firstname} {userMade?.lastname}
          </b>{' '}
          đã thích bài viết: "{post?.desc}" của bạn
        </span>
      </div>
    )
  } else
    return (
      <div className="notify-item" onClick={handleViewNotify}>
        <span>
          <b>
            {userMade?.firstname} {userMade?.lastname}
          </b>{' '}
          đã bình luận bài viết: "{post?.desc}" của bạn
        </span>
      </div>
    )
}

export default NotifyItem

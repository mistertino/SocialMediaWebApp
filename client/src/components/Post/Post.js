import React, { useEffect, useState } from 'react'
import './Post.css'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import Option from '../../img/option.png'
import Comment from '../../img/comment.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'
import { Link } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest'

const Post = ({ post , posts}) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const severPublic = process.env.REACT_APP_PUBLIC_FOLDER

  // State
  const [liked, setLiked] = useState(post.likes.includes(user._id))
  const [likes, setLikes] = useState(post.likes.length)
  const [userPost, setUserPost] = useState({})
  //Func
  const handleLike = () => {
    likePost(post._id, user._id)
    setLiked((prev) => !prev)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  useEffect(() => {
    const getUserPost = async () => {
      const userPost = await UserApi.getUser(post.userId)
      setUserPost(userPost.data)
    }
    getUserPost()
  }, [posts])
  return (
    <div className="Post">
      <div className="detail">
        <div className="user_post">
          <img
            src={
              userPost.profilePicture
                ? severPublic + userPost.profilePicture
                : severPublic + 'user.png'
            }
            alt=""
          />
          <span>
            <Link
              to={`/profile/${userPost._id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <b>
                {userPost.firstname} {userPost.lastname}
              </b>
            </Link>
          </span>
        </div>
        <span>{post.desc}</span>
      </div>
      <img
        src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ''}
        alt=""
      />
      <span>{likes} Lượt thích</span>

      <div className="postReact">
        <img src={liked ? Like : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Option} alt="" />
      </div>
    </div>
  )
}

export default Post

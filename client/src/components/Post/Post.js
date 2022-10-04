import React, { useState } from 'react'
import './Post.css'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import Share from '../../img/share.png'
import Comment from '../../img/comment.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  // State
  const [liked, setLiked] = useState(post.likes.includes(user._id))
  const [likes, setLikes] = useState(post.likes.length)
  //Func
  const handleLike = () => {
    likePost(post._id, user._id)
    setLiked((prev) => !prev)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  return (
    <div className="Post">
      <div className="detail">
        <span>
          <b>{post.name}</b>
        </span>
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
        <img src={Share} alt="" />
      </div>
    </div>
  )
}

export default Post

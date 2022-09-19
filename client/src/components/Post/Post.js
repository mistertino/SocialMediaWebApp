import React from 'react'
import './Post.css'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import Share from '../../img/share.png'
import Comment from '../../img/comment.png'

const Post = ({ post }) => {
  return (
    <div className="Post">
      <div className="detail">
        <span>
          <b>{post.name}</b>
        </span>
        <span>{post.desc}</span>
      </div>
      <img src={post.img} alt="" />
      <div className="postReact">
        <img src={post.liked ? Like : NotLike} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span>{post.likes} likes</span>
    </div>
  )
}

export default Post

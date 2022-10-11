import React, { useEffect, useRef, useState } from 'react'
import './Post.css'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import Option from '../../img/option.png'
import CommentIcon from '../../img/comment.png'
import Comment from '../Comment/Comment'
import { useSelector } from 'react-redux'
import { addComment, getComments, likePost } from '../../api/PostRequest'
import { Link } from 'react-router-dom'
import { getUser } from '../../api/UserRequest'

const Post = ({ post, posts }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const comment = useRef()

  // State
  const [liked, setLiked] = useState(post.likes.includes(user._id))
  const [likes, setLikes] = useState(post.likes.length)
  const [userPost, setUserPost] = useState({})
  const [openComments, setOpenComments] = useState(false)
  const [comments, setComments] = useState([])
  //Func
  const handleOpenComment = () => {
    setOpenComments((prev) => !prev)
  }
  const handleLike = () => {
    likePost(post._id, user._id)
    setLiked((prev) => !prev)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      const text = comment.current.value
      if (text !== '') {
        const newComment = await addComment(post._id, user._id, text)
        // console.log(newComment)
        setComments([...comments, newComment.data])
        comment.current.value = ''
      }
    }
  }

  // Get info User
  useEffect(() => {
    const getUserPost = async () => {
      const userPost = await getUser(post.userId)
      setUserPost(userPost.data)
    }
    getUserPost()
  }, [posts])
  // Get comments
  useEffect(() => {
    const getCommentsPost = async () => {
      const comments = await getComments(post._id)
      setComments(comments.data.comments)
    }
    getCommentsPost()
  }, [comments])
  return (
    <div className="Post">
      <div className="detail">
        <div className="user_post">
          <img
            src={
              userPost.profilePicture
                ? serverPublic + userPost.profilePicture
                : serverPublic + 'user.png'
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
        <img src={CommentIcon} alt="" onClick={handleOpenComment} />
        <img src={Option} alt="" />
      </div>

      {/* Open Comments */}
      {openComments && (
        <div className="comment-container">
          <div className="user-input-conment">
            <img
              src={
                user.profilePicture
                  ? serverPublic + user.profilePicture
                  : serverPublic + 'user.png'
              }
              alt=""
            />
            <input
              type="text"
              placeholder="Viết bình luận...."
              ref={comment}
              onKeyDown={handleComment}
            />
          </div>
          <div className="list-comments">
            {comments.map((comment) => {
              return (
                <Comment
                  comment={comment}
                  comments={comments}
                  userPost={userPost}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Post

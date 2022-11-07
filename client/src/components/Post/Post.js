import React, { useEffect, useRef, useState } from 'react'
import './Post.css'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import Option from '../../img/option.png'
import CommentIcon from '../../img/comment.png'
import Comment from '../Comment/Comment'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getComments, likePost } from '../../api/PostRequest'
import { Link } from 'react-router-dom'
import { getUser } from '../../api/UserRequest'
import { deletePost, updatePost } from '../../action/PostAction'
import PostModal from '../PostModal/PostModal'

const Post = ({ post, posts, location }) => {
  // console.log(post)
  const myPost = useRef(null)
  const { user } = useSelector((state) => state.authReducer.authData)
  const { updating } = useSelector((state) => state.postReducer)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const comment = useRef()
  const dispatch = useDispatch()
  // State
  const [liked, setLiked] = useState(post?.likes?.includes(user._id))
  const [likes, setLikes] = useState(post?.likes?.length)
  const [userPost, setUserPost] = useState({})
  const [lcomments, setLComments] = useState(post?.comments?.length)
  const [openComments, setOpenComments] = useState(
    location === 'viewPost' ? true : false,
  )
  const [openOption, setOpenOption] = useState(false)
  const [comments, setComments] = useState(post?.comments)
  const [profileShow, setProfileShow] = useState(false)
  const [update, setUpdate] = useState(false)
  const [desc, setDesc] = useState(post?.desc)
  const [modalOpened, setModalOpened] = useState(false)

  //Func
  const handleLike = () => {
    likePost(post._id, user._id)
    setLiked((prev) => !prev)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  const openComment = async () => {
    setOpenComments((prev) => !prev)
    const comments = await getComments(post._id)
    // dispatch(getComments(post._id))
    // console.log(1)
    setComments(comments.data)
  }

  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      const text = comment.current.value
      if (text !== '') {
        const newComment = await addComment(post._id, user._id, text)
        // console.log(newComment)
        setComments([newComment.data, ...comments])
        setLComments((prev) => prev + 1)
        comment.current.value = ''
      }
    }
  }

  const handleDelete = () => {
    dispatch(deletePost(post._id, user._id))
  }

  const handleUpdate = () => {
    dispatch(updatePost(post._id, user._id, desc))
    setUpdate(false)
  }

  const handleChange = (e) => {
    setDesc(e.target.value)
  }

  // Get info User
  useEffect(() => {
    const getUserPost = async () => {
      const userPost = await getUser(post?.userId)
      setUserPost(userPost.data)
    }
    getUserPost()
  }, [post])

  return (
    <div className="Post" ref={myPost}>
      <div className="detail">
        <div
          className="dropdown-profile-user"
          style={profileShow ? { display: 'block' } : { display: 'none' }}
        >
          <div className="user">
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
          <div className="info">
            <b>Sống tại: </b>
            <span>{userPost.livesin}</span>
          </div>
          <div className="info">
            <b>Làm việc tại: </b>
            <span>{userPost.worksAt}</span>
          </div>
          <div className="info">
            <b>Mối quan hệ: </b>
            <span>{userPost.relationship}</span>
          </div>
        </div>
        <div className="user_post">
          <img
            src={
              userPost.profilePicture
                ? serverPublic + userPost.profilePicture
                : serverPublic + 'user.png'
            }
            alt=""
          />
          <span
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
            }}
            onMouseEnter={() => setProfileShow(true)}
            onMouseLeave={() => setProfileShow(false)}
          >
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
      </div>
      {update ? (
        <div className="desc">
          <input type="text" value={desc} onChange={handleChange} />
          <div className="button-update">
            <button
              onClick={() => {
                setUpdate(false)
                setDesc(post.desc)
              }}
            >
              Huỷ
            </button>
            <button onClick={handleUpdate}>
              {updating ? 'Đang cập nhật...' : 'Cập nhật'}
            </button>
          </div>
        </div>
      ) : (
        <span>{post?.desc}</span>
      )}
      {post?.hastag && (
        <span>
          <b style={{ color: 'purple' }}>#{post.hastag}</b>
        </span>
      )}

      <img
        style={{ cursor: 'pointer' }}
        src={post?.image ? serverPublic + post?.image : ''}
        alt=""
        onClick={() => {
          openComment()
          setOpenComments(false)
          setModalOpened(true)
        }}
      />
      <div className="lenght-react">
        <span>{likes} Lượt thích</span>
        <span>{lcomments} Lượt bình luận</span>
      </div>

      {update ? null : (
        <div className="postReact">
          <img src={liked ? Like : NotLike} alt="" onClick={handleLike} />
          <img src={CommentIcon} alt="" onClick={openComment} />
          {post?.userId === user._id ? (
            <img
              src={Option}
              alt=""
              onClick={() => setOpenOption((prev) => !prev)}
            />
          ) : null}
          <ul
            className="dropdown-option"
            style={openOption ? { display: 'block' } : { display: 'none' }}
          >
            <li
              onClick={() => {
                setOpenOption(false)
                setUpdate(true)
                myPost.current.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Sửa bài viết
            </li>
            <li onClick={handleDelete}>Xoá bài viết</li>
          </ul>
        </div>
      )}

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
            {comments?.map((comment) => {
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

      <PostModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        post={post}
        userPost={userPost}
        user={user}
        liked={liked}
        setLiked={setLiked}
        likes={likes}
        handleLike={handleLike}
        comments={comments}
        setComments={setComments}
        setLComments={setLComments}
        handleComment={handleComment}
        lcomments={lcomments}
      />
    </div>
  )
}

export default Post

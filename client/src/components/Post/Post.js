import React, { useEffect, useRef, useState } from 'react'
import './Post.css'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'
// import Option from '../../img/option.png'
// import CommentIcon from '../../img/comment.png'
import Comment from '../Comment/Comment'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, getComments, likePost } from '../../api/PostRequest'
import { Link } from 'react-router-dom'
import { getUser } from '../../api/UserRequest'
import { deletePost, updatePost } from '../../action/PostAction'
import PostModal from '../PostModal/PostModal'
import { UilCommentAltNotes } from '@iconscout/react-unicons'
import { UilEllipsisH } from '@iconscout/react-unicons'
import { UilSmile } from '@iconscout/react-unicons'
import Picker from 'emoji-picker-react'

const Post = ({ post, posts, location }) => {
  // console.log(post)
  const myPost = useRef(null)
  const { user } = useSelector((state) => state.authReducer.authData)
  const { updating } = useSelector((state) => state.postReducer)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const dispatch = useDispatch()
  // State
  const [liked, setLiked] = useState(post?.likes?.includes(user._id))
  const [likes, setLikes] = useState(post?.likes?.length)
  const [userPost, setUserPost] = useState({})
  const [newComment, setNewComment] = useState('')
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
  const [showPicker, setShowPicker] = useState(false)

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
    setComments(comments.data)
  }

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      if (newComment !== '') {
        const Comment = await addComment(post._id, user._id, newComment)
        setComments([Comment.data, ...comments])
        setLComments((prev) => prev + 1)
        setNewComment('')
      }
    }
  }

  const onEmojiClick = (emojiObject) => {
    setNewComment((comment) => comment + emojiObject.emoji)
    setShowPicker(false)
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
      {/* User post */}
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
              style={{
                textDecoration: 'none',
                color: 'black',
                marginRight: '5px',
              }}
            >
              <b>
                {userPost.firstname} {userPost.lastname}
              </b>
            </Link>
            {post.status && (
              <>
                {post.status === 'funny' && (
                  <label>đang cảm thấy vui vẻ &#128515;</label>
                )}
                {post.status === 'humor' && (
                  <label>đang cảm thấy hài hước &#128514;</label>
                )}
                {post.status === 'happy' && (
                  <label>đang cảm thấy hạnh phúc &#128522;</label>
                )}
                {post.status === 'inlove' && (
                  <label>đang cảm thấy đáng yêu &#128525;</label>
                )}
                {post.status === 'angry' && (
                  <label>đang cảm thấy tức giận &#128548;</label>
                )}
                {post.status === 'sad' && (
                  <label>đang cảm thấy buồn &#128546;</label>
                )}
                {post.status === 'scary' && (
                  <label>đang cảm thấy đáng sợ &#128561;</label>
                )}
                {post.status === 'suprise' && (
                  <label>đang cảm thấy ngạc nhiên &#128562;</label>
                )}
              </>
            )}
          </span>
        </div>
      </div>

      {/* If handle update */}
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
      <div style={{ display: 'flex' }}>
        {post?.hastags &&
          post.hastags.map((hastag) => (
            <span>
              <b style={{ color: 'purple', cursor: 'pointer' }}>{hastag} </b>
            </span>
          ))}
      </div>

      {/* Image */}
      {post?.image && (
        <div className="img-box">
          <img
            style={{ cursor: 'pointer' }}
            src={post?.image?.url}
            alt=""
            onClick={() => {
              openComment()
              setOpenComments(false)
              setModalOpened(true)
            }}
          />
        </div>
      )}

      {/* Video */}
      {post?.video && (
        <div className="video-box">
          <video src={post?.video?.url} controls></video>
        </div>
      )}
      <div className="lenght-react">
        <span>{likes} Lượt thích</span>
        <span>{lcomments} Lượt bình luận</span>
      </div>

      {/* Update */}
      {update ? null : (
        <div className="postReact">
          <img src={liked ? Like : NotLike} alt="" onClick={handleLike} />
          <UilCommentAltNotes onClick={openComment} />
          {/* <img src={CommentIcon} alt="" onClick={openComment} /> */}
          {post?.userId === user._id ? (
            <UilEllipsisH onClick={() => setOpenOption((prev) => !prev)} />
          ) : // <img
          //   src={Option}
          //   alt=""

          // />
          null}
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
              value={newComment}
              onChange={handleCommentChange}
              onKeyDown={handleComment}
            />
            {showPicker && (
              <div className="emoji-container">
                <Picker
                  pickerStyle={{ width: '100%' }}
                  onEmojiClick={onEmojiClick}
                />
              </div>
            )}
            <UilSmile onClick={() => setShowPicker((prev) => !prev)} />
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

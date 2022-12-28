import React, { useRef, useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
import './PostModal.css'
import { Link } from 'react-router-dom'
import { addComment } from '../../api/PostRequest'
import Comment from '../Comment/Comment'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import CommentIcon from '../../img/comment.png'
import ScrollContainer from 'react-indiana-drag-scroll'
import { UilSearchMinus, UilSearchPlus } from '@iconscout/react-unicons'
import { UilSmile } from '@iconscout/react-unicons'
import Picker from 'emoji-picker-react'
import profilePicture from '../../img/user.png'

const PostModal = ({
  modalOpened,
  setModalOpened,
  post,
  userPost,
  user,
  liked,
  handleLike,
  likes,
  comments,
  setComments,
  lcomments,
  setLComments,
}) => {
  const theme = useMantineTheme()
  const [newComment, setNewComment] = useState('')
  const [showPicker, setShowPicker] = useState(false)

  const comment = useRef()
  // State
  const [zoomamount, setZoomamount] = useState(1)

  //Func

  const handleCommentChange = (e) => {
    setNewComment(e.target.value)
  }

  const onEmojiClick = (emojiObject) => {
    setNewComment((comment) => comment + emojiObject.emoji)
    setShowPicker(false)
  }

  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      if (newComment !== '') {
        const Comment = await addComment(post._id, user._id, newComment)
        // console.log(newComment)
        setComments([Comment.data, ...comments])
        setLComments((prev) => prev + 1)
        setNewComment('')
      }
    }
  }

  const zoom = (el) => {
    if (el.type === 'in') {
      setZoomamount((prev) => prev + 0.1)
    } else {
      if (zoomamount > 1) {
        setZoomamount((prev) => prev - 0.1)
      }
    }
  }

  return (
    <Modal
      centered
      overflow="inside"
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="100%"
      opened={modalOpened}
      onClose={() => {
        setModalOpened(false)
        setZoomamount(1)
      }}
    >
      {/* <div className="container"> */}
      {/* Left side */}
      <div className="left-side">
        <div className="set-zoom">
          <UilSearchPlus onClick={() => zoom({ type: 'in' })} />
          <UilSearchMinus onClick={() => zoom({ type: 'out' })} />
        </div>
        <ScrollContainer className="grabbercontainer" hideScrollbars={true}>
          <img
            style={{
              width: 100 * zoomamount + '%',
              height: 100 * zoomamount + '%',
            }}
            src={post?.image?.url}
            alt=""
          />
        </ScrollContainer>
      </div>

      {/* Right side */}
      <div className="right-side">
        <div className="post-header">
          <div className="user_post">
            <div>
              <img
                src={
                  userPost.profilePicture?.url
                    ? userPost.profilePicture?.url
                    : profilePicture
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
          </div>
          <div className="desc">
            <span>{post?.desc}</span>
          </div>
          {post?.hastag && (
            <span>
              <b style={{ color: 'purple' }}>#{post.hastag}</b>
            </span>
          )}
        </div>
        <div className="postReact">
          <div className="like">
            <img src={liked ? Like : NotLike} alt="" onClick={handleLike} />
            <span>{likes} Lượt thích</span>
          </div>
          <div className="comment">
            <img src={CommentIcon} alt="" />
            <span>{lcomments} Lượt bình luận</span>
          </div>
        </div>
        <div className="post-comment">
          <div className="comment-container">
            <div className="user-input-conment">
              <img
                src={
                  user.profilePicture?.url
                    ? user.profilePicture?.url
                    : profilePicture
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
            <div className="list-comments list-comments-modal">
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
        </div>
      </div>
      {/* </div> */}
    </Modal>
  )
}

export default PostModal

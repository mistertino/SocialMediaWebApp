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
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const theme = useMantineTheme()
  const comment = useRef()
  // State
  const [zoomamount, setZoomamount] = useState(1)

  //Func
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
            src={post.image ? serverPublic + post.image : ''}
            alt=""
          />
        </ScrollContainer>
      </div>

      {/* Right side */}
      <div className="right-side">
        <div className="post-header">
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
          <div className="desc">
            <span>{post.desc}</span>
          </div>
          {post.hastag && (
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

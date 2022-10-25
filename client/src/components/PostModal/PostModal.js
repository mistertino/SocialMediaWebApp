import React, { useEffect, useRef, useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
import './PostModal.css'
import { Link } from 'react-router-dom'
import { addComment, getComments } from '../../api/PostRequest'
import Comment from '../Comment/Comment'
import Like from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import CommentIcon from '../../img/comment.png'

const PostModal = ({
  modalOpened,
  setModalOpened,
  post,
  userPost,
  user,
  liked,
  handleLike,
  likes,
}) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const theme = useMantineTheme()
  const comment = useRef()
  //state
  const [comments, setComments] = useState([])

  //Func
  const handleComment = async (e) => {
    if (e.key === 'Enter') {
      const text = comment.current.value
      if (text !== '') {
        const newComment = await addComment(post._id, user._id, text)
        // console.log(newComment)
        setComments([newComment.data, ...comments])
        comment.current.value = ''
      }
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments(post._id)
      setComments(comments.data)
    }
    fetchComments()
  }, [])
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
      size="90%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div className="container">
        <div className="left-side">
          <img src={post.image ? serverPublic + post.image : ''} alt="" />
        </div>
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
            <img src={liked ? Like : NotLike} alt="" onClick={handleLike} />
            <span>{likes} Lượt thích</span>
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
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default PostModal

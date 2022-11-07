import React, { useEffect, useState } from 'react'
import './ProfileCard.css'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest'
import { createChat, findChat } from '../../api/ChatRequest'
import { Modal } from '@mantine/core'
import ScrollContainer from 'react-indiana-drag-scroll'
import { UilSearchMinus, UilSearchPlus } from '@iconscout/react-unicons'

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const { posts } = useSelector((state) => state.postReducer)
  const severPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const params = useParams()
  const profileUserId = params.id
  const navigate = useNavigate()

  // State
  const [profileUser, setProfileUser] = useState(user)
  const [openModalImage, setOpenModalImage] = useState(false)
  const [image, setImage] = useState()
  const [zoomamount, setZoomamount] = useState(1)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id || profileUserId === undefined) {
        setProfileUser(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        // console.log(profileUser.data)
        setProfileUser(profileUser.data)
      }
    }
    fetchProfileUser()
  }, [params.id])

  // Func
  const handleSendMessage = async () => {
    const userId = user._id
    const { data } = await findChat(userId, profileUserId)
    if (data === null) {
      const newChat = {
        senderId: userId,
        receiverId: profileUserId,
      }
      const { data } = await createChat(newChat)
      navigate('../chat', { state: { chat: data } })
    } else navigate('../chat', { state: { chat: data } })
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
    <>
      <div className="ProfileCard">
        <div className="ProfileImage">
          <img
            src={
              user._id === params.id
                ? user.coverPicture
                  ? severPublic + user.coverPicture
                  : severPublic + 'cover.jpg'
                : profileUser.coverPicture
                ? severPublic + profileUser.coverPicture
                : severPublic + 'cover.jpg'
            }
            alt=""
            style={
              location === 'profilePage'
                ? { maxHeight: '15rem' }
                : { maxHeight: '8rem' }
            }
            onClick={() => {
              setOpenModalImage(true)
              setImage(
                user._id === params.id
                  ? user.coverPicture
                    ? severPublic + user.coverPicture
                    : severPublic + 'cover.jpg'
                  : profileUser.coverPicture
                  ? severPublic + profileUser.coverPicture
                  : severPublic + 'cover.jpg',
              )
            }}
          />
          <img
            src={
              user._id === params.id
                ? user.profilePicture
                  ? severPublic + user.profilePicture
                  : severPublic + 'user.png'
                : profileUser.profilePicture
                ? severPublic + profileUser.profilePicture
                : severPublic + 'user.png'
            }
            alt=""
            onClick={() => {
              setOpenModalImage(true)
              setImage(
                user._id === params.id
                  ? user.profilePicture
                    ? severPublic + user.profilePicture
                    : severPublic + 'user.png'
                  : profileUser.profilePicture
                  ? severPublic + profileUser.profilePicture
                  : severPublic + 'user.png',
              )
            }}
          />
        </div>

        <div className="profileName">
          <span>
            {user._id === params.id ? user.firstname : profileUser.firstname}{' '}
            {user._id === params.id ? user.lastname : profileUser.lastname}
          </span>
          <span>{profileUser.about ? profileUser.about : ''}</span>
        </div>

        <div className="followStatus">
          <hr />
          <div>
            <div className="follow">
              <span>
                {user._id === params.id
                  ? user.followers.length
                  : profileUserId
                  ? profileUser.followers.length
                  : user.followers.length}
              </span>
              <span>Người theo dõi</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
              <span>
                {user._id === params.id
                  ? user.following.length
                  : profileUserId
                  ? profileUser.following.length
                  : user.following.length}
              </span>
              <span>Đang theo dõi</span>
            </div>

            {location === 'profilePage' && (
              <>
                <div className="vl"></div>
                <div>
                  <div className="follow">
                    <span>
                      {
                        posts.filter((post) => post.userId === profileUser._id)
                          .length
                      }
                    </span>
                    <span>Bài viết</span>
                  </div>
                </div>
              </>
            )}
          </div>
          <hr />
        </div>

        {location === 'profilePage' ? (
          <button
            className="button send-button-user"
            style={
              user._id === profileUserId
                ? { display: 'none' }
                : { display: 'block' }
            }
            onClick={handleSendMessage}
          >
            Gửi tin nhắn
          </button>
        ) : (
          <span>
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Thông tin của bạn
            </Link>
          </span>
        )}
      </div>

      {/* Modal */}
      <Modal
        opened={openModalImage}
        onClose={() => {
          setOpenModalImage(false)
          setZoomamount(1)
        }}
        size="95%"
        overflow="inside"
        withCloseButton={false}
      >
        <div className="image-popup">
          <div className="set-zoom">
            <UilSearchPlus onClick={() => zoom({ type: 'in' })} />
            <UilSearchMinus onClick={() => zoom({ type: 'out' })} />
          </div>
          <ScrollContainer className="grabbercontainer" hideScrollbars={true}>
            <img
              src={image}
              alt=""
              style={{
                width: 100 * zoomamount + '%',
                height: 100 * zoomamount + '%',
              }}
            />
          </ScrollContainer>
        </div>
      </Modal>
    </>
  )
}

export default ProfileCard

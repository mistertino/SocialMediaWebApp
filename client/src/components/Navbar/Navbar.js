import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../action/AuthAction'
import NotifyItem from '../NotifyItem/NotifyItem'
import { getNotify } from '../../action/UserAction'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Chat from '../../img/chat.png'
import { UilSetting } from '@iconscout/react-unicons'

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  // Sate modal
  const [modalOpened, setModalOpened] = useState(false)
  const [openNotify, setOpenNotify] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)
  //Func
  const handleLogOut = () => {
    dispatch(logOut())
  }

  const handleOpenNotify = () => {
    setOpenNotify((prev) => !prev)
    dispatch(getNotify(user._id))
  }
  return (
    <div className="navIcon">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <div className="notifycations">
        <img src={Noti} alt="" onClick={handleOpenNotify} />
        <div
          className="dot"
          style={
            user.notifications?.length === 0
              ? { display: 'none' }
              : { display: 'block' }
          }
        ></div>
        <div
          className="notify-container"
          style={openNotify ? { display: 'block' } : { display: 'none' }}
        >
          {user.notifications?.length === 0 ? (
            <span
              style={{
                margin: '20px',
                lineHeight: '4rem',
                width: '100%',
                color: 'purple',
              }}
            >
              Bạn không có thông báo nào!
            </span>
          ) : (
            user.notifications?.map((notify) => (
              <NotifyItem notify={notify} user={user} />
            ))
          )}
        </div>
      </div>

      <Link to="../chat">
        <img src={Chat} alt="" style={{ width: '1,5rem', height: '1,5rem' }} />
      </Link>
      <div className="setting">
        <UilSetting onClick={() => setOpenSetting((prev) => !prev)} />
        <div
          className="setting-container"
          style={openSetting ? { display: 'block' } : { display: 'none' }}
        >
          <div className="setting-items">
            <Link
              to={`/profile/${user._id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                textAlign: 'center',
              }}
            >
              <img
                src={
                  user.profilePicture
                    ? serverPublic + user.profilePicture
                    : serverPublic + 'user.png'
                }
                alt=""
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
              />
              <span>
                {user.firstname} {user.lastname}
              </span>
            </Link>

            <button className="button logout-button" onClick={handleLogOut}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

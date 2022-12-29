import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../../action/AuthAction'
import NotifyItem from '../NotifyItem/NotifyItem'
import { getNotify, updateUser } from '../../action/UserAction'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Chat from '../../img/chat.png'
import { UilSetting } from '@iconscout/react-unicons'
import { Modal, useMantineTheme } from '@mantine/core'
import { UilEye } from '@iconscout/react-unicons'
import profilePicture from '../../img/user.png'
import { Alert } from 'react-bootstrap'

const Navbar = () => {
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const {
    updateError,
    authData: { user },
    updateLoading,
  } = useSelector((state) => state.authReducer)
  // Sate modal
  const [modalOpened, setModalOpened] = useState(false)
  const [openNotify, setOpenNotify] = useState(false)
  const [openSetting, setOpenSetting] = useState(false)
  const [confirm, setConfirm] = useState(true)
  const [hidenCurrentPass, setHidenCurrentPass] = useState(true)
  const [hidenNewPass, setHidenNewPass] = useState(true)
  const [hidenConfirmPass, setHidenConfirmPass] = useState(true)

  const [formData, setFormData] = useState({
    _id: user._id,
    oldPassword: '',
    password: '',
    confirmPass: '',
  })

  useEffect(() => {
    if (!updateError) {
      reset()
      setModalOpened(false)
    }
  }, [updateError, user])

  //Func
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const reset = () => {
    setFormData({
      _id: user._id,
      oldPassword: '',
      password: '',
      confirmPass: '',
    })
    setConfirm(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (formData.password === formData.confirmPass) {
      dispatch(updateUser(user._id, formData))
    } else setConfirm(false)
  }

  const handleLogOut = () => {
    dispatch(logOut())
  }

  const handleOpenNotify = () => {
    setOpenNotify((prev) => !prev)
    setOpenSetting(false)
    dispatch(getNotify(user._id))
  }
  return (
    <div className="navIcon">
      <a href="/home">
        <img src={Home} alt="" />
      </a>

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
        <UilSetting
          onClick={() => {
            setOpenSetting((prev) => !prev)
            setOpenNotify(false)
          }}
        />
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
                  user.profilePicture?.url
                    ? user.profilePicture?.url
                    : profilePicture
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
            <span onClick={() => setModalOpened(true)}>Đổi mật khẩu</span>
            <button className="button logout-button" onClick={handleLogOut}>
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
      <Modal
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="35%"
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        overflow="inside"
      >
        <div>
          <form action="" className="form-change-pass" onSubmit={handleSubmit}>
            <h3>Đổi mật khẩu</h3>
            {updateError && (
              <Alert variant="danger">Mật khẩu cũ không đúng</Alert>
            )}
            <div>
              <div className="input-password">
                <input
                  type={hidenCurrentPass ? 'password' : 'text'}
                  className="infoInput"
                  value={formData.oldPassword}
                  name="oldPassword"
                  onChange={handleChange}
                  placeholder="Mật khẩu hiện tại"
                  required
                />
                <UilEye onClick={() => setHidenCurrentPass((prev) => !prev)} />
              </div>

              <div className="input-password">
                <input
                  type={hidenNewPass ? 'password' : 'text'}
                  className="infoInput"
                  value={formData.password}
                  name="password"
                  onChange={handleChange}
                  placeholder="Mật khẩu mới"
                  required
                />
                <UilEye onClick={() => setHidenNewPass((prev) => !prev)} />
              </div>
              <div className="input-password">
                <input
                  type={hidenConfirmPass ? 'password' : 'text'}
                  className="infoInput"
                  value={formData.confirmPass}
                  name="confirmPass"
                  onChange={handleChange}
                  placeholder="Xác nhận mật khẩu mới"
                  required
                />
                <UilEye onClick={() => setHidenConfirmPass((prev) => !prev)} />
              </div>
            </div>
            <span
              style={{
                display: confirm ? 'none' : 'block',
                color: 'red',
                fontSize: '12px',
                alignSelf: 'flex-end',
              }}
            >
              * Xác nhận mật khẩu không chính xác
            </span>
            <button
              className="button change-pass-button"
              type="submit"
              disabled={updateLoading}
            >
              {updateLoading ? 'Đang xác nhận' : 'Xác nhận'}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default Navbar

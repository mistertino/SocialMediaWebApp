import React, { useEffect, useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../action/AuthAction'
import { Alert } from 'react-bootstrap'
const Auth = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.authReducer.alert)
  const loading = useSelector((state) => state.authReducer.loading)
  // State
  const [isSignUp, setIsSignUp] = useState(false)
  const [alertMessage, setAlerMessage] = useState(alert)
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  })
  const [confirmPass, setConfirmPass] = useState(true)

  useEffect(() => {
    localStorage.clear()
  }, [])
  useEffect(() => {
    setAlerMessage(alert)
  }, [alert])

  // Set title
  useEffect(() => {
    isSignUp
      ? (document.title = 'TC Connect - Đăng kí')
      : (document.title = 'TC Connect - Đăng nhập')
  }, [isSignUp])
  // Func
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(ReactDOMServer.renderToStaticMarkup(emailBody))
    if (isSignUp) {
      if (data.password === data.confirmpass) {
        dispatch(signUp(data))
      } else setConfirmPass(false)
    } else {
      dispatch(logIn(data))
    }
  }

  const resetForm = () => {
    setConfirmPass(true)
    setData({
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirmpass: '',
    })
  }
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webname">
          <h1>TC Connect</h1>
          <h6>Nơi chia sẻ và lưu dữ khoảng khắc của bạn!</h6>
        </div>
      </div>
      <div className="a-right">
        <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Đăng ký' : 'Đăng nhập'}</h3>
          {alertMessage !== null && <Alert variant="danger">{alert}</Alert>}
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="Họ"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
                required
              />
              <input
                type="text"
                placeholder="Tên"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
              />
            </div>
          )}
          <div>
            <input
              type={isSignUp ? 'email' : 'text'}
              className="infoInput"
              placeholder="Email"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Mật khẩu"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                placeholder="Xác nhận mật khẩu"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
                required
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
            }}
          >
            * Xác nhận mật khẩu không chính xác
          </span>
          <div>
            <span
              style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => {
                setIsSignUp((prev) => !prev)
                setAlerMessage(null)
                resetForm()
              }}
            >
              {isSignUp ? (
                <>
                  Đã có tài khoản?{' '}
                  <span style={{ textDecoration: 'underline' }}>Đăng nhập</span>
                </>
              ) : (
                <>
                  Chưa có tài khoản?{' '}
                  <span style={{ textDecoration: 'underline' }}>Đăng ký</span>
                </>
              )}
            </span>
          </div>
          <button
            className="button infobutton"
            type="submit"
            disabled={loading}
          >
            {loading
              ? isSignUp
                ? 'Đăng ký...'
                : 'Đăng nhập...'
              : isSignUp
              ? 'Đăng ký'
              : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default Auth

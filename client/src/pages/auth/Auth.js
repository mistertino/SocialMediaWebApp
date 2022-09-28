import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../action/AuthAction'
const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)
  // State
  const [isSignUp, setIsSignUp] = useState(true)
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    confirmpass: '',
  })
  const [confirmPass, setConfirmPass] = useState(true)
  // Func
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false)
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
          <h1>TC Social Media</h1>
          <h6>Share your ideas here!</h6>
        </div>
      </div>
      <div className="a-right">
        <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign Up' : 'Login'}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type="text"
              className="infoInput"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                placeholder="Confirm Password"
                name="confirmpass"
                onChange={handleChange}
                value={data.confirmpass}
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
            * Confirm Password is not same
          </span>
          <div>
            <span
              style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => {
                setIsSignUp((prev) => !prev)
                resetForm()
              }}
            >
              {isSignUp
                ? 'Already have an account? Login'
                : `Don't have an account? Sign Up`}
            </span>
          </div>
          <button
            className="button infobutton"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default Auth

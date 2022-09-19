import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'

const Auth = ({ path }) => {
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webname">
          <h1>TC Social Media</h1>
          <h6>Share your ideas here!</h6>
        </div>
      </div>
      {path === '/login' && <Login />}
      {path === '/register' && <SignUp />}
    </div>
  )
}
const Login = () => {
  return (
    <div className="a-right">
      <form action="" className="infoForm authForm">
        <h3>Login</h3>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Username"
            name="username"
          />
        </div>
        <div>
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
          />
        </div>
        <div>
          <span>Don't have an account? Sign up</span>
        </div>
        <button className="button infobutton" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

const SignUp = () => {
  return (
    <div className="a-right">
      <form action="" className="infoForm authForm">
        <h3>Sign Up</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
          />
        </div>
        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="Username"
            name="username"
          />
        </div>
        <div>
          <input
            type="password"
            className="infoInput"
            placeholder="Password"
            name="password"
          />
          <input
            type="password"
            className="infoInput"
            placeholder="Confirm Password"
            name="confirmpass"
          />
        </div>
        <div className="">
          <span>Already have an account? Login</span>
        </div>
        <button className="button infobutton" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Auth

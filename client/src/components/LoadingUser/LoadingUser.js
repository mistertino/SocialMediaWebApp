import React from 'react'
import './LoadingUser.css'

const LoadingUser = () => {
  return (
    <div className="box">
      <div className="skeleton">
        <div className="skeleton-left flex1">
          <div className="square circle"></div>
        </div>
        <div className="skeleton-right flex2">
          <div className="line h17 w40 m10"></div>
          <div className="line"></div>
          <div className="line h8 w50"></div>
          <div className="line  w75"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingUser

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { logOut } from '../../action/AuthAction'

const VerifyAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData)
  useEffect(() => {
    if (user?.user.active) {
      navigate('/home')
    } else dispatch(logOut())
  }, [])

  return (
    <>
      <div>
        Tài khoản chưa được xác thực. Vui lòng kiểm tra mail để xác thực tài
        khoản. Trở về trang <a href="/auth">đăng nhập</a>
      </div>
    </>
  )
}

export default VerifyAccount

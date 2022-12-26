import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../action/AuthAction'

const VerifyAccount = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(logOut())
    console.log(123)
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

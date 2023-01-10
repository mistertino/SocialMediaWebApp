import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router'
import { activeUser } from '../../action/AuthAction'

const ActiveAccount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { hash } = useParams()
  const loading = useSelector((state) => state.authReducer.loading)
  const user = useSelector((state) => state.authReducer.authData)
  useEffect(() => {
    document.title = 'TC Connect - Đăng kí'
    dispatch(activeUser(hash))
  }, [])

  return (
    <>
      {loading !== null && loading ? (
        <div>Đang kích hoạt tài khoản..... </div>
      ) : (
        <div>Kích hoạt thành công! Đang chuyển hướng.....</div>
      )}
    </>
  )
}

export default ActiveAccount

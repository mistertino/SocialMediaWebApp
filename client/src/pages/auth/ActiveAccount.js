import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { activeUser } from '../../action/AuthAction'

const ActiveAccount = () => {
  const dispatch = useDispatch()
  const { hash } = useParams()
  const loading = useSelector((state) => state.authReducer.loading)
  useEffect(() => {
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

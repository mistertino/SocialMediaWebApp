import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { activeUser, logOut } from '../../action/AuthAction'
import axios from 'axios'
import ReactDOMServer from 'react-dom/server'
import ActiveUser from '../../templates/ActiveUser'
import { useParams } from 'react-router'

const VerifyAccount = () => {
  const user = useSelector((state) => state.authReducer.authData)
  // const { user } = useSelector((state) => state.authReducer.authData)
  const { hash } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('auth')
    const doSendMail = async () => {
      if (user && !user.user?.active) {
        // hash email
        console.log(123)
        const hashedEmail = user?.user.hashedEmail
        // create mail
        const htmlBody = (
          <ActiveUser
            fullname={user?.user.lastname + ' ' + user?.user.firstname}
            hashedEmail={hashedEmail}
          />
        )
        const postMailData = {
          firstname: user?.user.firstname,
          lastname: user?.user.lastname,
          email: user?.user.username,
          htmlBody: ReactDOMServer.renderToStaticMarkup(htmlBody),
        }
        // send mail
        await axios({
          url: 'https://script.google.com/macros/s/AKfycbxCGyyRKRgwpJKPwhAYoQDMxM2VtiyBdUhKbf0Vh6d3DfRjxCooDJVLdxw0Kto-YOIecQ/exec',
          method: 'post',
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          data: postMailData,
        })
          .then(function (response) {
            //success
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
    doSendMail()
    dispatch(logOut())
  }, [user])

  useEffect(() => {
    if (hash) {
      dispatch(activeUser(hash))
    }
  }, [hash])
  console.log(hash)
  if (!hash) {
    return (
      <>
        <div>
          Tài khoản chưa được xác thực. Vui lòng kiểm tra mail để xác thực tài
          khoản. Trở về trang <a href="/auth">đăng nhập</a>
        </div>
      </>
    )
  }
}

export default VerifyAccount

import * as AuthApi from '../api/AuthRequest.js'
import axios from 'axios'
import ReactDOMServer from 'react-dom/server'
import ActiveUser from '../templates/ActiveUser'

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    const { data } = await AuthApi.logIn(formData)
    dispatch({ type: 'AUTH_SUCCESS', data: data })
  } catch (error) {
    // console.log(error.response.data)
    const data = error.response.data
    dispatch({ type: 'AUTH_FAIL', data: data })
  }
}

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: 'AUTH_START' })
  try {
    // register
    const { data } = await AuthApi.signUp(formData)
    // create mail body
    const hashedEmail = data.user.hashedEmail
    const emailBody = (
      <ActiveUser
        fullname={data.user.firstname + ' ' + data.user.lastname}
        hashedEmail={hashedEmail}
      />
    )
    const postMailData = {
      firstname: data.user.firstname,
      lastname: data.user.lastname,
      email: data.user.username,
      hash: '',
      htmlBody: ReactDOMServer.renderToStaticMarkup(emailBody),
    }
    // send mail
    await axios({
      url: 'https://script.google.com/macros/s/AKfycbx45BBqNkCmbG84I4SEiUjD1IElQobwDvw71ZcN2LRv5G8PCFVGnPLYOf-xkT3YLnkj1w/exec',
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
    dispatch({ type: 'AUTH_SUCCESS', data: data })
  } catch (error) {
    // console.log(error.response.data)
    const data = error.response.data
    dispatch({ type: 'AUTH_FAIL', data: data })
  }
}

export const activeUser = (hash) => async (dispatch) => {
  dispatch({ type: 'ACTIVE_START' })
  try {
    console.log(hash)
    const { data } = await AuthApi.activeUser(hash)
    console.log('data', data)
    dispatch({ type: 'ACTIVE_SUCCESS', data: data })
  } catch (error) {
    console.log(error)
    dispatch({ type: 'ACTIVE_FAIL' })
  }
}

export const logOut = () => async (dispatch) => {
  dispatch({ type: 'LOG_OUT' })
}

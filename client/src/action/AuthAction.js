import * as AuthApi from '../api/AuthRequest.js'
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
    const { data } = await AuthApi.signUp(formData)
    dispatch({ type: 'AUTH_SUCCESS', data: data })
  } catch (error) {
    // console.log(error.response.data)
    const data = error.response.data
    dispatch({ type: 'AUTH_FAIL', data: data })
  }
}

export const activeUser = (hash) => async (dispatch) => {
  try {
    const { data } = await AuthApi.activeUser(hash)
    dispatch({ type: 'ACTIVE_SUCCESS', data: data })
  } catch (error) {
    console.log(error)
    dispatch({ type: 'ACTIVE_FAIL' })
  }
}

export const logOut = () => async (dispatch) => {
  dispatch({ type: 'LOG_OUT' })
}

import * as UserApi from '../api/UserRequest'

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_USER_START' })
  try {
    const { data } = await UserApi.updateUser(id, formData)
    dispatch({ type: 'UPDATE_USER_SUCCESS', data: data })
  } catch (error) {
    console.log(error)
    const data = error.response.data
    dispatch({ type: 'UPDATE_USER_FAIL', data: data })
  }
}

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: 'FOLLOW_USER', data: id })
  UserApi.followUser(id, data)
}

export const unFollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: 'UNFOLLOW_USER', data: id })
  UserApi.unFollowUser(id, data)
}

export const getNotify = (id) => async (dispatch) => {
  dispatch({ type: 'GET_NOTIFY_START' })
  try {
    const { data } = await UserApi.getNotify(id)
    console.log(data)
    dispatch({ type: 'GET_NOTIFY_SUCCESS', data: data })
  } catch (error) {
    console.log(error)
    dispatch({ type: 'GET_NOTIFY_FAIL' })
  }
}

export const removeNotify = (id, userId) => async (dispatch) => {
  dispatch({ type: 'REMOVE_NOTIFY', data: id })
  UserApi.removeNotify(id, userId)
}

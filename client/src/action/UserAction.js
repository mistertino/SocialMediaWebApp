import * as UserApi from '../api/UserRequest'

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: 'UPDATE_USER_START' })
  try {
    const { data } = await UserApi.updateUser(id, formData)
    dispatch({ type: 'UPDATE_USER_SUCCESS', data: data })
  } catch (error) {
    console.log(error)
    dispatch({ type: 'UPDATE_USER_FAIL' })
  }
}

import * as PostApi from '../api/PostRequest'

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: 'GET_POST_START' })
  try {
    const { data } = await PostApi.getTimlinePosts(id)
    dispatch({ type: 'GET_POST_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_POST_FAIL' })
    console.log(error)
  }
}

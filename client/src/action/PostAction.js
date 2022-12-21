import * as PostApi from '../api/PostRequest'

export const getTimelinePosts = (id, page) => async (dispatch) => {
  dispatch({ type: 'GET_POST_START' })
  try {
    const { data } = await PostApi.getTimlinePosts(id, page)
    dispatch({ type: 'GET_POST_SUCCESS', data: data })
  } catch (error) {
    dispatch({ type: 'GET_POST_FAIL' })
    console.log(error)
  }
}

export const deletePost = (postId, userId) => async (dispatch) => {
  dispatch({ type: 'DELETE_POST_START' })
  try {
    await PostApi.deletePost(postId, userId)
    dispatch({ type: 'DELETE_POST_SUCCESS', data: postId })
  } catch (error) {
    dispatch({ type: 'DELETE_POST_FAIL' })
    console.log(error)
  }
}

export const updatePost = (postId, userId, desc) => async (dispatch) => {
  dispatch({ type: 'UPDATE_POST_START' })
  try {
    const { data } = await PostApi.updatePost(postId, userId, desc)
    console.log(data)
    dispatch({
      type: 'UPDATE_POST_SUCCESS',
      data: data,
    })
  } catch (error) {
    dispatch({ type: 'UPDATE_POST_FAIL' })
    console.log(error)
  }
}

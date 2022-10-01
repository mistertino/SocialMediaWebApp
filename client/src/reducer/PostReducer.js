const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action,
) => {
  switch (action.type) {
    case 'UPLOAD_START':
      return { ...state, error: false, uploading: true }
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      }
    case 'UPLOAD_FAIL':
      return { ...state, uploading: false, error: true }

    case 'GET_POST_START':
      return { ...state, loading: true, error: false }
    case 'GET_POST_SUCCESS':
      return { ...state, posts: action.data, loading: false, error: false }
    case 'GET_POST_FAIL':
      return { ...state, loading: false, error: true }
    default:
      return state
  }
}

export default postReducer

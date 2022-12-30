const postReducer = (
  state = {
    posts: [],
    loading: false,
    error: false,
    uploading: false,
    updating: false,
  },
  action,
) => {
  switch (action.type) {
    // Upload Post
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

    // Get Post
    case 'GET_POST_START':
      return { ...state, loading: true, error: false }
    case 'GET_POST_SUCCESS':
      return { ...state, posts: action.data, loading: false, error: false }
    case 'GET_POST_FAIL':
      return { ...state, loading: false, error: true }

    // Delete Post
    case 'DELETE_POST_START':
      return { ...state, error: false }
    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        error: false,
        posts: [...state.posts.filter((post) => post._id !== action.data)],
      }
    case 'DELETE_POST_FAIL':
      return { ...state, error: true }

    // Update Post
    case 'UPDATE_POST_START':
      return { ...state, updating: true, error: false }
    case 'UPDATE_POST_SUCCESS':
      return {
        ...state,
        updating: false,
        error: true,
        posts: [
          action.data,
          ...state.posts.filter((post) => post._id !== action.data._id),
        ],
      }
    case 'UPDATE_POST_FAIL':
      return { ...state, updating: false, error: true }

    default:
      return state
  }
}

export default postReducer

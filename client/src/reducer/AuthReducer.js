const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updateLoading: false,
  },
  action,
) => {
  switch (action.type) {
    // Auth User
    case 'AUTH_START':
      return { ...state, loading: true, error: false }
    case 'AUTH_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return { ...state, authData: action.data, loading: false, error: false }
    case 'AUTH_FAIL':
      return { ...state, loading: false, error: true }
    // Update info user
    case 'UPDATE_USER_START':
      return { ...state, updateLoading: true, error: false }
    case 'UPDATE_USER_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return {
        ...state,
        updateLoading: false,
        authData: action.data,
        error: false,
      }
    case 'UPDATE_USER_FAIL':
      return { ...state, updateLoading: false, error: true }
    // Follow User
    case 'FOLLOW_USER':
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      }
    case 'UNFOLLOW_USER':
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.data,
              ),
            ],
          },
        },
      }
    // Log Out
    case 'LOG_OUT':
      localStorage.clear()
      return { ...state, authData: null, loading: false, error: false }
    default:
      return state
  }
}

export default authReducer

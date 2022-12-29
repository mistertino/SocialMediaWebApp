const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    updateError: false,
    updateLoading: false,
    alert: null,
    notifyLoading: false,
    alertUpdate: null,
  },
  action,
) => {
  switch (action.type) {
    // Active User
    case 'ACTIVE_START':
      return { ...state, error: false, loading: true }
    case 'ACTIVE_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return {
        ...state,
        authData: action.data,
        loading: false,
        error: false,
        alert: null,
      }
    // Auth User
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
        error: false,
        alert: null,
      }
    case 'AUTH_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return {
        ...state,
        authData: action.data,
        loading: false,
        error: false,
        alert: null,
      }
    case 'AUTH_FAIL':
      return { ...state, loading: false, error: true, alert: action.data }

    // Update info user
    case 'UPDATE_USER_START':
      return {
        ...state,
        updateLoading: true,
        alertUpdate: null,
      }
    case 'UPDATE_USER_SUCCESS':
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
      return {
        ...state,
        updateLoading: false,
        authData: action.data,
        updateError: false,
        alertUpdate: null,
      }
    case 'UPDATE_USER_FAIL':
      return {
        ...state,
        updateLoading: false,
        updateError: true,
        alertUpdate: action.data,
      }

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

    // Notify
    case 'GET_NOTIFY_START':
      return { ...state, notifyLoading: true, error: false }
    case 'GET_NOTIFY_SUCCESS':
      if (localStorage.getItem('store') !== null) {
        return {
          ...state,
          authData: {
            ...state.authData,
            user: { ...state.authData.user, notifications: action.data },
          },
          notifyLoading: false,
          error: false,
        }
      }

    case 'GET_NOTIFY_FAIL':
      return { ...state, notifyLoading: false, error: true }

    case 'REMOVE_NOTIFY':
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            notifications: [
              ...state.authData.user.notifications.filter(
                (notify) => notify.notifyId !== action.data,
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

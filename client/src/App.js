import './App.css'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Auth from './pages/auth/Auth'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Chat from './pages/chat/Chat'
import SearchResults from './pages/results/SearchResults'
import PostView from './pages/views/PostView'
import { getNotify } from './action/UserAction'
import { useEffect } from 'react'
function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData)
  // console.log(user)
  useEffect(() => {
    setInterval(() => {
      if (user) {
        dispatch(getNotify(user?.user._id))
        console.log(123)
      }
    }, 60000)
  }, [user?.user.notifications.length])
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: ' -8rem' }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="../auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/view/post/:id"
          element={user ? <PostView /> : <Navigate to="../auth" />}
        />
        <Route
          path="/search/result"
          element={user ? <SearchResults /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  )
}

export default App

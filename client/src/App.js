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
import { useCallback, useEffect } from 'react'
import PostsResult from './pages/results/PostsResult'
import VerifyAccount from './pages/auth/VerifyAccount'
function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData)
  // console.log(user)
  // useEffect(() => {
  //   const Intv = setInterval(() => {
  //     if (user) {
  //       dispatch(getNotify(user?.user._id))
  //       console.log(123, user)
  //     }
  //   }, 30000)
  // }, [user])

  // setInterval(
  //   useCallback(() => {
  //     if (user) {
  //       dispatch(getNotify(user?.user._id))
  //       console.log(123, user)
  //     }
  //   }),
  //   3000,
  // )
  console.log(user)
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: ' -8rem' }}></div>
      <Routes>
        <Route path="/active/:hash" element={<VerifyAccount />} />
        <Route
          path="/"
          element={
            user ? (
              user.user.active ? (
                <Navigate to="home" />
              ) : (
                <Navigate to="../active" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/home"
          element={
            user ? (
              user.user.active ? (
                <Home />
              ) : (
                <Navigate to="../active" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/view/post/:id"
          element={
            user ? (
              user.user.active ? (
                <PostView />
              ) : (
                <Navigate to="../active" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/posts/result"
          element={
            user ? (
              user.user.active ? (
                <PostsResult />
              ) : (
                <Navigate to="../active" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/search/result"
          element={
            user ? (
              user.user.active ? (
                <SearchResults />
              ) : (
                <Navigate to="../active" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={
            user ? (
              user.user.active ? (
                <Navigate to="home" />
              ) : (
                <Navigate to="../active" />
              )
            ) : (
              <Auth />
            )
          }
        />
        <Route
          path="/profile/:id"
          element={
            user ? (
              user.user.active ? (
                <Profile />
              ) : (
                <Navigate to="../active" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/chat"
          element={
            user ? (
              user.user.active ? (
                <Chat />
              ) : (
                <Navigate to="../active" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
      </Routes>
    </div>
  )
}

export default App

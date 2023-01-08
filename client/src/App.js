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
import ActiveAccount from './pages/auth/ActiveAccount'
function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData)
  // console.log(user)
<<<<<<< HEAD
  // useEffect(() => {
  //   const Intv = setInterval(() => {
  //     if (user) {
  //       dispatch(getNotify(user?.user._id))
  //       console.log(123, user)
  //     } else clearInterval(Intv)
  //   }, 40000)
  // }, [user])
=======
  useEffect(() => {
    const Intv = setInterval(() => {
      if (user) {
        dispatch(getNotify(user?.user._id))
        console.log(123, user)
      } else clearInterval(Intv)
    }, 40000)
  }, [user?.user?.notifycation])
>>>>>>> local

  // setInterval(
  //   useCallback(() => {
  //     if (user) {
  //       dispatch(getNotify(user?.user._id))
  //       console.log(123, user)
  //     }
  //   }),
  //   3000,
  // )

  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: ' -8rem' }}></div>
      <Routes>
        <Route
          path="/active/:hash"
          element={user ? <Navigate to="/home" /> : <ActiveAccount />}
        />
        <Route path="/verify" element={<VerifyAccount />} />
        <Route
          path="/"
          element={
            user ? (
              user?.user?.active ? (
                <Navigate to="home" />
              ) : (
                <Navigate to="../verify" />
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
              user?.user?.active ? (
                <Home />
              ) : (
                <Navigate to="../verify" />
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
              user?.user?.active ? (
                <PostView />
              ) : (
                <Navigate to="../verify" />
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
              user?.user?.active ? (
                <PostsResult />
              ) : (
                <Navigate to="../verify" />
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
              user?.user?.active ? (
                <SearchResults />
              ) : (
                <Navigate to="../verify" />
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
              user?.user?.active ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="../verify" />
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
              user?.user?.active ? (
                <Profile />
              ) : (
                <Navigate to="../verify" />
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
              user?.user?.active ? (
                <Chat />
              ) : (
                <Navigate to="../verify" />
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

import './App.css'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: ' -8rem' }}></div>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      {/* <Home /> */}
      {/* <Profile /> */}
    </div>
  )
}

export default App

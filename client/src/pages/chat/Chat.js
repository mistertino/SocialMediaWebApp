import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import './Chat.css'
import { logOut } from '../../action/AuthAction'
import ChatBox from '../../components/ChatBox/ChatBox'
const Chat = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  // State
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id)
        setChats(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [user._id])

  const handleLogOut = () => {
    dispatch(logOut())
  }
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUser={user._id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side  */}
      <div className="Right-side-chat">
        <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
          {/* Navicon */}
          <div className="navIcon">
            <Link to="../home">
              <img src={Home} alt="" />
            </Link>

            <div className="dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="setting-dropdown">
                  <img
                    src={Noti}
                    alt=""
                    style={{ height: '1.5rem', width: '1.5rem' }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>My Notify</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Link to="../chat">
              <img src={Comment} alt="" />
            </Link>
            <div className="dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="setting-dropdown">
                  <UilSetting />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link
                      to={`/profile/${user._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      {user.firstname} {user.lastname}
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <button
                      className="button logout-button"
                      onClick={handleLogOut}
                    >
                      Đăng xuất
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        {/* Chat body */}
        <ChatBox chat={currentChat} currentUser={user._id} />
      </div>
    </div>
  )
}

export default Chat

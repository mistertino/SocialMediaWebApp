import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Chaticon from '../../img/chat.png'
import { UilSetting } from '@iconscout/react-unicons'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import './Chat.css'
import { logOut } from '../../action/AuthAction'
import ChatBox from '../../components/ChatBox/ChatBox'
import { io } from 'socket.io-client'
const Chat = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const socket = useRef()
  // State
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)

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

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io('ws://localhost:8800')
    socket.current.emit('new-user-add', user._id)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
    })
  }, [user])

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }
  }, [sendMessage])

  // Get the message from socket server
  useEffect(() => {
    socket.current.on('recieve-message', (data) => {
      console.log(data)
      setReceivedMessage(data)
    })
  }, [])

  // Func
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false
  }

  const handleLogOut = () => {
    dispatch(logOut())
  }
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Trò chuyện</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
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
              <img src={Chaticon} alt="" />
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
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  )
}

export default Chat

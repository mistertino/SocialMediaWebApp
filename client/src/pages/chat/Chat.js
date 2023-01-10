import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'

import { useLocation } from 'react-router-dom'
import './Chat.css'
import { logOut } from '../../action/AuthAction'
import ChatBox from '../../components/ChatBox/ChatBox'
import { io } from 'socket.io-client'
import Navbar from '../../components/Navbar/Navbar'
import { URL_SOCKET } from '../../constants/constants'
const Chat = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  const socket = useRef()
  const location = useLocation()
  // State
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receivedMessage, setReceivedMessage] = useState(null)

  useEffect(() => {
    const getChats = async () => {
      document.title = 'TC Connect - Chat'
      try {
        const { data } = await userChats(user._id)
        setChats(data)
        if (location?.state.chat !== null) {
          setCurrentChat(location.state.chat)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [user._id])

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io(URL_SOCKET)
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
          <Navbar />
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

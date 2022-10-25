import React, { useEffect, useRef, useState } from 'react'
import './ChatBox.css'
import { addMessage, getMesssages } from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequest'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const scroll = useRef()

  //State
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) getUserData()
  }, [chat, currentUser])

  // fetching dât for messages
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const { data } = await getMesssages(chat._id)
        setMessages(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (chat !== null) fetchMessage()
  }, [chat])

  //Func
  const enterKeySend = async (e) => {
    if (e.key === 'Enter') {
      const message = {
        senderId: currentUser,
        text: newMessage,
        chatId: chat._id,
      }
      const receiverId = chat.members.find((id) => id !== currentUser)
      // send message to socket server
      setSendMessage({ ...message, receiverId })

      // Send message to database
      try {
        const { data } = await addMessage(message)
        setMessages([...messages, data])
        setNewMessage('')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleChange = (e) => {
    setNewMessage(e.target.value)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    }
    const receiverId = chat.members.find((id) => id !== currentUser)
    // send message to socket server
    setSendMessage({ ...message, receiverId })

    // Send message to database
    try {
      const { data } = await addMessage(message)
      setMessages([...messages, data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  // Receive Message from parent component
  useEffect(() => {
    console.log('Message Arrived: ', receivedMessage)
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage])
    }
  }, [receivedMessage])

  // Allway scroll to last message when receive new message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? serverPublic + userData.profilePicture
                        : serverPublic + 'user.png'
                    }
                    alt=""
                    className="followerImage"
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                    }}
                  />
                  <div className="name" style={{ fontSize: '0.8rem' }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
            </div>
            {/* chatbox message */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    ref={scroll}
                    className={
                      message.senderId === currentUser
                        ? 'message own'
                        : 'message'
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt, 'vi')}</span>
                  </div>
                </>
              ))}
            </div>

            {/* chat sender */}
            <div className="chat-sender">
              {/* <div>+</div> */}
              <input
                value={newMessage}
                onChange={handleChange}
                placeholder="Nhập tin nhắn"
                onKeyDown={enterKeySend}
              />
              <div className="send-button button" onClick={handleSend}>
                Gửi
              </div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Chọn một cuộc Trò chuyện để bắt đầu Cuộc hội thoại!
          </span>
        )}
      </div>
    </>
  )
}

export default ChatBox

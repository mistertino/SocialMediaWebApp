import React, { useEffect, useState } from 'react'
import './ChatBox.css'
import { getMesssages } from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequest'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
const ChatBox = ({ chat, currentUser }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

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
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
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
                      with: '50px',
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
                    className={
                      message.senderId === currentUser
                        ? 'message own'
                        : 'message'
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>

            {/* chat sender */}
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button">Send</div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">
            Tap on a Chat to start Conversation
          </span>
        )}
      </div>
    </>
  )
}

export default ChatBox

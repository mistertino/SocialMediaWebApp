import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'

const Conversation = ({ data, currentUser, online }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  //State
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId)
        setUserData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUserData()
  }, [])
  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? serverPublic + userData.profilePicture
                : serverPublic + 'user.png'
            }
            alt=""
            className="followerImage"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <div className="name" style={{ fontSize: '0.8rem' }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>{online ? 'Trực tuyến' : 'Ngoại tuyến'}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
    </>
  )
}

export default Conversation

import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'
import { PUBLIC_FOLDER } from '../../constants/constants'

const Conversation = ({ data, currentUser, online }) => {
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
                ? PUBLIC_FOLDER + userData.profilePicture
                : PUBLIC_FOLDER + 'user.png'
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

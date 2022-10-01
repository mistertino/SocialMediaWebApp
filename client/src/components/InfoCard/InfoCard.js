import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest'
import { logOut } from '../../action/AuthAction'

const InfoCard = () => {
  const { user } = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch()
  const params = useParams()
  const profileUserId = params.id
  // Sate Profile
  const [profileUser, setProfileUser] = useState({})
  // Sate modal
  const [modalOpened, setModalOpened] = useState(false)

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
      }
    }
    fetchProfileUser()
  }, [user])
  //Func
  const handleLogOut = () => {
    dispatch(logOut())
  }
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === params.id ? (
          <div>
            <UilPen
              width="2rem"
              hieght="1.2rem"
              onClick={() => setModalOpened(true)}
              style={{ cursor: 'pointer' }}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  )
}

export default InfoCard

import React, { useEffect, useState } from 'react'
import { Modal } from '@mantine/core'
import UserFollow from '../UserFollow/UserFollow'
import './FollowModal.css'

const FollowModal = ({
  openModalFollow,
  setOpenModalFollow,
  type,
  profileUser,
}) => {
  // State
  const [text, setText] = useState('')
  function handleOnEnter(text) {
    console.log('enter', text)
  }
  return (
    <Modal
      opened={openModalFollow}
      onClose={() => setOpenModalFollow(false)}
      overflow="inside"
    >
      <div className="user-container" style={{ width: '100%' }}>
        {type === 'following' &&
          profileUser.following.map((userId) => (
            <UserFollow
              userId={userId}
              setOpenModalFollow={setOpenModalFollow}
            />
          ))}
        {type === 'followers' &&
          profileUser.followers.map((userId) => (
            <UserFollow
              userId={userId}
              setOpenModalFollow={setOpenModalFollow}
            />
          ))}
      </div>
    </Modal>
  )
}

export default FollowModal

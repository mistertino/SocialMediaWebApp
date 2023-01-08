import React, { useEffect, useState } from 'react'
import { Modal } from '@mantine/core'
import UserFollow from '../UserFollow/UserFollow'
import './FollowModal.css'
import { getUser } from '../../api/UserRequest'

const FollowModal = ({
  openModalFollow,
  setOpenModalFollow,
  type,
  profileUser,
}) => {
  if (type === 'following' && profileUser.following.length === 0) {
    setOpenModalFollow(false)
  }
  if (type === 'followers' && profileUser.followers.length === 0) {
    setOpenModalFollow(false)
  }

  return (
    <Modal
      opened={openModalFollow}
      onClose={() => setOpenModalFollow(false)}
      overflow="inside"
      title={type === 'following' ? 'Đang theo dõi' : 'Người theo dõi'}
    >
      <div className="user-container" style={{ width: '100%' }}>
        {type === 'following' &&
          profileUser.following.map((userId) => (
            <UserFollow
              userId={userId}
              lengthItems={profileUser.following.length}
              setOpenModalFollow={setOpenModalFollow}
            />
          ))}
        {type === 'followers' &&
          profileUser.followers.map((userId) => (
            <UserFollow
              userId={userId}
              lengthItems={profileUser.following.length}
              setOpenModalFollow={setOpenModalFollow}
            />
          ))}
      </div>
    </Modal>
  )
}

export default FollowModal

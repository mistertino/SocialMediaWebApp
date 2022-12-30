import React, { useEffect } from 'react'
import { Modal, useMantineTheme } from '@mantine/core'
import UserFollow from '../UserFollow/UserFollow'

const LikerModal = ({
  likes,
  listLiker,
  setModalLikerOpened,
  modalLikerOpened,
}) => {
  const theme = useMantineTheme()
  useEffect(() => {}, [])
  return (
    <Modal
      opened={modalLikerOpened}
      overflow="inside"
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      onClose={() => setModalLikerOpened(false)}
      title="Người thích"
    >
      <div className="user-container" style={{ width: '100%' }}>
        {listLiker?.map((userId) => (
          <UserFollow userId={userId} />
        ))}
      </div>
    </Modal>
  )
}

export default LikerModal

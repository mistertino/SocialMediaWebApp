import React, { useEffect, useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Chat from '../../img/chat.png'
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import ShareModal from '../ShareModal/ShareModal'
import Navbar from '../Navbar/Navbar'

const RightSide = () => {
  // Sate modal
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="RightSide">
      <div className="RightSide-box">
        <Navbar />

        <TrendCard />

        <button
          className="button s-button"
          onClick={() => setModalOpened(true)}
        >
          Đăng bài
        </button>
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
      </div>
    </div>
  )
}

export default RightSide

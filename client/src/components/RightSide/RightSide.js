import React, { useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import TrendCard from '../TrendCard/TrendCard'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import ShareModal from '../ShareModal/ShareModal'
import { Link } from 'react-router-dom'

const RightSide = () => {
  // Sate modal
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="RightSide">
      <div className="navIcon">
        <Link to="../home">
          <img src={Home} alt="" />
        </Link>

        <div className="dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="setting-dropdown">
              <img
                src={Noti}
                alt=""
                style={{ height: '1.5rem', width: '1.5rem' }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>My Notify</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <img src={Comment} alt="" />
        <div className="dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="setting-dropdown">
              <UilSetting />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">My profile</Dropdown.Item>
              <Dropdown.Item>
                <button className="button logout-button">Logout</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <TrendCard />

      <button className="button s-button" onClick={() => setModalOpened(true)}>
        Post
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide

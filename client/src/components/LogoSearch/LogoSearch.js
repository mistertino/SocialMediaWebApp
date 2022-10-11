import React from 'react'
import './LogoSearch.css'
import Logo from '../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'

const LogoSearch = () => {
  const navigate = useNavigate()
  const handleSearch = () => {
    // naviagate('../search')
  }

  return (
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
        <input type="text" placeholder="Tìm kiếm người dùng" />
        <div className="s-icon" onClick={handleSearch}>
          <UilSearch />
        </div>
      </div>
    </div>
  )
}

export default LogoSearch

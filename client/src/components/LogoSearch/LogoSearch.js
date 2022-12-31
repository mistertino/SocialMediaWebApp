import React, { useEffect, useState } from 'react'
import './LogoSearch.css'
import Logo from '../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../api/UserRequest'
import { useRef } from 'react'

const LogoSearch = () => {
  const buttonRef = useRef()
  const navigate = useNavigate()
  //State
  const [search, setSearch] = useState(null)
  const [users, setUsers] = useState([])

  //Func
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const EnterSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const results = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(search.toLowerCase()) ||
        user.lastname.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()),
    )
    setSearch('')
    navigate('../search/result', { state: { results: results } })
  }

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getAllUsers()
      setUsers(users.data)
    }
    fetchAllUsers()
  }, [])

  return (
    <div>
      <form className="LogoSearch" onSubmit={handleSearch}>
        <a href="/home">
          <img src={Logo} alt="" />
        </a>

        <div className="Search">
          <input
            type="text"
            placeholder="Tìm kiếm người dùng"
            value={search}
            onChange={handleChange}
            onKeyDown={EnterSearch}
            required
          />
          <button
            type="submit"
            ref={buttonRef}
            style={{ display: 'none' }}
          ></button>
          <div className="s-icon" onClick={() => buttonRef.current.click()}>
            <UilSearch />
          </div>
        </div>
      </form>
    </div>
  )
}

export default LogoSearch

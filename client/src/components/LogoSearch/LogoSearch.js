import React, { useEffect, useState } from 'react'
import './LogoSearch.css'
import Logo from '../../img/logo.png'
import { UilSearch } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../api/UserRequest'

const LogoSearch = () => {
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

  const handleSearch = () => {
    const results = users.filter(
      (user) =>
        user.firstname.includes(search) ||
        user.lastname.includes(search) ||
        user.username.includes(search),
    )
    console.log(results)
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
    <div className="LogoSearch">
      <img src={Logo} alt="" />
      <div className="Search">
        <input
          type="text"
          placeholder="Tìm kiếm người dùng"
          value={search}
          onChange={handleChange}
          onKeyDown={EnterSearch}
        />
        <div className="s-icon" onClick={handleSearch}>
          <UilSearch />
        </div>
      </div>
    </div>
  )
}

export default LogoSearch

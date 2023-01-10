import React, { useEffect, useState } from 'react'
import './FollowerCard.css'
import User from '../User/User'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../api/UserRequest'

const FollowerCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData)
  //State
  const [persons, setPersons] = useState([])
  useEffect(() => {
    const fetchPerson = async () => {
      const { data } = await getAllUsers()
      setPersons(data)
    }
    fetchPerson()
  }, [])
  return (
    <div className="FollowerCard">
      <h5 style={{ color: 'purple' }}>Những người bạn có thể biết.</h5>
      <div
        className="user"
        style={location === 'profilePage' ? { maxHeight: '100vh' } : {}}
      >
        {persons.map((person, id) => {
          if (person._id !== user._id) {
            if (!person.followers.includes(user._id) && person.active)
              return <User person={person} key={id} />
          }
        })}
      </div>
    </div>
  )
}

export default FollowerCard

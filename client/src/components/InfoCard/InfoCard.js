import React from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'

const InfoCard = () => {
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Your Info</h4>
        <UilPen width="2rem" hieght="1.2rem" />
      </div>
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>in Relationship</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Ninh Binh</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>TLU University</span>
      </div>

      <button className="button logout-button">Logout</button>
    </div>
  )
}

export default InfoCard

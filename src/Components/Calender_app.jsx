import React from 'react'
import './Calendar.css'

const Calender_app = () => {
  return (
    <div className='calendar'>
      <h1 className="heading">Calendar</h1>
      <div className="navigate-date">
        <h2 className="month">May,</h2>
        <h2 className="year">2025</h2>
        <div className="buttons">
          <i className="bx bx-chevron-left icon"></i>
          <i className="bx bx-chevron-right"></i>
        </div>
      </div>
    </div>
  )
}

export default Calender_app
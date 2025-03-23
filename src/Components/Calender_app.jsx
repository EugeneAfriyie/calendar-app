import React, { useState } from 'react'
import './Calendar.css'

const Calender_app = () => {

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const monthsOfYear = 
  [
     'January',
     'February',
     'March',
     'April',
     'May',
      'June',
      'July',
      'August',
      'October',
      'November',
      'December' 
    ]


    const currentDate = new Date();
    const currentDay = currentDate.getDate();



    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    console.log(firstDayOfMonth, daysInMonth)







  return (
   <div className="calendar-app">
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
      <div className="weekdays">
       { 
        daysOfWeek.map(day =>(  <span key={day}>{day}</span> ))}
    
      </div>
      <div className="days">
        {...Array(firstDayOfMonth)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="day"></div>
        ))}
        {Array(daysInMonth)
        .fill(null)
        .map((_, index) => (
          <span key={index} className="day">{index + 1}</span>
        ))}

</div>

    </div>
    <div className="events">
      <div className="events-popup">
        <div className="time-input">
          <div className="event-popup-time">Time</div>
          <input type="number" name='hours' min={0} max={24} className='hours' />
          <input type="number" name='minutes' min={0} max={60} className='minutes' />
        </div>
        <textarea name="" placeholder='Enter Events Text (Maximunm 60 Characters)' id=""></textarea>
        <button className="event-popup-btn">Add Events</button>
        <button className="close-event-popup">
          <i className="bx bx-x"></i>
        </button>
      </div>
      

        <div className="event">
          <div className="event-date-wrapper">
            <div className="event-date">May 16, 2025</div>
            <div className="event-time">15:00</div>
          </div>
          <div className="event-text">Meeting with John</div>
          <div className="event-buttons">
            <i className="bx bxs-edit-alt"></i>
            <i className="bx bxs-message-alt-x"></i>
          </div>
        
      </div>
    </div>
   </div>
  )
}

export default Calender_app
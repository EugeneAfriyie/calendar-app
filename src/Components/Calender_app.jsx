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
      'September',
      'October',
      'November',
      'December' 
    ]


    const currentDate = new Date();
    const currentDay = currentDate.getDate();


    console.log(currentDay)
    console.log(currentDate.getMonth())




    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const [selectdate, setSelectdate] = useState(currentDate);
    const [showEventPopup,setShowEventPopup] = useState(false)
    const [event, setEvent] = useState([]);
    const [eventTime,setEventTime] = useState({hours: '00', minutes: '00'})
    const [eventText,setEventText] = useState('');
    const [editingEvent,setEditingEvent] = useState(null);



 

const prevMonth = () =>{
  setCurrentMonth(prevMonth => prevMonth === 0 ? 11 : prevMonth - 1)
  setCurrentYear(prevYear => currentMonth === 0 ? prevYear - 1 : prevYear)
}

const nextMonth = () =>{
  setCurrentMonth(prevMonth => prevMonth === 11 ? 0 : prevMonth + 1)
  setCurrentYear(prevYear => currentMonth === 11 ? prevYear + 1 : prevYear)
}

const IsSameDay = ( date1,date2) =>{
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() 
  )
}

const handleDayClick = (day) =>{
  const clickedDate = new Date(currentYear, currentMonth, day);
  const today = new Date ();

  // console.log(`${clickedDate},This is today ${today}`);

  if(clickedDate >= today || IsSameDay(clickedDate,today)){
    setEditingEvent(null);
    setSelectdate(clickedDate);
    setShowEventPopup(true)
    setEventTime({hours: '00', minutes: '00'});
    setEventText('');
  }
}



let updateEvent = [...event]
// console.log(updateEvent)
// console.log(event)

const handleEventSumit = () =>{
  const newEvent = {
    id: editingEvent ? editingEvent.id : new Date().getTime(),
    date:selectdate,
    time: `${String(eventTime.hours).padStart(2, '0')}:${String(eventTime.minutes).padStart(2, '0')}`,
    text: eventText
  }

  if(editingEvent){
    updateEvent = updateEvent.map(event =>
      event.id === editingEvent.id ? newEvent : event
    );
  }else{
    updateEvent = [...updateEvent, newEvent]
  }

  // updateEvent.sort((a,b) => {
  //   if(a.date.getTime() === b.date.getTime()){
  //     return a.time.localeCompare(b.time)
  //   }
  //   return a.date.getTime() - b.date.getTime()
  // })


  updateEvent.sort((a,b) => {new Date(a.date) - new Date(b.date)})

  setEvent(updateEvent);
  setEventTime({hours: '00', minutes: '00'});
  setEventText('');
  setShowEventPopup(false)
  setEditingEvent(null);
  // console.log(event)
}


const handleEditEvent = (event) =>{
  setSelectdate(new Date(event.date));
  setEventTime({hours: event.time.split(':')[0], minutes: event.time.split(':')[1]}); 
  setEventText(event.text);
  setEditingEvent(event)
  setShowEventPopup(true)
}

const handleDeleteEvent = (eventid) =>{
  const updateEvent = event.filter((event) => event.id !== eventid);
  setEvent(updateEvent);  
}

const handlTimeChange = (e) =>{
  const {name,value} = e.target;
  const newTime = {...eventTime, [name]: value.padStart(2, '0')}
  setEventTime(newTime)}

  return (
    <>
   <div className="calendar-app">
     <div className='calendar'>
      <h1 className="heading">Calendar</h1>
      <div className="navigate-date">
        <h2 className="month">

          {/* {monthsOfYear.map((month,index) =>{
          {index === currentMonth && month  }
        })} */}
        {monthsOfYear[currentMonth]}
        ,</h2>

        <h2 className="year">{currentYear}</h2>
        
        <div className="buttons">
          <i className="bx bx-chevron-left icon" onClick={prevMonth}></i>
          <i className="bx bx-chevron-right" onClick={nextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
       { 
        daysOfWeek.map(day =>(  <span key={day}>{day}</span> ))}
    
      </div>
      <div className="days">

      {[...Array(firstDayOfMonth).keys()].map((_,index) =>(
          <span key={`Empty-${index}`} />
        ))}

        {[...Array(daysInMonth).keys()].map((day) =>(
          <span key={`Empty-${day + 1}`}  className={`day ${currentDay  === day + 1 && currentMonth === currentDate.getMonth() && currentYear === new Date().getFullYear()  ? 'current-day' : '' }`}  onClick={() => (handleDayClick(day + 1))} >{day + 1}</span>
        ))}
{/* 
        {...Array(firstDayOfMonth)
        .fill(null)
        .map((_, index) => (
          <div key={index} className="day"></div>
        ))}
        {Array(daysInMonth)
        .fill(null)
        .map((_, index) => (
          <span key={index} 
                className={`day ${currentDay === index + 1 ? 'current-day' : '' }`} 
                onClick={() => (handleDayClick(index + 1))}
                >
                  {index + 1}
          </span>
        ))} */}

</div>

    </div>
    <div className="events">
    
      

       <div className="">
       {event.map((event,index) =>(
          <div key={index} className="event">
          <div className="event-date-wrapper">
            <div className="event-date">{`${monthsOfYear[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}}`}</div>
            <div className="event-time">{event.time}</div>
          </div>
          <div className="event-text">{event.text}</div>
          <div className="event-buttons">
            <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event)}></i>
            <i className="bx bxs-message-alt-x" onClick={() => handleDeleteEvent(event.id)}></i>
          </div>
        
        </div>
        ))}
       </div>
    </div>
   </div>
   <div  className={ `events-popup ${showEventPopup ? 'transform-active' : 'transform'}`} >
        <div className="time-input">
          <div className="event-popup-time">Time</div>
          <input type="number" name='hours' min={0} max={24} className='hours' value={eventTime.hours} 
          //  onChange={(e) =>{setEventTime({...eventTime,hours:e.target.value})}}
          onChange={handlTimeChange}
           />
          <input type="number" name='minutes' min={0} max={60} className='minutes' value={eventTime.minutes}
          //  onChange={(e) =>{setEventTime({...eventTime,minutes:e.target.value})}}
          onChange={handlTimeChange}
           
           />
        </div>
        <textarea name="" placeholder='Enter Events Text (Maximunm 60 Characters)' 
                  value={eventText} 
                  onChange={(e) =>{if(e.target.value.length <= 60){
                    setEventText(e.target.value)
                  }}} 
                  id=""
                  ></textarea>
        <button className="event-popup-btn" onClick={handleEventSumit}>{editingEvent ? 'Update Event' : 'Add Events'}</button>
        <button className="close-event-popup">
          <i className="bx bx-x" onClick={() => setShowEventPopup(false)}></i>
        </button>
      </div>
    {showEventPopup && <div className="overlay" onClick={() => setShowEventPopup(false)}></div>}
   </>
  )
}

export default Calender_app
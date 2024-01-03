import React, { useState } from 'react';
import CalendarRow from './CalendarRow';
import moment from 'moment';

function Calendar({ }) {
  
  const firstDayOfMonth = () => {
    let dateObject = moment();
    let firstDay = moment(dateObject)
                 .startOf("month")
                 .format("d"); 
    console.log(firstDay);
    return firstDay;
  };
  
  return (
    <div class='calendarBlock'>
        <h3 className='calendarHeader'>January 2023</h3>
        <div class="calendar">
            <CalendarRow bold={true} contents={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}/>
            <CalendarRow contents={[1,2,3,4,5,6,7]}/>
            <CalendarRow contents={[8,9,10,11,12,13,14]}/>
            <CalendarRow contents={[15,16,17,18,19,20,21]}/>
            <CalendarRow contents={[22,23,24,25,26,27,28]}/>
            <CalendarRow contents={[29,30,31,1,1,1,1]}/>
        </div>
    </div>
    
  );
}

export default Calendar;
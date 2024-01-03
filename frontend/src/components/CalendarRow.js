import React, { useState } from 'react';

function CalendarRow({ contents, bold }) {

  return (
    <div class=calendarRow
    {bold ? (

    ) : (
    <div>
        <div class="col1">{contents[0]}</div>
        <div class="col2">{contents[1]}</div>
        <div class="col3">{contents[2]}</div>
        <div class="col4">{contents[3]}</div>
        <div class="col5">{contents[4]}</div>
        <div class="col6">{contents[5]}</div>
        <div class="col7">{contents[6]}</div>
    </div>
    )
  );
}

export default CalendarRow;
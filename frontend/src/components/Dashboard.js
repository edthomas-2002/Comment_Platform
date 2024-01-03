import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles.css'; 

function Dashboard() {

  return (
    <ul className='dashboard'>
        <li className='navButton'>Home</li>
        <li className='navButton'>News</li>
        <li></li>
        <li></li>
    </ul>
  );
}

export default Dashboard;

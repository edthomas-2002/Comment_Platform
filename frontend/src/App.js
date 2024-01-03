import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PostsPage from './components/PostsPage';
import SignupPage from './components/SignupPage';
import Calendar from './components/Calendar';
import CalendarBetter from './components/CalendarBetter';

function App() {

  return (
    <Calendar />
  );
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       {/* Route for Login */}
  //       <Route path="/" element={<LoginPage />} />
  //       {/* Route for Signup */}
  //       <Route path="/signup" element={<SignupPage />} />
  //       {/* Protected Route for Posts */}
  //       <Route
  //         path="/posts"
  //         element={sessionStorage.getItem('loggedIn') ? <PostsPage /> : <Navigate to="/" />}
  //       />
  //     </Routes>
  //   </BrowserRouter>
  // );
}

export default App;

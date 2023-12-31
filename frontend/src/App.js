import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PostsPage from './components/PostsPage';
import SignupPage from './components/SignupPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [author, setAuthor] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        {/* Route for Login */}
        <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} saveAuthor={setAuthor} />} />
        {/* Route for Signup */}
        <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} saveAuthor={setAuthor} />} />
        {/* Protected Route for Posts */}
        <Route
          path="/posts"
          element={isLoggedIn ? <PostsPage author={author} /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

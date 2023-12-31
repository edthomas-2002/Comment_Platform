import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles.css';

function LoginPage({ setIsLoggedIn, saveAuthor }) {
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Specify content type as JSON
        },
        body: JSON.stringify({'author': author, 'password': password})
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response JSON
      })
      .then(data => {
        console.log('Login successful:', data);
        setIsLoggedIn(true);
        saveAuthor(author);
        navigate('/posts');
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="formContainer">
      <form className="loginForm" onSubmit={handleFormSubmit}>
        <h3 className='login'>Login</h3>
        <div>
          <input
            type="text"
            placeholder="User"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="loginButton" type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

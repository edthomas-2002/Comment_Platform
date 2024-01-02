import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles.css'; 

function LoginPage() {
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCredentialsMessage, setInvalidCredentialsMessage] = useState('');
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
        if (data['message'] === 'Login successful') {
          console.log('Login successful:', data);
          sessionStorage.setItem('author', author);
          sessionStorage.setItem('loggedIn', true);
          navigate('/posts');
      }
      else if (data['message'] === 'Invalid credentials') {
          console.log('Invalid credentials: ', data);
          setInvalidCredentialsMessage('Invalid credentials. Try again.');
      }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleSignup = () => {
    navigate('/signup')
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
        <div style={{ color: 'red' }}>{invalidCredentialsMessage}</div>
        <div>
          <button className="loginButton" type="submit">Login</button>
          <button className="signupButton" onClick={handleSignup}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

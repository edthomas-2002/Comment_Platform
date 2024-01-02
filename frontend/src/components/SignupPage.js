import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles.css';

function SignupPage() {
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [userExistsMessage, setUserExistsMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/signup/', {
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
        if (data['message'] === 'Signup successful') {
            console.log('Profile created successfully:', data);
            sessionStorage.setItem('author', author);
            sessionStorage.setItem('loggedIn', true);
            navigate('../posts');
        }
        else if (data['message'] === 'User already exists') {
            console.log('User already exists:', data);
            setUserExistsMessage('User already exists. Try again.');
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="formContainer">
      <form className="signupForm" onSubmit={handleFormSubmit}>
        <h3 className='signup'>Create a New Account</h3>
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
        <div style={{ color: 'red' }}>{userExistsMessage}</div>
        <div>
          <button className="signupButton" type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;

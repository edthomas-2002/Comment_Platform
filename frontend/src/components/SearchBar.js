import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles.css'; 

function SearchBar({ onQuery, setIsQuerying }) {
  const [query, setQuery] = useState('');

  const handleFormSubmit = (e) => {
      e.preventDefault();
      fetch(`http://localhost:8000/api/posts/query/?query_content=${query}`, {
      method: 'GET',
    },)
      .then((response) => response.json())
      .then((data) => {
        console.log('querying');
        setIsQuerying(true);
        onQuery(data);
      })
      .catch((error) => {
        console.error('Error checking for liked:', error);
      });
    };

  return (
    <div className='searchBar'>
      <form onSubmit={handleFormSubmit}>
        <textarea
          placeholder='Search for a post'
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>
        <button type="submit">Search</button>
      </form>
    </div>
    
  );
}

export default SearchBar;

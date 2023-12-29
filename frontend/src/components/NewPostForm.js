import React, { useState } from 'react';
import './styles.css';

function NewPostForm() {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const currentTime = new Date().toISOString();

    const formData = new FormData();
    formData.append('author', author);
    formData.append('text', text);
    formData.append('date', currentTime);
    formData.append('likes', 0);
    formData.append('image', '');

    fetch('http://localhost:8000/api/posts/', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New post created:', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        // Handle errors or display a message to the user
      });
  };

  return (
    <div className="formContainer">
      <form className="createPostForm" onSubmit={handleFormSubmit}>
        <h3 className='createNewPost'>Create a new post</h3>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button className="postButton" type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default NewPostForm;

import React, { useState } from 'react';
import './styles.css';

function NewPostForm({ type, parentId, author, onNewPost, onCancel }) {
  const [text, setText] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const currentTime = new Date().toISOString();

    const formData = new FormData();
    formData.append('author', author);
    formData.append('parent', parentId);
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
        setText(''); // Clear the textarea after successful post creation
        onNewPost(data); // Notify the parent component about the new post
      })
      .catch((error) => {
        console.error('Error creating post:', error);
        // Handle errors or display a message to the user
      });
  };

  return (
    <div className="formContainer">
      <form className="createPostForm" onSubmit={handleFormSubmit}>
        {type === 'post' ? (
          <h3 className='createNewPost'>Make a Post!</h3>
        ) : (
          <h3 className='createNewPost'>Reply</h3>
        )}
        <div>
          <label>Author: {author}</label>
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <button className="postButton" type="submit">Add {type}</button>
        {type === 'reply' ? (
          <button className="cancelPostButton" onClick={onCancel}>Cancel</button>
        ) : (
          <div />
        )}
      </form>
    </div>
  );
}

export default NewPostForm;

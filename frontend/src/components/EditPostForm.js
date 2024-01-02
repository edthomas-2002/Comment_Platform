import React, { useState } from 'react';

function EditPostForm({ post, onCompleteEdit, onCancelEdit }) {
  const [editedContent, setEditedContent] = useState(post.text);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('author', post.author);
    formData.append('text', editedContent);
    formData.append('image', post.image);
    formData.append('date', post.currentTime);
    formData.append('likes', post.likes);
    
    fetch(`http://localhost:8000/api/posts/${post.id}/`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post updated successfully');
        onCompleteEdit(data);
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });  
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <h3>{post.author}</h3>
      <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
      ></textarea>
      <button type="submit">Save</button>
      <button onClick={onCancelEdit}>Cancel</button>
    </form>
  );
}

export default EditPostForm;
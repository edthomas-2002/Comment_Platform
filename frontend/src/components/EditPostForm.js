import React, { useState } from 'react';

function EditPostForm({ post, onCancelEdit }) {
  const [editedContent, setEditedContent] = useState(post.text);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('author', post.author);
    formData.append('text', editedContent);
    if (post.image) {
      formData.append('image', post.image);
    }
    formData.append('date', post.currentTime);
    formData.append('likes', 0);
    
    fetch(`http://localhost:8000/api/posts/${post.id}/`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log('Post updated successfully');
          window.location.reload();
        } else {
          throw new Error('Failed to update post');
        }
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
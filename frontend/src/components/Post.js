import React, { useState } from 'react';
import './styles.css';
import EditPostForm from './EditPostForm';

function Post({ post, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/api/posts/${post.id}/`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Post deleted successfully');
          onDelete(post.id); // Notify parent component of deleted post ID
        } else {
          console.error('Failed to delete post');
        }
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="postBox">
      {isEditing ? (
        <EditPostForm post={post} onCancelEdit={handleCancelEdit} />
      ) : (
        <div className="postContent">
          <h3>{post.author}</h3>
          <p>{post.text}</p>
          <div>
            <div className="buttonContainer">
              <button className="editButton" onClick={handleEdit}>Edit</button>
              <button className="deleteButton" onClick={handleDelete}>Delete</button>
            </div>
            <div className="footerContent">
              <small>Posted: {post.date}</small>
              <small>Likes: {post.likes}</small>
            </div>
            {post.image && <img src={post.image} alt="Post" 
            style={{
              maxWidth: '100%', // Adjust as needed to limit the width
              height: 'auto',   // Maintain aspect ratio
            }} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;

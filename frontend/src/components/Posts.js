import React, { useState, useEffect } from 'react';
import Post from './Post';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the backend when the component mounts
    fetch('http://localhost:8000/api/posts/')
      .then((response) => response.json())
      .then((data) => {
        const reversedPosts = data.reverse();
        setPosts(reversedPosts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleDelete = (postId) => {
    // Remove the deleted post from the posts state
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default Posts;

import React, { useState, useEffect } from 'react';
import Post from './Post';
import NewPostForm from './NewPostForm';

function PostsPage({ author }) {
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

  const handleNewPost = (newPostData) => {
    // Add the new post to the current posts
    setPosts([newPostData, ...posts]);
  };

  const handleEdit = (updatedPostData) => {
    const updatedPosts = posts.map((post) =>
    post.id === updatedPostData.id ? updatedPostData : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="postsPage">
      <NewPostForm author={author} onNewPost={handleNewPost} />
      {posts.map((post) => (
        <Post key={post.id} activeAuthor={author} post={post} onEdit={handleEdit} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default PostsPage;

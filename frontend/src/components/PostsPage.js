import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import NewPostForm from './NewPostForm';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [postToChildren, setPostToChildren] = useState({});
  const author = sessionStorage.getItem('author');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts from the backend when the component mounts
    fetch('http://localhost:8000/api/posts/')
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        assignChildren(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []); // empty dependency array ==> runs only when component mounts, not subject to any state or props changes

  const handleDelete = (postId) => {
    // Remove the deleted post from the posts state
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleNewPost = (newPostData) => {
    // Add the new post to the current posts
    setPosts([newPostData, ...posts]);
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate('../');
  };

  // post_id : [child post_ids]
  const assignChildren = (postsTemp) => {
    const obj = {};
    for (let i=0; i < postsTemp.length; i++) {
      obj[postsTemp[i].id] = postsTemp.filter((post) => parseInt(post.parent) === postsTemp[i].id);
    }
    setPostToChildren(obj);
  };

  return (
    <div className="postsPage">
      <button className="signOutButton" onClick={handleSignOut}>Sign Out</button>
      <NewPostForm type='post' parentId={''} author={author} onNewPost={handleNewPost} />
      {posts.filter((post) => post.parent === '').map((post) => 
        <Post key={post.id} thisPost={post} children={postToChildren[post.id]} postToChildren={postToChildren} activeAuthor={author} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default PostsPage;

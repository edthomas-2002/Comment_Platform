import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './Post';
import NewPostForm from './NewPostForm';
// import Dashboard from './Dashboard';
import SearchBar from './SearchBar';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const [queryRenderPosts, setQueryRenderPosts] = useState([]);
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

  const getParentPost = (post) => {
    const parentId = parseInt(post.parent);
    const parent = posts.filter((p) => p.id === parentId)[0];
    return parent;
  };

  const handleQuery = (posts_arr) => {
    setQueryRenderPosts(posts_arr);
  };

  return (
    <div className="postsPage">
      <SearchBar setIsQuerying={setIsQuerying} onQuery={handleQuery} />
      <button className="signOutButton" onClick={handleSignOut}>Sign Out</button>
      {isQuerying ? (
        <div>
          {queryRenderPosts.map((post) => 
          <div>
            {post.parent ? (
              <Post key={parseInt(post.parent)} thisPost={getParentPost(post)} children={[post]} postToChildren={postToChildren} activeAuthor={author} />
            ) : (
              <Post key={post.id} thisPost={post} children={postToChildren[post.id]} postToChildren={postToChildren} activeAuthor={author} />
            )}
          </div>
        )}
        </div>
      ): (
        <div>
        <NewPostForm type='post' parentId={''} author={author} onNewPost={handleNewPost} />
        {posts.filter((post) => post.parent === '').map((post) => 
          <Post key={post.id} thisPost={post} children={postToChildren[post.id]} postToChildren={postToChildren} activeAuthor={author} onDelete={handleDelete} />
        )}
        </div>
      )}
    </div>
  );
}

export default PostsPage;

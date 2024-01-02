import React, { useState, useEffect } from 'react';
import './styles.css';
import EditPostForm from './EditPostForm';
import NewPostForm from './NewPostForm';

function Post({ thisPost, children, postToChildren, activeAuthor, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [post, setPost] = useState(thisPost);
  const [childPosts, setChildPosts] = useState(children);
  // const [postToChildrenMap, setPostToChildrenMap] = useState(postToChildren);
  const [activeAuthorLiked, setActiveAuthorLiked] = useState(false);

  useEffect(() => {
    // check if liked by activeAuthor when component mounts
    fetch(`http://localhost:8000/api/posts/${post.id}/check-like/?active_author=${activeAuthor}`, {
      method: 'GET',
    },)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Liked') {
          setActiveAuthorLiked(true);
        }
      })
      .catch((error) => {
        console.error('Error checking for liked:', error);
      });
  }, []);

  const handleEdit = () => {
    if (activeAuthor === post.author) {
      setIsEditing(true);
    }
  };

  const completeEdit = (updatedPostData) => {
    setIsEditing(false);
    setPost(updatedPostData);
  }

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (activeAuthor === post.author) {
      fetch(`http://localhost:8000/api/posts/${post.id}/`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            console.log('Post deleted successfully');
            // need to remove from postToChildren
            onDelete(post.id); // Notify parent component of deleted post ID
          } else {
            console.error('Failed to delete post');
          }
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        });
    }
  };

  const handleChildDelete = (postId) => {
    setChildPosts(childPosts.filter((post) => post.id !== postId));
    postToChildren[post.id] = childPosts;
    onDelete(postId);
  };

  const handleLike = () => {
      fetch(`http://localhost:8000/api/posts/${post.id}/like/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // 'Request-Type': 'like',  --> Could simply check for 'Request-Type' in the 
        // PostViewset update functions instead, don't add the like/ to the end of URL
      },
      body: JSON.stringify(
        {'liker': activeAuthor})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post liked successfully:', data);
        setPost(data);
        if (data.message === 'Liked') {
          setActiveAuthorLiked(true);
        }
        else { // Not liked (unliked)
          setActiveAuthorLiked(false);
        }
      })
      .catch((error) => {
        console.error('Error liking post:', error);
      });  
  };
  
  const handleReply = () => {
    setIsReplying(true);
  };

  const completeReply = (reply) => {
    setIsReplying(false);
    setChildPosts(childPosts ? [reply, ...childPosts] : [reply]);
    postToChildren[post.id] = childPosts;
  }

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  return (
    <div className="postBox">
      {isEditing ? (
        <EditPostForm post={post} onCompleteEdit={completeEdit} onCancelEdit={handleCancelEdit} />
      ) : (
        <div className="postContent">
          <h3>{post.author}</h3>
          <p>{post.text}</p>
          <div>
            <div className="buttonContainer">
              {activeAuthor === post.author? (
                <div className="leftButtons">
                  <button className="editButton" onClick={handleEdit}>Edit</button>
                  <button className="deleteButton" onClick={handleDelete}>Delete</button>
                  <button className="replyButton" onClick={handleReply}>Reply</button>
                </div>
              ) : (
                <div>
                  <button className="replyButton" onClick={handleReply}>Reply</button>
                </div>
              )}
              <div className="rightButtons">
                {activeAuthorLiked ? (
                  <button className="likeButtonLiked" onClick={handleLike}>Liked</button>
                ) : (
                  <button className="likeButtonDefault" onClick={handleLike}>Like</button>
                )}
              </div>
            </div>
            <div className="footerContent">
              <small>Posted: {post.date}</small>
              <small id={`likesCount${post.id}`}>Likes: {post.likes}</small>
            </div>
            {post.image && <img src={post.image} alt="Post" 
            style={{
              maxWidth: '100%', // Adjust as needed to limit the width
              height: 'auto',   // Maintain aspect ratio
            }} />}
          </div>
        </div>
      )}
      {isReplying ? (
        <NewPostForm type='reply' parentId={post.id} author={activeAuthor} onNewPost={completeReply} onCancel={handleCancelReply} />
      ) : (
        <div />
      )}
      <div className='childPosts'>
      {childPosts?.map((post) => (
        <Post key={post.id} thisPost={post} children={postToChildren[post.id]} postToChildren={postToChildren} activeAuthor={activeAuthor} onDelete={handleChildDelete} />
      ))}
      </div>
    </div>
  );
}

export default Post;

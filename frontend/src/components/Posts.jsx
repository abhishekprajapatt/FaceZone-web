import React from 'react';
import Post from './Post';
import { useSelector } from 'react-redux';
import OnlineUsers from './OnlineUsers';

const Posts = () => {
  const posts = useSelector((state) => state.post?.posts || []); 
  
  return (
    <div className="">
      <OnlineUsers className="hidden md:block"/>
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p>No posts available.</p> 
      )}
    </div>
  );
};

export default Posts;

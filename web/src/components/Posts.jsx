import React from 'react';
// import Post from './Post';
// import Post from "./Post/Post"
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.post?.posts || []); 
  
  return (
    <div className="my-12">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p>No posts available.</p> 
      )}
    </div>
  );
};

export default Posts;

import React from 'react';
// import Post from './Post';
import Post from './Post';
import { useSelector } from 'react-redux';
import crtPost from '../../assets/createPost.png';

const Posts = () => {
  const posts = useSelector((state) => state.post?.posts || []);
  console.log("video: ", posts)
  return (
    <div className="my-12">
      {/* <StatusSlide /> */}
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <div className="flex flex-col items-center justify-center my-48">
          <img src={crtPost} alt="" className="" />
          <p className="text-center font-bold text-gray-400 text-xl">No Posts Available...!</p>
        </div>
      )}
    </div>
  );
};

export default Posts;

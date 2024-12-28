import React from 'react';
import Posts from './Posts';
import OnlineUser from './OnlineUsers';

const Feed = () => {
  return (
    <div className="">
      <OnlineUser className="md:hidden"/>
      <Posts />
    </div>
  );
};

export default Feed;

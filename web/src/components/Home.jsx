import React from 'react';
import Feed from './Feed';
import { Outlet } from 'react-router-dom';
import RightSidebar from './RightSidebar';
import useGetAllPost from '@/hooks/useGetAllPost';
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers';
import Posts from './Post/Posts';
import StatusSlide from './Status';

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className="flex">
      <div className="flex-grow">
        <Posts />
        <Outlet />
      </div>
      {/* <RightSidebar /> */}
    </div>
  );
};

export default Home;

import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <LeftSidebar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;

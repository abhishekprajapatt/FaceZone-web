import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';
import Navbar from './Navbar/Navbar';

const MainLayout = () => {
  return (
    <div className="flex">
      {/* <Navbar /> */}
      <div>
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default MainLayout;

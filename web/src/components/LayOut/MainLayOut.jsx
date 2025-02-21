import React from 'react'
import TopNavbar from '../Navbar/TopNavbar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const MainLayOut = () => {
  return (
    <div>
        <TopNavbar/>
        <Outlet/>
        <Navbar/>
    </div>
  )
}

export default MainLayOut
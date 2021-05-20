import React from 'react';
import { logoutUser } from '../../../services/auth';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => (
  <div className={"w-full h-screen bg-dark text-white"}>
    <Navbar />
    <div className="mx-auto w-full sm:w-1/2 md:w-1/3 p-5 ">
      
      {children}
    </div>
  </div>
);
export default DashboardLayout;

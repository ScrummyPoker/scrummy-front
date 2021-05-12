import React from 'react';
import { logoutUser } from '../../../services/auth';

const DashboardLayout = ({ children }) => (
  <>
    <button onClick={() => logoutUser()}>logout</button>

    {children}
  </>
);
export default DashboardLayout;
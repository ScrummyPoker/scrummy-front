import React, { useContext } from 'react';
import { logoutUser } from '../../../services/auth';
import DashLayoutContext from './DashLayoutContext';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <DashLayoutContext.Provider value={{
      isLoading,
      setIsLoading
    }}>
    <div className={'w-full h-screen bg-dark text-white'}>
      <Navbar />
      <div className="mx-auto w-full sm:w-1/2 md:w-1/3 p-5 ">
        <div className="grid grid-cols-1 gap-4">{children}</div>
      </div>
    </div>
    </DashLayoutContext.Provider>
  );
};
export default DashboardLayout;

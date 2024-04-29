import React from 'react';
import { Outlet } from 'react-router-dom';
import backgroundImage from '../../assets/background.png'; // Ensure this path is correct

const DefaultLayout = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Optionally, if you have a NavBar component */}
      {/* <NavBar /> */}
      
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;

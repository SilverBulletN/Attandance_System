// import React from "react";
import { Outlet, Link } from "react-router-dom";
import backgroundImage from "../../assets/background.png"; // Ensure this path is correct
import frameImage from "../../assets/frame.png"; // Ensure this path is correct

const DefaultLayout = () => {
  const buttonStyle = {
    width: "70px", // Ensures both buttons are the same width
    height: "30px", // Fixed height for uniformity
    display: "flex",
    justifyContent: "center", // Center the text inside the button
    alignItems: "center",
    backgroundImage: `url(${frameImage})`, // Background image for the button
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: "none",
  };
  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat bg-center "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent p-4 flex justify-end">
        <Link
          to="/"
          style={buttonStyle}
          className="text-white font-bold py-2 px-4 transition duration-150 ease-in-out hover:brightness-125"
        >
          Home
        </Link>
        <Link
          to="/total"
          style={buttonStyle}
          className="text-white font-bold py-2 px-4 transition duration-150 ease-in-out hover:brightness-125"
        >
          Total
        </Link>
        <Link
          to="/list"
          style={buttonStyle}
          className="text-white font-bold py-2 px-4 transition duration-150 ease-in-out hover:brightness-125"
        >
          List
        </Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;

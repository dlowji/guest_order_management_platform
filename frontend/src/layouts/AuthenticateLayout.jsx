// import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

const AuthenticateLayout = ({ heading, subheading }) => {
  return (
    <section className="h-screen mb-10">
      <div className="container px-6 py-12 h-full">
        <div className="flex justify-center items-center flex-wrap h-full text-gray-800">
          <div className="md:w-8/12 lg:w-5/12 mb-12 md:mb-0 ">
            <img
              src="/images/bg.png"
              className="aspect-square h-full"
              alt="Background"
            />
          </div>
          <div className="md:w-8/12 lg:w-6/12 lg:ml-20">
            <h1 className="text-4xl font-bold mb-4 text-center">{heading}</h1>
            <p className="text-gray-500 text-center mb-8">{subheading}</p>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </section>
  );
};

AuthenticateLayout.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default AuthenticateLayout;

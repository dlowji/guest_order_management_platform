import React from "react";

const Button = ({ children }) => {
  return (
    <button className="cursor-pointer p-6 leading-none text-white bg-primaryff rounded-lg font-semibold w-full">
      {children}
    </button>
  );
};

export default Button;

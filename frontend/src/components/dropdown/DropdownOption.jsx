import React from "react";

const DropdownOption = ({ children, onClick }) => {
  return (
    <button
      className="flex items-center justify-center px-5 py-4 cursor-pointer hover:bg-gray-100 w-full border border-b border-b-slate-300 text-center gap-3"
    //   onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default DropdownOption;

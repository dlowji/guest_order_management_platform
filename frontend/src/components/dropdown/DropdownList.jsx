import React from "react";

const DropdownList = ({ children, classNameBody }) => {
  const show = true;
  return (
    <>
      {show && (
        <div
          className={`absolute top-full right-0 bg-white shadow-sm z-10 border border-solid border-gray-300 rounded-[10px] ${classNameBody} w-[200px] overflow-hidden`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default DropdownList;

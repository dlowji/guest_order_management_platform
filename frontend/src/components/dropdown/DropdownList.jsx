// import React from "react";
import PropTypes from "prop-types";
import { useDropdown } from "../../context/useDropdown";
const DropdownList = ({ children, classNameBody }) => {
  const { show } = useDropdown();
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

DropdownList.propTypes = {
  children: PropTypes.node,
  classNameBody: PropTypes.string,
};

export default DropdownList;

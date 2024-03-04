// import React from "react";
import PropTypes from "prop-types";
import { useDropdown } from "../../context/useDropdown";

const DropdownOption = ({ children, onClick }) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <button
      className="flex items-center justify-center px-5 py-4 cursor-pointer hover:bg-gray-100 w-full border border-b border-b-slate-300 text-center gap-3"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
DropdownOption.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
export default DropdownOption;

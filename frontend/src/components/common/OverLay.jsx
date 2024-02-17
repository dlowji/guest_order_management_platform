// import React from "react";
import PropTypes from "prop-types";

const OverLay = ({ isActive = false, onToggle }) => {
  return (
    <button
      className={`fixed inset-0 w-full h-full bg-slate-500 bg-opacity-50 z-20 ${
        isActive ? "opacity-100 visible" : "opacity-0 invisible w-0 h-0"
      } transition-opacity menu-overlay`}
      onClick={onToggle}
    ></button>
  );
};
OverLay.propTypes = {
  isActive: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default OverLay;

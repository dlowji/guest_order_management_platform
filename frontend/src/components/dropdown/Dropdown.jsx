// import React from "react";
import PropTypes from "prop-types";

const Dropdown = ({ children }) => {
  return <div className="relative z-50 inline-block w-full">{children}</div>;
};

Dropdown.propTypes = {
  children: PropTypes.node,
};

export default Dropdown;

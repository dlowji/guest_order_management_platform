// import React from "react";
import PropTypes from "prop-types";

const MenuList = ({ children }) => {
  return <div className="menu-list">{children}</div>;
};

MenuList.propTypes = {
  children: PropTypes.node,
};

export default MenuList;

// import React from "react";
import PropTypes from "prop-types";

const MainContentHeader = ({ title, quantity, children }) => {
  return (
    <div className="main-content-header">
      <h3 className="main-content-title">{title}</h3>
      {quantity && <span className="main-content-quantity">{quantity}</span>}
      {children}
    </div>
  );
};

MainContentHeader.propTypes = {
  title: PropTypes.string,
  quantity: PropTypes.string,
  children: PropTypes.node,
};

export default MainContentHeader;

// import React from "react";
import PropTypes from "prop-types";

const TBody = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

TBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default TBody;

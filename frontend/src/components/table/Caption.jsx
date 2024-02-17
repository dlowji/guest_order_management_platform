// import React from "react";
import PropTypes from "prop-types";

const Caption = ({ className, children }) => {
  return (
    <caption
      className={`${
        className || ""
      } p-5 text-lg font-semibold text-left text-gray-900 bg-white`}
    >
      {children}
    </caption>
  );
};

Caption.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Caption;

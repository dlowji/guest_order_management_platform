// import React from "react";
import PropTypes from "prop-types";

const Label = ({ htmlFor = "", children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="inline-block self-start text-lg capitalize-first font-medium cursor-pointer text-gray7b"
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node,
};

export default Label;

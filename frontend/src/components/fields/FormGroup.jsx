// import React from "react";
import PropTypes from "prop-types";

const FormGroup = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col mb-4 lg:mb-6 gap-y-2 lg:gap-y-3 ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FormGroup;

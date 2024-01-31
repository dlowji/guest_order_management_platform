import React from "react";

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-grayDark font-semibold cursor-pointer" {...props}
    >
      {children}
    </label>
  );
};

export default Label;

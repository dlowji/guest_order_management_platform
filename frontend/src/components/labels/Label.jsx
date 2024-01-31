import React from "react";

const Label = ({ htmlFor = "", children, }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="inline-block self-start text-lg capitalize-first font-medium cursor-pointer text-gray7b"
    >
      {children}
    </label>
  );
};

export default Label;

import React from "react";

const Dropdown = (props) => {
  return (
    <div className="relative z-50 inline-block w-full">{props.children}</div>
  );
};

export default Dropdown;

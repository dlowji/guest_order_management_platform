import React from "react";

const MainContentHeader = ({ title, quantity, children }) => {
  return (
    <div className="main-content-header">
      <h3 className="main-content-title">{title}</h3>
      {quantity && <span className="main-content-quantity">{quantity}</span>}
      {children}
    </div>
  );
};

export default MainContentHeader;

import React from "react";

const CircleLoading = ({ width = 6, height = 6, color = "#fff" }) => {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
  };
  return (
    <div className="follow-the-leader">
      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>
    </div>
  );
};

export default CircleLoading;

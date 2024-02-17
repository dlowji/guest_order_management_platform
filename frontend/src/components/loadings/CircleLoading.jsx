// import React from "react";
import PropTypes from "prop-types";

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

CircleLoading.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default CircleLoading;

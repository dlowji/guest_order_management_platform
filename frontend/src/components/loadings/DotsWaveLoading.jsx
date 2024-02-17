// import React from "react";
import PropTypes from "prop-types";

const DotsWaveLoading = ({ width = 20, height = 20, color }) => {
  return (
    <div className="bounce-loading">
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
        }}
      ></div>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
        }}
      ></div>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
        }}
      ></div>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: color,
        }}
      ></div>
    </div>
  );
};

DotsWaveLoading.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default DotsWaveLoading;

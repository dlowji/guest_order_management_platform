import React from "react";

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

export default DotsWaveLoading;

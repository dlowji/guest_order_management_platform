// import React from 'react';
import PropTypes from "prop-types";
import CircleLoading from "../../components/loadings/CircleLoading";

const LoadingCenter = ({ className = "", color = "#ff7200" }) => {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <CircleLoading color={color}></CircleLoading>
    </div>
  );
};

LoadingCenter.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
};

export default LoadingCenter;

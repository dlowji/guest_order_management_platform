// import React from "react";
import PropTypes from "prop-types";
const Toggle = ({ on, onClick }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" className="sr-only" />
      <div
        onClick={onClick}
        className={`w-11 h-6 bg-gray-200 focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
          on
            ? `after:translate-x-full after:border-white bg-primaryff peer`
            : ""
        }`}
      ></div>
    </label>
  );
};

Toggle.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Toggle;

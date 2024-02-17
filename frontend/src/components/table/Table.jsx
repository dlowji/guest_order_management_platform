// import React from "react";
import PropTypes from "prop-types";

const Table = (props) => {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      {props.children}
    </table>
  );
};

Table.propTypes = {
  children: PropTypes.node,
};

export default Table;

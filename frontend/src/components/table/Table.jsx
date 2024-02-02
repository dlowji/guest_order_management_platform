import React from "react";

const Table = (props) => {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      {props.children}
    </table>
  );
};

export default Table;

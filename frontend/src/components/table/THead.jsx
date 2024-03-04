// import React from "react";
import PropTypes from "prop-types";

const THead = ({ headers, colClassName = "", children, hasAction = true }) => {
  return (
    <thead className="text-sm text-black uppercase bg-gray-100">
      <tr>
        {headers.map((header) => {
          return (
            <th
              key={header.id}
              className={`px-6 py-3 font-bold ${colClassName}`}
            >
              {header.name}
            </th>
          );
        })}
        {hasAction && <th className="px-6 py-3 font-bold">Action</th>}
        {children}
      </tr>
    </thead>
  );
};

THead.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string || PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  colClassName: PropTypes.string,
  children: PropTypes.node,
  hasAction: PropTypes.bool,
};

export default THead;

import PropTypes from "prop-types";

const TableList = ({ children }) => {
  return <div className="table-list">{children}</div>;
};

TableList.propTypes = {
  children: PropTypes.node,
};

export default TableList;

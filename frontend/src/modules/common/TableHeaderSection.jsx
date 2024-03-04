import PropTypes from "prop-types";

const TableHeaderSection = ({ header, totalItems = 0 }) => {
  return (
    <div className="flex items-baseline gap-2 text-slate-500">
      <h2 className="text-2xl">{header}</h2>
      <span className="text-lg">{`(${totalItems})`}</span>
    </div>
  );
};

TableHeaderSection.propTypes = {
  header: PropTypes.string,
  totalItems: PropTypes.number,
};

export default TableHeaderSection;

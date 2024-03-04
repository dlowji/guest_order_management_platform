import PropTypes from "prop-types";

const TableStatistic = ({ title, children, variant }) => {
  return (
    <div className="p-5 bg-dashboardColor rounded-xl border">
      <h3
        className={`font-bold text-xl ${
          variant === "trending" ? "text-primaryff" : "text-slate-600"
        }`}
      >
        {title}
      </h3>
      <div
        className={`mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 max-h-[500px] overflow-y-auto pt-6 border-t border-dashed ${
          variant === "trending" ? "border-primaryff" : "border-slate-600"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

TableStatistic.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  //variant is a string that can be either "trending" or "stockOut"
  variant: PropTypes.string,
};

export default TableStatistic;

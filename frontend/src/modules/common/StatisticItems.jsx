import PropTypes from "prop-types";

const StatisticItems = ({ title, value, image }) => {
  return (
    <div className="bg-dashboardColor rounded-lg shadow-xl p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <img srcSet={`${image} 6x`} alt={title} />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-2xl font-bold text-gray-500 truncate">
              {title}
            </dt>
            <dd>
              <div className="text-lg font-medium text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

StatisticItems.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string || PropTypes.number,
  image: PropTypes.string,
};

export default StatisticItems;

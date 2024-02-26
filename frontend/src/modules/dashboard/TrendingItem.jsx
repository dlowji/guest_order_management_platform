import { formatCurrency } from "../../utils/formatCurrency";
import PropTypes from "prop-types";

const TrendingItem = ({ title, value, image, price = 0 }) => {
  return (
    <div className="flex gap-5">
      <div className="flex-shrink-0">
        <img
          srcSet={`${image} 6x`}
          alt="dish"
          className="w-20 h-20 rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-lg">{title}</h4>
        <div className="flex items-center">
          <h4 className="text-gray-500">Order: </h4>
          <span className="ml-2 text-primaryff">{value}</span>
        </div>
        <div className="flex items-center">
          <h4 className="text-gray-500">Price: </h4>
          <span className="ml-2 text-primaryff">{formatCurrency(price)}</span>
        </div>
      </div>
    </div>
  );
};

TrendingItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default TrendingItem;

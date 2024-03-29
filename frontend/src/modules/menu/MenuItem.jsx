import React, { useMemo } from "react";
import MenuButtonAddToCart from "./MenuButtonAddToCart";
import MenuButtonToggle from "./MenuButtonToggle";
import { formatCurrency } from "../../utils/formatCurrency";
import PropTypes from "prop-types";
import { useAuth } from "../../stores/useAuth";

const MenuItem = ({ id, image, title, price, status, icon }) => {
  const iconClassnames = React.useMemo(() => {
    switch (status.toLowerCase()) {
      case "available":
        return `${icon} !text-green-500`;
      case "best_seller":
        return `${icon} !text-yellow-500`;
      case "must_try":
        return `${icon} !text-red-500`;
      default:
        return icon;
    }
  }, [icon, status]);

  const user = useAuth((state) => state.user);
  const roleName = user.roleName;
  const isEmployee = useMemo(() => {
    return roleName === "Employee" || roleName === "Admin";
  }, [roleName]);

  const reFormatStatus = useMemo(() => {
    if (status.toUpperCase() === "AVAILABLE") {
      return "Available";
    }
    if (status.toUpperCase() === "UN_AVAILABLE") {
      return "Un Available";
    }
    return status;
  }, [status]);

  if (isEmployee && status === "UN_AVAILABLE") {
    return null;
  }

  return (
    <div className="menu-item">
      <div className="menu-item-image">
        <img srcSet={`${image} 2x`} alt="food" />
      </div>
      <div className="menu-item-title">
        <h4>{title}</h4>
      </div>
      <div className="flex flex-col mt-auto items-center gap-[10px]">
        <div className="menu-item-price">
          <h4>{formatCurrency(price)}</h4>
        </div>
        <div className="menu-item-status">
          <span>{reFormatStatus}</span>
          {iconClassnames && <i className={iconClassnames}></i>}
        </div>
        {isEmployee ? (
          <MenuButtonAddToCart
            dishId={id}
            image={image}
            title={title}
            price={price}
          ></MenuButtonAddToCart>
        ) : (
          <MenuButtonToggle
            isAvailable={status === "AVAILABLE"}
            dishId={id}
          ></MenuButtonToggle>
        )}
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.string,
  icon: PropTypes.string,
};

export default MenuItem;

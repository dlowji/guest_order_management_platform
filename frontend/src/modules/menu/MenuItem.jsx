import React, { useMemo } from "react";
import MenuButtonAddToCart from "./MenuButtonAddToCart";
import MenuButtonToggle from "./MenuButtonToggle";
import { formatCurrency } from "../../utils/formatCurrency";

const MenuItem = ({ id, image, title, price, status, icon }) => {
    const isEmployee = true;

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

  const reFormatStatus = useMemo(() => {
    if (status.toUpperCase() === "AVAILABLE") {
      return "Available";
    }
    if (status.toUpperCase() === "UN_AVAILABLE") {
      return "Un Available";
    }
    return status;
  }, [status]);
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

export default MenuItem;

import React from "react";
import { Link } from "react-router-dom";
import formatDateTime from "../../utils/formatDateTime";
import PropTypes from "prop-types";

const OrderItem = ({
  item: { orderId, createdAt, grandTotal, orderStatus },
  active = false,
  onClick,
}) => {
  const statusColor = React.useMemo(() => {
    switch (orderStatus.toUpperCase()) {
      case "CREATED":
        return "created";
      case "IN_PROCESSING":
        return "in-processing";
      case "CANCELED":
        return "canceled";
      default:
        return "completed";
    }
  }, [orderStatus, active]);

  return (
    <Link
      to={`/menu/order/${orderId}`}
      className={`order-item ${active ? "active" : ""} ${statusColor}`}
      onClick={onClick}
    >
      <div className="order-item-top">
        <h3 className="order-item-title">Order: {orderId.slice(-4)}</h3>
        <span className="order-item-time">
          {formatDateTime(createdAt, "HH:mm:ss")}
        </span>
      </div>
      <div className="order-item-bottom">
        <div className="order-item-bottom-left">
          {/* <div className="order-item-table">Table: {tableId}</div> */}
          {/* <div className="order-item-quantity">Quantity: {quantity}</div> */}
        </div>
        <div className="order-item-bottom-right">
          <div className="order-item-price">${grandTotal}</div>
          <div className={`order-item-status`}>{orderStatus}</div>
        </div>
      </div>
    </Link>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

export default OrderItem;

import React from "react";
import PropTypes from "prop-types";

const OrderDetailContext = React.createContext(null);

const OrderDetailProvider = (props) => {
  const [orderDetail, setOrderDetail] = React.useState(null);
  const [orderLineItems, setOrderLineItems] = React.useState([]);
  const [totalAccept, setTotalAccept] = React.useState(0);
  React.useEffect(() => {
    if (orderDetail?._id) {
      setOrderLineItems(orderDetail.lineItems || []);
    }
  }, [orderDetail?._id]);

  const handleAcceptDish = (dishId) => {
    const newOrderLineItems = orderLineItems.map((item) => {
      if (item.dish._id === dishId) {
        return {
          ...item,
          status: "COOKING",
        };
      }
      return item;
    });
    if (totalAccept < orderLineItems.length) {
      setTotalAccept((prev) => prev + 1);
    }
    setOrderLineItems(newOrderLineItems);
  };

  const handleCancelDish = (dishId) => {
    const newOrderLineItems = orderLineItems.map((item) => {
      if (item.dish._id === dishId) {
        return {
          ...item,
          status: "STOCK_OUT",
        };
      }
      return item;
    });
    if (totalAccept < orderLineItems.length) {
      setTotalAccept((prev) => prev + 1);
    }
    setOrderLineItems(newOrderLineItems);
  };

  const handleMarkDoneDish = (dishId) => {
    const newOrderLineItems = orderLineItems.map((item) => {
      console.log(item)
      if (item.dish._id === dishId) {
        return {
          ...item,
          status: "COOKED",
        };
      }
      return item;
    });
    if (totalAccept < orderLineItems.length) {
      setTotalAccept((prev) => prev + 1);
    }
    setOrderLineItems(newOrderLineItems);
  };

  return (
    <OrderDetailContext.Provider
      value={{
        orderDetail,
        setOrderDetail,
        orderLineItems,
        handleAcceptDish,
        handleCancelDish,
        handleMarkDoneDish,
        totalAccept,
      }}
    >
      {props.children}
    </OrderDetailContext.Provider>
  );
};

const useOrderDetail = () => {
  const context = React.useContext(OrderDetailContext);
  if (typeof context === "undefined" || context === null)
    throw new Error("useOrderDetail must be used within OrderDetailProvider");
  return context;
};

OrderDetailProvider.propTypes = {
  children: PropTypes.node,
};

export { useOrderDetail, OrderDetailProvider };

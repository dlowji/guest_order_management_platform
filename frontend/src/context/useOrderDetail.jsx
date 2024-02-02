import React from "react";
import OrderLineItemStatusResponse from "../constants/OrderLineItemStatus";

const OrderDetailContext = React.createContext(null);

const OrderDetailProvider = (props) => {
  const [orderDetail, setOrderDetail] = React.useState(null);
  const [orderLineItems, setOrderLineItems] = React.useState([]);
  const [totalAccept, setTotalAccept] = React.useState(0);

  React.useEffect(() => {
    if (orderDetail?.orderId) {
      setOrderLineItems(orderDetail.orderLineItemResponseList || []);
    }
  }, [orderDetail?.orderId]);

  const handleAcceptDish = (dishId) => {
    const newOrderLineItems = orderLineItems.map((item) => {
      if (item.dishId === dishId) {
        return {
          ...item,
          orderLineItemStatus: OrderLineItemStatusResponse.COOKING,
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
      if (item.dishId === dishId) {
        return {
          ...item,
          orderLineItemStatus: OrderLineItemStatusResponse.STOCK_OUT,
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
      if (item.dishId === dishId) {
        return {
          ...item,
          orderLineItemStatus: OrderLineItemStatusResponse.COOKED,
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

export default { useOrderDetail, OrderDetailProvider };

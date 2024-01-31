import React from "react";
import OrderMain from "../modules/order/OrderMain";
import { Outlet } from "react-router-dom";

const OrderPage = () => {
  return (
    <div className="order">
      <OrderMain></OrderMain>
      <Outlet></Outlet>
    </div>
  );
};

export default OrderPage;

import React from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const orderItems = {
  data: [
    {
      orderStatus: "created",
      createdAt: Date.now(),
      grandTotal: 1000,
      orderId: "111111111111",
    },
    {
      orderStatus: "created",
      createdAt: Date.now(),
      grandTotal: 2000,
      orderId: "222222222222",
    },
    {
      orderStatus: "created",
      createdAt: Date.now(),
      grandTotal: 3300,
      orderId: "333333333333",
    },
  ],
};

const OrderCart = ({ children, onToggle }) => {
  const orderId = "333333333333";

  const totalItems =
    React.useMemo(() => {
      return orderItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0);
    }, [orderItems, orderId]) || 0;

  const totalMoney =
    React.useMemo(() => {
      return orderItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    }, [orderItems, orderId]) || 0;

  return (
    <>
      <button
        className="fixed right-0 bottom-0 min-w-[200px] bg-slate-200 rounded-lg flex items-center justify-center m-3"
        onClick={onToggle}
      >
        <div className="p-5 flex items-center justify-center gap-3">
          <div className="relative">
            <i className="text-2xl text-gray-500 fas fa-shopping-cart w-10 h-10"></i>
            <span className="absolute -top-2 right-0 bg-red-500 rounded-full text-white text-xs font-bold w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <span>
            <strong>{formatCurrency(totalMoney)}</strong>
          </span>
        </div>
      </button>
      {children}
    </>
  );
};

export default OrderCart;

import React from "react";
import { PaypalButton } from "../../components/buttons";
import MenuOrderCalculate from "./MenuOrderCalculate";
import { ORDER_METHODS } from "constants/orderMethods";
import { toast } from "react-toastify";
import {
  CreateOrderActions,
  CreateOrderData,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js/types/components/buttons";

const MenuPayment = ({ orderItems }) => {
  const [orderMethod, setOrderMethod] = React.useState("cash");

  const totalPrice = React.useMemo(() => {
    return orderItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [orderItems]);

  const handleChangeMethod = (methodId) => {
    setOrderMethod(methodId);
  };

  const handleShowUnavailableMethod = () => {
    toast.error(`This method is not available yet`);
  };

  const createOrder = (data, actions) => {
    const purchase_units = orderItems.map((item) => {
      return {
        description: item.note,
        reference_id: item.dishId.toString(),
        amount: {
          value: (item.price * item.quantity).toString(),
          currency_code: "USD",
        },
      };
    });

    return actions.order.create({
      purchase_units,
    });
  };

  const onApprove = async (data, actions) => {
    try {
      if (!actions.order) {
        toast.error("Something went wrong with your order");
        return;
      }

      const order = await actions.order.capture();
      console.log(order);
      toast.success("Your payment has been successfully processed");
    } catch (error) {
      toast.error("Something went wrong with your order");
      console.error(error);
    }
  };

  const onError = () => {
    toast.error("Something went wrong with your order");
  };

  return (
    <div className="menu-order-payment">
      <MenuOrderCalculate></MenuOrderCalculate>
      <div className="menu-order-bottom">
        <div className="menu-order-method">
          {ORDER_METHODS.map((method) => {
            return (
              <button
                className={`menu-order-method-item ${
                  orderMethod === method.id ? "active" : ""
                }`}
                key={method.id}
                onClick={() =>
                  method.isActive
                    ? handleChangeMethod(method.id)
                    : handleShowUnavailableMethod()
                }
              >
                <i className={method.icon}></i>
                <span>{method.name}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-[10px] w-full">
          {orderMethod === "e_wallet" && (
            <PaypalButton
              amount={totalPrice.toString()}
              createOrder={createOrder}
              onError={onError}
              onApprove={onApprove}
            ></PaypalButton>
          )}
        </div>
        <div className="menu-order-btn">
          <button className="menu-order-btn-cancel">Cancel</button>
          <button className="menu-order-btn-checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default MenuPayment;

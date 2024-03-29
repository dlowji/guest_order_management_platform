import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { useOrderState } from "../../stores/useOrderState";

const MenuOrderCalculate = () => {
  const orderedLineItems = useOrderState(
    (state) => state.orderState.orderedLineItems
  );

  const totalPrice = React.useMemo(() => {
    return orderedLineItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [orderedLineItems]);

  return (
    <div className="menu-order-top">
      <div className="menu-order-top-calculate">
        {orderedLineItems.map((item, index) => {
          return (
            <div
              className="menu-order-top-calculate-item"
              key={`${item.dishId}${index}`}
            >
              <h4>
                {item.title} {item.quantity ? `x${item.quantity}` : ``}
              </h4>
              <span>{formatCurrency(item.price)}</span>
            </div>
          );
        })}
      </div>
      {totalPrice ? (
        <div className="menu-order-top-total">
          <h4>Total</h4>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
      ) : null}
    </div>
  );
};

export default MenuOrderCalculate;

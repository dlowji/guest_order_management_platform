// import React from "react";
import OverLay from "../../components/common/OverLay";
import MenuOrder from "../menu/MenuOrder";
import { Link, useOutletContext } from "react-router-dom";
import MenuOrderItem from "../menu/MenuOrderItem";
import { useOrderState } from "../../stores/useOrderState";

const MenuRightContent = () => {
  const {
    id: orderId,
    isActive = false,
    onToggle,
    tableName = "",
  } = useOutletContext();

  const orderedLineItems = useOrderState(
    (state) => state.orderState.orderedLineItems
  );
  console.log(orderedLineItems);
  return (
    <>
      <OverLay isActive={isActive} onToggle={onToggle}></OverLay>
      <div
        className={`menu-right ${
          isActive ? "active" : ""
        } transition-transform `}
      >
        <div className="menu-order">
          {orderId ? (
            <>
              <div className="menu-order-header">
                <div className="menu-order-header-item">
                  <h4>Current Order</h4>
                  <span>{`#${orderId.slice(-4)}`}</span>
                </div>
                <div className="menu-order-header-item">
                  <h4>Table</h4>
                  <span>{tableName}</span>
                </div>
              </div>
              <div className="menu-order-list">
                {orderedLineItems.length === 0 ? (
                  <div className="menu-order-empty">
                    <h3>Order is empty</h3>
                    <p>Please choose dishes to order</p>
                  </div>
                ) : (
                  orderedLineItems.map((item, index) => {
                    return (
                      <MenuOrderItem
                        key={`${item.dishId}${index}`}
                        {...item}
                      ></MenuOrderItem>
                    );
                  })
                )}
              </div>
              <MenuOrder></MenuOrder>
            </>
          ) : (
            <div className="menu-order-empty">
              <h3>Please select a table</h3>
              <p>You must select a table before choosing dishes</p>
              <Link
                to={"/table"}
                className="flex items-center gap-3 max-w-[300px]  self-center"
              >
                <i className="fa fa-arrow-left"></i>
                <span>Choose a table</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuRightContent;

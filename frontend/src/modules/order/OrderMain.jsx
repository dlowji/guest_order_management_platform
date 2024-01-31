import React from "react";
import CategoriesHeader from "../common/CategoriesHeader";
import MainContentHeader from "../common/MainContentHeader";
import orderCategoryItems from "../../constants/CategoriesOrderItems";
import OrderItem from "./OrderItem";
import LoadingCenter from "../common/LoadingCenter";

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
const OrderMain = () => {
  const isFetching = false;
  const [activeOrder, setActiveOrder] = React.useState("#456644");
  return (
    <div className="order-left">
      <CategoriesHeader
        categories={orderCategoryItems}
        className="!mt-[10px]"
      ></CategoriesHeader>
      <MainContentHeader
        title="Current orders"
        quantity="10 orders"
      ></MainContentHeader>
      <div className="order-list">
        {isFetching && <LoadingCenter />}

        {orderItems?.data?.length === 0 && (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-2xl font-semibold text-gray-500">
              No orders available
            </p>
          </div>
        )}

        {orderItems?.data &&
          orderItems.data.map((item, index) => {
            return (
              <OrderItem
                key={index}
                item={item}
                active={activeOrder === item.orderId}
                onClick={() => setActiveOrder(item.orderId)}
              ></OrderItem>
            );
          })}
      </div>
    </div>
  );
};

export default OrderMain;

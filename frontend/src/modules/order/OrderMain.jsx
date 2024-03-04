import React from "react";
import CategoriesHeader from "../common/CategoriesHeader";
import MainContentHeader from "../common/MainContentHeader";
import orderCategoryItems from "../../constants/CategoriesOrderItems";
import OrderItem from "./OrderItem";
import LoadingCenter from "../common/LoadingCenter";
import useQueryString from "../../utils/queryString";
import { useQuery } from "@tanstack/react-query";
import orderApi from "../../api/order";

const OrderMain = () => {
  const [activeOrder, setActiveOrder] = React.useState("#456644");
  const { statusQ: status } = useQueryString();
  const { data: orderList, isFetching } = useQuery({
    queryKey: ["order", status],
    queryFn: () => {
      return orderApi.getOrders(status);
    },
  });
  return (
    <div className="order-left">
      <CategoriesHeader
        categories={orderCategoryItems}
        className="!mt-[10px]"
      ></CategoriesHeader>
      <MainContentHeader
        title="Current orders"
        quantity={`${orderList?.data?.length || 0} orders`}
      ></MainContentHeader>
      <div className="order-list">
        {isFetching && <LoadingCenter />}

        {orderList?.data?.length === 0 && (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-2xl font-semibold text-gray-500">
              No orders available
            </p>
          </div>
        )}

        {orderList?.data &&
          orderList.data.map((item) => {
            return (
              <OrderItem
                key={item._id}
                item={item}
                active={activeOrder === item._id}
                onClick={() => setActiveOrder(item._id)}
              ></OrderItem>
            );
          })}
      </div>
    </div>
  );
};

export default OrderMain;

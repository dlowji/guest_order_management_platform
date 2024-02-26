import { useEffect } from "react";
import MenuLeftContent from "../modules/menu/MenuLeftContent";
import LoadingCenter from "../modules/common/LoadingCenter";
import OrderCart from "../modules/menu/OrderCart";
import { Outlet, useParams } from "react-router-dom";
import { useOrderState } from "../stores/useOrderState";
import useToggleValue from "../hooks/useToggleValue";
import { useQuery } from "@tanstack/react-query";
import orderApi from "../api/order";

const MenuPage = () => {
  const { id: orderId } = useParams();
  const setOrderState = useOrderState((state) => state.setOrderState);
  const { value, handleToggleValue } = useToggleValue(false);
  const {
    isSuccess,
    data: orderDetailResponse,
    isFetching,
  } = useQuery({
    queryKey: ["orderDetail", orderId],
    queryFn: () => {
      return orderApi.getOrderById(orderId);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(orderDetailResponse);
      if (orderDetailResponse?.data?.lineItems !== undefined) {
        const orderedLineItems = [...orderDetailResponse.data.lineItems];
        console.log("lineItems", orderedLineItems);
        if (orderedLineItems.length > 0) {
          const menuItemsOrder = orderedLineItems.map((item) => {
            return {
              orderLineItemId: item.orderLineItemId,
              dishId: item.dishId,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
              note: item.note,
              orderLineItemStatus: item.orderLineItemStatus,
            };
          });
          setOrderState({
            orderId: orderId,
            menuItemsOrder: [...menuItemsOrder],
            method: "POST",
          });
        }
      }
    }
  }, [isSuccess, orderDetailResponse, orderId, setOrderState]);

  return (
    <div className="menu">
      <MenuLeftContent></MenuLeftContent>

      {isFetching && <LoadingCenter />}

      {orderId && (
        <OrderCart onToggle={() => handleToggleValue()}>
          <Outlet
            context={{
              id: orderId,
              tableCode: orderDetailResponse.data.tableCode,
              isActive: value,
              onToggle: () => handleToggleValue(),
            }}
          ></Outlet>
        </OrderCart>
      )}
    </div>
  );
};

export default MenuPage;

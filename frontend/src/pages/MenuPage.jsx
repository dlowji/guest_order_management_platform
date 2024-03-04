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
      if (orderDetailResponse?.data?.lineItems !== undefined) {
        const orderedLineItems = [...orderDetailResponse.data.lineItems];
        if (orderedLineItems.length > 0) {
          const menuItemsOrder = orderedLineItems.map((item) => {
            console.log(item)
            return {
              lineItemId: item._id,
              dishId: item.dish._id,
              title: item.dish.title,
              price: item.price,
              quantity: item.quantity,
              image: item.dish.image,
              note: item.note,
              status: item.status,
            };
          });
          setOrderState({
            orderId: orderId,
            orderedLineItems: [...menuItemsOrder],
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

      {orderId && orderDetailResponse && (
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

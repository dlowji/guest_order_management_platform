import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useOrderDetail from "../../context/useOrderDetail";
import LoadingCenter from "../common/LoadingCenter";
import TopNav from "../common/TopNav";
import KitchenOrderLineItems from "./KitchenOrderLineItems";

const KitchenOrder = () => {
  const { orderId } = useParams();
  const { setOrderDetail } = useOrderDetail();
  const isFetching = false;
  const orderDetail = {
    data: [],
  };

  //   const { data, isFetching } = useQuery({
  //     queryKey: ["order", orderId],
  //     queryFn: () => {
  //       return orderApi.getById(orderId);
  //     },
  //     onSuccess: (data) => {
  //       if (data.code === 200 && data?.data) {
  //         setOrderDetail(data?.data);
  //       }
  //     },
  //   });

  const navigate = useNavigate();

  const handleBackToPreviousPage = () => {
    navigate(-1);
  };

  if (isFetching) {
    return <LoadingCenter className="mt-10"></LoadingCenter>;
  }
  return (
    <>
      <TopNav
        titleMain={`Order ${orderId?.slice(-4)}`}
        onBack={handleBackToPreviousPage}
        onBackToHome={() => navigate("/")}
        subTitle={orderDetail?.data?.tableName || ""}
        canBack={true}
        canBackToHome={false}
      ></TopNav>
      <div className="mt-10">
        <KitchenOrderLineItems
          items={orderDetail?.data?.orderLineItemResponseList || []}
        ></KitchenOrderLineItems>
      </div>
    </>
  );
};

export default KitchenOrder;

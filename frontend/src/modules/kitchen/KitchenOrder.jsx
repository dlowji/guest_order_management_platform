import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useOrderDetail from "../../context/useOrderDetail";
import LoadingCenter from "../common/LoadingCenter";
import TopNav from "../common/TopNav";
import KitchenOrderLineItems from "./KitchenOrderLineItems";
import orderApi from "../../api/orderApi";
import { useQuery } from "@tanstack/react-query";

const KitchenOrder = () => {
  const { orderId } = useParams();
  const { setOrderDetail } = useOrderDetail();

  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      return orderApi.getById(orderId);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      if (data.code === "SUCCESS" && data?.data) {
        setOrderDetail(data?.data);
      }
    }
  }, [data, isSuccess, setOrderDetail]);

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
        subTitle={data?.data?.tableName || ""}
        canBack={true}
        canBackToHome={false}
      ></TopNav>
      <div className="mt-10">
        <KitchenOrderLineItems
          items={data?.data?.orderLineItemResponseList || []}
        ></KitchenOrderLineItems>
      </div>
    </>
  );
};

export default KitchenOrder;

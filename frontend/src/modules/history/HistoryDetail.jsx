import React, { useEffect } from "react";
import calculateDuration from "../../utils/calculateDuration";
import LoadingCenter from "../common/LoadingCenter";
import { useParams } from "react-router-dom";
import OrderReceipt from "../checkout/OrderReceipt";
import { useQuery } from "@tanstack/react-query";
import orderApi from "../../api/order";

const HistoryDetail = () => {
  const { orderId } = useParams();
  const [orderedLineItems, setOrderedLineItems] = React.useState([]);
  const { isError, error, isSuccess, data, isFetching } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderApi.getOrderById(orderId),
  });
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [error, isError]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      if (data.code === "SUCCESS") {
        setOrderedLineItems(data.data?.lineItems || []);
      }
    }
  }, [isSuccess]);

  if (!orderId) {
    return (
      <div className="mx-20 mt-5 flex items-center justify-between gap-10 flex-col">
        <div className="flex flex-col w-full justify-center items-center">
          Order not found
        </div>
      </div>
    );
  }

  const formatDuration = React.useMemo(() => {
    const createdAt = data?.data?.createdAt || "";
    console.log("🚀 ~ formatDuration ~ createdAt:", createdAt);
    const lastProcessing = data?.data?.lastProcessing || "";
    console.log("🚀 ~ formatDuration ~ lastProcessing:", lastProcessing);
    const { days, hours, minutes, seconds } = calculateDuration(
      createdAt,
      lastProcessing
    );
    const formatStr = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    return formatStr;
  }, [data?.data?.createdAt, data?.data?.lastProcessing]);

  return (
    <div className="mx-20 mt-5 flex items-center justify-between gap-10 flex-col">
      <h2 className="text-center font-bold text-4xl">Order Detail</h2>

      <div className="flex flex-col w-full">
        <h4 className="font-bold text-2xl">Order info</h4>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Order ID:</span>
            <span className="text-slate-500">{data?.data?._id.slice(-4)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Status:</span>
            <span className="text-slate-500">{data?.data?.status}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Order date:</span>
            <span className="text-slate-500">
              {new Date(data?.data?.createdAt || "").toUTCString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Duration:</span>
            <span className="text-slate-500">{formatDuration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold">Order By:</span>
            <span className="text-slate-500">
              {data?.data?.user.employee.fullName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h4 className="font-semibold text-2xl">Order line items</h4>
        {isFetching && <LoadingCenter></LoadingCenter>}
        <OrderReceipt
          orderItems={orderedLineItems}
          orderId={orderId}
          discount={data?.data?.discount || 0}
          tax={data?.data?.tax}
        ></OrderReceipt>
      </div>
    </div>
  );
};

export default HistoryDetail;

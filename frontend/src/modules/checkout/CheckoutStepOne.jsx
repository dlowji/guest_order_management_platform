import React, { useEffect } from "react";
import { usePayment } from "../../stores/usePayment";
import Swal from "sweetalert2";
import { usePaymentItems } from "../../context/usePaymentItems";
import { useParams } from "react-router-dom";
import LoadingCenter from "../common/LoadingCenter";
import OrderReceipt from "./OrderReceipt";
import Button from "../../components/buttons/Button";
import { useQuery } from "@tanstack/react-query";
import orderApi from "../../api/order";

const CheckoutStepOne = () => {
  const nextStep = usePayment((state) => state.nextStep);
  const handleMoveToNextStep = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you definitely checked this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        nextStep();
        Swal.fire("Success!", "Please choose the method", "success");
      }
    });
  };

  const {
    setPaymentItems,
    paymentItems: { items },
  } = usePaymentItems();

  const { orderId, step } = useParams();
  const [orderLineItems, setOrderLineItems] = React.useState(items || []);
  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => orderApi.getOrderById(orderId),
  });

  useEffect(() => {
    if (isSuccess) {
      setOrderLineItems(data.data?.lineItems || []);
      setPaymentItems({
        items: data.data?.lineItems || [],
        total: data.data?.grandTotal || 0,
        tableName: data.data?.table.code || "",
      });
    }
  }, [isSuccess, data, setPaymentItems]);

  if (!orderId) {
    return (
      <div className="mx-20 mt-5 flex items-center justify-between gap-10 flex-col">
        <div className="flex flex-col w-full justify-center items-center">
          Order not found
        </div>
      </div>
    );
  }

  if (!step || step !== "step-one") {
    return (
      <div className="mx-20 mt-5 flex items-center justify-between gap-10 flex-col">
        <div className="flex flex-col w-full justify-center items-center">
          Step is not valid
        </div>
      </div>
    );
  }

  return (
    <div className="mx-20 mt-5 flex items-center justify-between gap-10 flex-col">
      <div className="flex flex-col w-full">
        {isFetching && <LoadingCenter></LoadingCenter>}
        <OrderReceipt
          orderItems={orderLineItems}
          orderId={orderId}
          discount={data?.data?.discount || 0}
          tax={data?.data?.tax}
        ></OrderReceipt>
      </div>
      <Button variant="primary" type="button" onClick={handleMoveToNextStep}>
        <div className="flex items-center gap-3">
          <span>Continue to payment</span>
          <i className="fa fa-arrow-right"></i>
        </div>
      </Button>
    </div>
  );
};

export default CheckoutStepOne;

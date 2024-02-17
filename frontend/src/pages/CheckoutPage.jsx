import orderApi from "../api/order";
import { checkoutSteps } from "../constants/CheckoutSteps";
import { PaymentItemsProvider } from "../context/usePaymentItems";
import MultiStep from "../modules/checkout/MultiSteps";
import TopNavCheckout from "../modules/checkout/TopNavCheckout";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { usePayment } from "../stores/usePayment";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

const CheckoutPage = () => {
  const { orderId, step } = useParams();
  const navigate = useNavigate();
  const setPayment = usePayment((state) => state.setPayment);
  const payment = usePayment((state) => state.payment);
  useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      return orderApi.getById(orderId);
    },
    onSuccess: (data) => {
      if (data.code === 200) {
        const orderDetails = data.data;
        if (orderDetails?.orderStatus === "COMPLETED") {
          setPayment({
            orderId: orderId,
            currentStep: checkoutSteps.length - 1,
            totalSteps: checkoutSteps.length,
            paymentMethod: "CASH",
          });
          navigate(`/checkout/${orderId}/success`);
        }
      }
    },
  });

  React.useEffect(() => {
    if (!payment?.currentStep) {
      setPayment({
        orderId: orderId,
        currentStep: 0,
        totalSteps: checkoutSteps.length,
        paymentMethod: "CASH",
      });
      navigate(`/checkout/${orderId}/${checkoutSteps[0].link}`);
      return;
    }

    if (payment.currentStep === payment.totalSteps - 1) {
      navigate(`/checkout/${orderId}/success`);
    }

    if (payment.currentStep === 0) {
      navigate(`/checkout/${orderId}/${checkoutSteps[0].link}`);
    }

    if (
      payment.currentStep > 0 &&
      payment.currentStep < payment.totalSteps - 1
    ) {
      navigate(
        `/checkout/${orderId}/${checkoutSteps[payment.currentStep].link}`
      );
    }
  }, [navigate, orderId, payment.currentStep, payment.totalSteps, setPayment]);

  return (
    <div className="w-full h-screen xl:max-w-[1200px] mx-auto flex flex-col px-10 md:px-5">
      <PaymentItemsProvider>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AUv8rrc_P-EbP2E0mpb49BV7rFt3Usr-vdUZO8VGOnjRehGHBXkSzchr37SYF2GNdQFYSp72jh5QUhzG",
          }}
        >
          {!orderId ? (
            <div className="flex-shrink-0 pt-10">
              <TopNavCheckout></TopNavCheckout>
              <h1 className="text-center text-2xl">
                Order id not valid, Please try again!
              </h1>
            </div>
          ) : (
            <>
              <div className="flex-shrink-0 pt-10">
                <TopNavCheckout></TopNavCheckout>
                {step ? (
                  checkoutSteps.map((stepItem) => {
                    if (stepItem.link === step) {
                      return (
                        <stepItem.component
                          key={stepItem.id}
                        ></stepItem.component>
                      );
                    }
                  })
                ) : (
                  <h2>Something went wrong, Please try again!</h2>
                )}
              </div>
              <div className="mt-auto pb-20">
                <MultiStep></MultiStep>
              </div>
            </>
          )}
        </PayPalScriptProvider>
      </PaymentItemsProvider>
    </div>
  );
};

export default CheckoutPage;

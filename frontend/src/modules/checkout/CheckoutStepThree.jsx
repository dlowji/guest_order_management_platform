import React from "react";
import { usePayment } from "../../stores/usePayment";

const CheckoutStepThree = () => {
  const { paymentMethod } = usePayment((state) => state.payment);

  const nextStep = usePayment((state) => state.nextStep);

  React.useEffect(() => {
    if (paymentMethod === "CASH") {
      nextStep();
      return;
    }
  }, [nextStep, paymentMethod]);

  return (
    <div className="mx-20 mt-5 flex items-center justify-between gap-10 flex-col">
      <div className="flex flex-col w-full"></div>
    </div>
  );
};

export default CheckoutStepThree;

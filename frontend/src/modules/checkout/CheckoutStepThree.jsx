import React from "react";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../../stores/usePayment";

const CheckoutStepThree = (props) => {
  const navigate = useNavigate();
  const { currentStep, totalSteps, orderId, paymentMethod } = usePayment(
    (state) => state.payment
  );

  const nextStep = usePayment((state) => state.nextStep);

  React.useEffect(() => {
    if (paymentMethod === "CASH") {
      nextStep();
      return;
    }
  }, []);

  return (
    <div className="mx-20 mt-5 flex items-center justify-between gap-10 flex-col">
      <div className="flex flex-col w-full"></div>
    </div>
  );
};

export default CheckoutStepThree;

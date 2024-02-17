import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import { usePayment } from "../../stores/usePayment";

const MultiSteps = () => {
  const payment = usePayment((state) => state.payment);

  const percent = React.useMemo(() => {
    return Math.ceil((payment.currentStep / (payment.totalSteps - 1)) * 100);
  }, [payment.currentStep, payment.totalSteps]);

  return (
    <ProgressBar
      percent={percent}
      filledBackground="linear-gradient(to right, #ffc245, #ec7905)"
    >
      {payment.totalSteps > 0 ? (
        Array(payment.totalSteps)
          .fill(0)
          .map((_, index) => {
            return (
              <Step key={index}>
                {({ accomplished, index }) => (
                  <div
                    className={`indexedStep ${
                      accomplished ? "accomplished" : null
                    }`}
                  >
                    {index + 1}
                  </div>
                )}
              </Step>
            );
          })
      ) : (
        <></>
      )}
    </ProgressBar>
  );
};

export default MultiSteps;

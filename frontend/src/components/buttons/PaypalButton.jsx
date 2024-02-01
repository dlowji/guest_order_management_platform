import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { PayPalButtonsComponentOptions } from '@paypal/paypal-js/types';
import { DotsWaveLoading } from "../loadings";

const PaypalButton = ({
  currency = "USD",
  showSpinner = false,
  style,
  amount,
  className,
  createOrder,
  onApprove,
  onError,
}) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const isLoading = isPending && showSpinner;

  React.useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency,
      },
    });
  }, [currency, showSpinner]);
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute left-0 top-0 z-10 w-full h-full flex items-center justify-center">
          <DotsWaveLoading width={15} height={15}></DotsWaveLoading>
        </div>
      )}
      <PayPalButtons
        style={{
          layout: "horizontal",
          tagline: false,
        }}
        disabled={isLoading}
        forceReRender={[amount, currency, style]}
        className={` w-full min-w-[400px] ${className}`}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </div>
  );
};

export default PaypalButton;

import React from "react";
import { usePayment } from "../../stores/usePayment";
import Swal from "sweetalert2";
import usePaymentItems from "../../context/usePaymentItems";
import toast from "react-hot-toast";
import { convertToUSD } from "../../utils/formatCurrency";
import Button from "../../components/buttons/Button";
import PaypalButton from "../../components/buttons/PaypalButton";
import ORDER_METHODS from '../../constants/OrderMethods';

const CheckoutStepTwo = () => {
  const nextStep = usePayment((state) => state.nextStep);
  const paymentMethod = usePayment((state) => state.payment.paymentMethod);
  const currentOrderId = usePayment((state) => state.payment.orderId);

  const setPaymentMethod = usePayment((state) => state.setPaymentMethod);

  //   const { mutate } = useMutation({
  //     mutationFn: () => {
  //       return orderApi.checkoutOrder(currentOrderId);
  //     },
  //     onSuccess: (data) => {
  //       if (data.code === 200) {
  //         nextStep();
  //       } else {
  //         toast.error(data.message);
  //       }
  //     },
  //   });

  const handleCheckoutByCash = () => {
    // mutate();
  };

  const handleMoveToNextStep = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `${
        paymentMethod === "CASH"
          ? "Will you pay by cash?"
          : paymentMethod === "CREDIT_CARD"
          ? "Will you pay by credit card?"
          : "Will you pay by PayPal?"
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (paymentMethod === "CASH") {
          handleCheckoutByCash();
        }
      }
    });
  };

  const {
    paymentItem: { items: orderItems },
  } = usePaymentItems();

  const handleChangeMethod = (methodId) => {
    setPaymentMethod(methodId);
  };

  const handleShowUnavailableMethod = () => {
    toast.error(`This method is not available yet`);
  };

  const createOrder = (data, actions) => {
    const purchase_units = orderItems.map((item) => {
      console.log(convertToUSD(item.price * item.quantity));
      const itemPrice = convertToUSD(item.price * item.quantity);
      return {
        description: item.note,
        reference_id: item.orderLineItemId?.toString(),
        amount: {
          value: itemPrice.toString(),
          currency_code: "USD",
        },
      };
    });
    console.log(purchase_units);

    return actions.order.create({
      purchase_units,
    });
  };

  const onApprove = async (data, actions) => {
    try {
      if (!actions.order) {
        toast.error("Something went wrong with your order");
        return;
      }

      const order = await actions.order.capture();
      console.log(order);
      toast.success("Your payment has been successfully processed");
    } catch (error) {
      toast.error("Something went wrong with your order");
      console.error(error);
    }
  };

  const onError = () => {
    toast.error("Something went wrong with your order");
  };

  const {
    paymentItem: { total },
  } = usePaymentItems();
  const convertAmount = React.useMemo(() => {
    return convertToUSD(total);
  }, [total]);

  return (
    <div className="flex items-center justify-center mt-20 gap-5 flex-col max-w-[500px] mx-auto">
      {ORDER_METHODS.map((method) => {
        return (
          <button
            className={`menu-order-method-item md:min-w-[200px] flex items-center justify-center ${
              paymentMethod === method.id ? "active" : ""
            }`}
            key={method.id}
            onClick={() =>
              method.isActive
                ? handleChangeMethod(method.id)
                : handleShowUnavailableMethod()
            }
          >
            <i className={method.icon}></i>
            <span>{method.name}</span>
          </button>
        );
      })}
      <div className="flex items-center justify-center w-full">
        <Button
          type="button"
          className={`btn btn-primary w-full transition-all duration-300 ease-in-out h-0 ${
            paymentMethod === "CASH"
              ? "opacity-100 visible h-[48px] mt-5"
              : "opacity-0 invisible"
          }`}
          onClick={handleMoveToNextStep}
          variant="primary"
        >
          Next
        </Button>
      </div>
      <div className="w-full">
        <PaypalButton
          amount={convertAmount.toString()}
          createOrder={createOrder}
          onError={onError}
          onApprove={onApprove}
          showSpinner={true}
          className={`${
            paymentMethod === "PAYPAL"
              ? "opacity-100 visible h-[48px] mt-5"
              : "opacity-0 invisible"
          } transition-all duration-300 ease-in-out h-0 md:min-w-[200px] min-w-[100px]`}
        ></PaypalButton>
      </div>
    </div>
  );
};

export default CheckoutStepTwo;

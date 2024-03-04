import { checkoutSteps } from "../../constants/CheckoutSteps";
import React from "react";
import TopNav from "../common/TopNav";
import { usePaymentItems } from "../../context/usePaymentItems";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../../stores/usePayment";

const TopNavCheckout = () => {
  const {
    paymentItems: { tableName = "" },
  } = usePaymentItems();

  const {
    payment: { currentStep, totalSteps },
    prevStep,
    resetStep,
  } = usePayment();

  const title = React.useMemo(() => {
    return checkoutSteps[currentStep].title;
  }, [currentStep]);

  const navigate = useNavigate();

  const handleBackToPreviousStep = () => {
    if (currentStep === 0) {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you definitely want to cancel checkout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          resetStep();
          navigate("/");
        }
      });
    } else {
      prevStep();
    }
  };
  const backToHomePage = () => {
    if (currentStep === totalSteps - 1) {
      resetStep();
      navigate("/");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Are you definitely want to cancel checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        resetStep();
        navigate("/");
      }
    });
  };
  return (
    <TopNav
      canBack={currentStep !== 0}
      onBack={handleBackToPreviousStep}
      onBackToHome={backToHomePage}
      titleMain={title}
      subTitle={tableName}
    ></TopNav>
  );
};

export default TopNavCheckout;

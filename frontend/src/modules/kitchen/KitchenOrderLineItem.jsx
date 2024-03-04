import React from "react";
import useSteps from "../../hooks/useSteps";
import Swal from "sweetalert2";
import { useOrderDetail } from "../../context/useOrderDetail";
import Badge from "../../components/badge/Badge";
import { Step, ProgressBar } from "react-step-progress-bar";
import PropTypes from "prop-types";
const OrderLineItemStatus = [
  {
    id: "UN_COOK",
    name: "Un cook",
    link: "UN_COOK",
  },
  {
    id: "COOKING",
    name: "Cooking",
    link: "COOKING",
  },
  {
    id: "COOKED",
    name: "Cooked",
    link: "COOKED",
  },
];
const KitchenOrderLineItem = ({ item }) => {
  const { currentStep, totalSteps } = useSteps(
    OrderLineItemStatus.length,
    OrderLineItemStatus.findIndex((status) => status.id === item.status) || 0
  );
  const percent = React.useMemo(() => {
    return Math.ceil((currentStep / (totalSteps - 1)) * 100) || 0;
  }, [currentStep, totalSteps]);

  const { handleAcceptDish, handleCancelDish, handleMarkDoneDish } =
    useOrderDetail();
  const hasClick = React.useRef(false);

  const handleAccept = () => {
    if (!hasClick.current) {
      handleAcceptDish(item.dish._id);
      hasClick.current = true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have already clicked on this option!",
      });
    }
  };

  const handleCancel = () => {
    if (!hasClick.current) {
      handleCancelDish(item.dish._id);
      hasClick.current = true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have already clicked on this option!",
      });
    }
  };

  const handleMarkDone = () => {
    if (!hasClick.current) {
      handleMarkDoneDish(item.dish._id);
      hasClick.current = true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have already clicked on this option!",
      });
    }
  };

  const badgeVariant = React.useMemo(() => {
    switch (item.status) {
      case "STOCK_OUT":
        return "dark";
      case "UN_COOK":
        return "secondary";
      case "COOKING":
        return "primary";
      case "COOKED":
        return "success";
      default:
        return "";
    }
  }, [item.status]);

  const badgeContent = React.useMemo(() => {
    switch (item.status) {
      case "STOCK_OUT":
        return "Stock out";
      case "UN_COOK":
        return "Pending";
      case "COOKING":
        return "Cooking";
      case "COOKED":
        return "Cooked";
      default:
        return "";
    }
  }, [item.status]);

  const isNewOrder = React.useMemo(() => {
    return item.status === "UN_COOK";
  }, [item.status]);

  const isInProcessing = React.useMemo(() => {
    return item.status === "COOKING";
  }, [item.status]);

  return (
    <div className="menu-order-item flex-col mb-10">
      <div className="w-full flex gap-3">
        <div className="menu-order-item-image">
          <img srcSet={`${item.dish.image} 4x`} alt="food" />
        </div>
        <div className="menu-order-item-content">
          <div className="menu-order-item-title">
            <h4>{item.dish.title}</h4>
          </div>
          <div className="menu-order-item-note">
            <p>{item.note}</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <div className="flex items-center gap-3">
            <p>{item.quantity}</p>
            <Badge variant={badgeVariant} content={badgeContent}></Badge>
          </div>

          {isNewOrder && (
            <div className="flex items-center gap-3">
              <button
                className="menu-order-item-btn-plus"
                onClick={handleAccept}
              >
                <i className="fas fa-check"></i>
              </button>
              <button
                className="menu-order-item-btn-cancel"
                onClick={handleCancel}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}
          {isInProcessing && (
            <div className="flex items-center gap-3">
              <button
                className="menu-order-item-btn-plus"
                onClick={handleMarkDone}
              >
                <i className="fas fa-check"></i>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">
        <ProgressBar
          percent={percent}
          filledBackground="linear-gradient(to right, #ffc245, #ec7905)"
        >
          {totalSteps > 0 ? (
            Array(totalSteps)
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
      </div>
    </div>
  );
};

KitchenOrderLineItem.propTypes = {
  item: PropTypes.object,
};

export default KitchenOrderLineItem;

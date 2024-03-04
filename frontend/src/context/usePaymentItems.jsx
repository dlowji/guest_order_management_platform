import React from "react";
import PropTypes from "prop-types";

const PaymentItemsContext = React.createContext(null);

const PaymentItemsProvider = (props) => {
  const [paymentItems, setPaymentItems] = React.useState({
    item: [],
    total: 0,
    tableName: "",
  });
  const values = {
    paymentItems,
    setPaymentItems,
  };
  return (
    <PaymentItemsContext.Provider value={values}>
      {props.children}
    </PaymentItemsContext.Provider>
  );
};

const usePaymentItems = () => {
  const context = React.useContext(PaymentItemsContext);
  if (typeof context === "undefined" || context === null)
    throw new Error("usePaymentItems must be used within PaymentItemsProvider");
  return context;
};

PaymentItemsProvider.propTypes = {
  children: PropTypes.node,
};

export { usePaymentItems, PaymentItemsProvider };

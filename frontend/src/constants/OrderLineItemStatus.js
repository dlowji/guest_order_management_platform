export const orderStatus = [
  {
    id: 1,
    name: "Created",
    link: "created",
  },
  {
    id: 2,
    name: "In processing",
    link: "in_processing",
  },
  {
    id: 3,
    name: "Completed",
    link: "completed",
  },
];

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

const OrderLineItemStatusResponse = {
  STOCK_OUT: "STOCK_OUT",
  UN_COOK: "UN_COOK",
  COOKING: "COOKING",
  COOKED: "COOKED",
};

export default { OrderLineItemStatusResponse, OrderLineItemStatus };

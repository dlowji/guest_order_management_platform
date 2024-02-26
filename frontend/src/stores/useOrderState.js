import { create } from "zustand";
import { devtools } from "zustand/middleware";
import formatOrderItems from "../utils/formatOrderItems";

export const useOrderState = create(
  devtools(
    (set, get) => ({
      orderState: {
        orderId: "",
        orderedLineItems: [],
        method: "POST",
      },
      getOrderedLineItems: () => {
        return [...get().orderState.orderedLineItems];
      },
      setOrderState: (orderState) => {
        return set((state) => {
          return {
            orderState: {
              ...state.orderState,
              ...orderState,
            },
          };
        });
      },

      // setOrderedLineItems: (orderedLineItems: IOrderStateItem) => {
      // 	return set((state) => {
      // 		const currentOrderItem = state.orderState.orderedLineItems.find(
      // 			(item) => item.dishId === orderedLineItems.dishId,
      // 		);
      // 		if (currentOrderItem) {
      // 			currentOrderItem.quantity += orderedLineItems.quantity;
      // 			return {
      // 				orderState: {
      // 					...state.orderState,
      // 					orderedLineItems: [...state.orderState.orderedLineItems],
      // 				},
      // 			};
      // 		}
      // 		return {
      // 			orderState: {
      // 				...state.orderState,
      // 				orderedLineItems: [...state.orderState.orderedLineItems, orderedLineItems],
      // 			},
      // 		};
      // 	});
      // },
      addToOrder: (lineItems) => {
        return set((state) => {
          const currentOrders = [...state.orderState.orderedLineItems, lineItems];
          const formattedOrders = formatOrderItems([...currentOrders]);

          return {
            orderState: {
              ...state.orderState,
              orderedLineItems: formattedOrders,
            },
          };
        });
      },
      increment: (dishId, orderLineItemId) => {
        return set((state) => {
          const currentOrderItem = state.orderState.orderedLineItems.find(
            (item) =>
              item.orderLineItemId === orderLineItemId && item.dishId === dishId
          );
          if (currentOrderItem) {
            currentOrderItem.quantity += 1;
            return {
              orderState: {
                ...state.orderState,
                orderedLineItems: [...state.orderState.orderedLineItems],
              },
            };
          }
          return {
            orderState: {
              ...state.orderState,
              orderedLineItems: [...state.orderState.orderedLineItems],
            },
          };
        });
      },
      decrement: (dishId, orderLineItemId) => {
        return set((state) => {
          const currentOrderItem = state.orderState.orderedLineItems.find(
            (item) =>
              item.orderLineItemId === orderLineItemId && item.dishId === dishId
          );
          if (currentOrderItem) {
            if (currentOrderItem.quantity > 1) {
              currentOrderItem.quantity -= 1;
            }
            return {
              orderState: {
                ...state.orderState,
                orderedLineItems: [...state.orderState.orderedLineItems],
              },
            };
          }
          return {
            orderState: {
              ...state.orderState,
              orderedLineItems: [...state.orderState.orderedLineItems],
            },
          };
        });
      },
      updateNote: (dishId, note, orderLineItemId) => {
        return set((state) => {
          const currentOrderItem = state.orderState.orderedLineItems.find(
            (item) =>
              item.dishId === dishId && item.orderLineItemId === orderLineItemId
          );
          if (currentOrderItem) {
            currentOrderItem.note = note;
          }
          return {
            orderState: {
              ...state.orderState,
              orderedLineItems: [...state.orderState.orderedLineItems],
            },
          };
        });
      },
    }),
    {
      name: "Menu Items Order",
    }
  )
);

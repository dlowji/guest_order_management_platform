import { create } from "zustand";
import { devtools } from "zustand/middleware";
import formatOrderItems from "../utils/formatOrderItems";

export const useMenuItems = create(
  devtools(
    (set, get) => ({
      menuOrder: {
        orderId: "",
        menuItemsOrder: [],
        method: "POST",
      },
      getMenuItemsOrder: () => {
        return [...get().menuOrder.menuItemsOrder];
      },
      setMenuOrder: (menuOrder) => {
        return set((state) => {
          return {
            menuOrder: {
              ...state.menuOrder,
              ...menuOrder,
            },
          };
        });
      },

      // setMenuItemsOrder: (menuItemsOrder: IMenuOrderItem) => {
      // 	return set((state) => {
      // 		const currentOrderItem = state.menuOrder.menuItemsOrder.find(
      // 			(item) => item.dishId === menuItemsOrder.dishId,
      // 		);
      // 		if (currentOrderItem) {
      // 			currentOrderItem.quantity += menuItemsOrder.quantity;
      // 			return {
      // 				menuOrder: {
      // 					...state.menuOrder,
      // 					menuItemsOrder: [...state.menuOrder.menuItemsOrder],
      // 				},
      // 			};
      // 		}
      // 		return {
      // 			menuOrder: {
      // 				...state.menuOrder,
      // 				menuItemsOrder: [...state.menuOrder.menuItemsOrder, menuItemsOrder],
      // 			},
      // 		};
      // 	});
      // },
      addToOrder: (menuItems) => {
        return set((state) => {
          const currentOrders = [...state.menuOrder.menuItemsOrder, menuItems];
          const formattedOrders = formatOrderItems([...currentOrders]);

          return {
            menuOrder: {
              ...state.menuOrder,
              menuItemsOrder: formattedOrders,
            },
          };
        });
      },
      increment: (dishId, orderLineItemId) => {
        return set((state) => {
          const currentOrderItem = state.menuOrder.menuItemsOrder.find(
            (item) =>
              item.orderLineItemId === orderLineItemId && item.dishId === dishId
          );
          if (currentOrderItem) {
            currentOrderItem.quantity += 1;
            return {
              menuOrder: {
                ...state.menuOrder,
                menuItemsOrder: [...state.menuOrder.menuItemsOrder],
              },
            };
          }
          return {
            menuOrder: {
              ...state.menuOrder,
              menuItemsOrder: [...state.menuOrder.menuItemsOrder],
            },
          };
        });
      },
      decrement: (dishId, orderLineItemId) => {
        return set((state) => {
          const currentOrderItem = state.menuOrder.menuItemsOrder.find(
            (item) =>
              item.orderLineItemId === orderLineItemId && item.dishId === dishId
          );
          if (currentOrderItem) {
            if (currentOrderItem.quantity > 1) {
              currentOrderItem.quantity -= 1;
            }
            return {
              menuOrder: {
                ...state.menuOrder,
                menuItemsOrder: [...state.menuOrder.menuItemsOrder],
              },
            };
          }
          return {
            menuOrder: {
              ...state.menuOrder,
              menuItemsOrder: [...state.menuOrder.menuItemsOrder],
            },
          };
        });
      },
      updateNote: (dishId, note, orderLineItemId) => {
        return set((state) => {
          const currentOrderItem = state.menuOrder.menuItemsOrder.find(
            (item) =>
              item.dishId === dishId && item.orderLineItemId === orderLineItemId
          );
          if (currentOrderItem) {
            currentOrderItem.note = note;
          }
          return {
            menuOrder: {
              ...state.menuOrder,
              menuItemsOrder: [...state.menuOrder.menuItemsOrder],
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

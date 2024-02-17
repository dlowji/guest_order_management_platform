import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useMenuItems = create(
  devtools(
    (set) => ({
      menuItems: [],
      setMenuItems: (menuItems) =>
        set((state) => {
          return { menuItems: [...state.menuItems, menuItems] };
        }),
    }),
    {
      name: "Menu Items",
    }
  )
);

import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuth = create(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user: user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "Auth store",
    }
  )
);

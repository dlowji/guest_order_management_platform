import React from "react";
import { create } from "zustand";
export const usePayment = create((set) => ({
  payment: {
    orderId: "",
    currentStep: 0,
    totalSteps: 0,
    paymentMethod: "CASH",
  },
  setPayment: (payment) => set({ payment }),
  setPaymentMethod: (paymentMethod) =>
    set((state) => {
      return {
        payment: {
          ...state.payment,
          paymentMethod,
        },
      };
    }),
  nextStep: () =>
    set((state) => {
      const { currentStep } = state.payment;
      const nextStep = currentStep + 1;
      return {
        payment: {
          ...state.payment,
          currentStep: nextStep,
        },
      };
    }),
  prevStep: () =>
    set((state) => {
      const { currentStep } = state.payment;
      const prevStep = currentStep - 1;
      if (prevStep < 0) return state;
      return {
        payment: {
          ...state.payment,
          currentStep: prevStep,
        },
      };
    }),
  resetStep: () => {
    set((state) => {
      return {
        payment: {
          ...state.payment,
          currentStep: 0,
        },
      };
    });
  },
}));

import React from "react";

const useSteps = (totalSteps, step) => {
  const [currentStep, setCurrentStep] = React.useState(step ? step : 0);
  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const resetSteps = () => {
    setCurrentStep(0);
  };

  return {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    resetSteps,
    setCurrentStep,
  };
};

export default useSteps;

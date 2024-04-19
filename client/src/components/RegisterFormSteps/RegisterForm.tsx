"use client";

import { useAppSelector } from "@/lib/hooks";
import { type ReactElement } from "react";
import { selectCurrentStep } from "@/lib/features/register/registerSlice";
import RegisterFormStepFirst from "./RegisterFormStepFirst";
import RegisterFormStepSecond from "./RegisterFormStepSecond";
import RegisterFormStepThird from "./RegisterFormStepThird";
import RegisterFormStepFourth from "./RegisterFormStepFourth";

const RegisterForm = (): ReactElement => {
  const currentStep = useAppSelector(selectCurrentStep);

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <RegisterFormStepFirst />;
      case 2:
        return <RegisterFormStepSecond />;
      case 3:
        return <RegisterFormStepThird />;
      case 4:
        return <RegisterFormStepFourth />;
      default:
        return null;
    }
  };

  return <>{renderForm()}</>;
};

export default RegisterForm;

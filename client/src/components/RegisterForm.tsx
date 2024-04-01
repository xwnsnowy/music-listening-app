"use client";

import { useAppSelector } from "@/lib/hooks";
import {
  RegisterFormStepFirst,
  RegisterFormStepSecond,
  RegisterFormStepThird,
  // RegisterFormStepFourth,
} from "@/components/RegisterFormSteps";
import { type ReactElement } from "react";
import { selectCurrentStep } from "@/lib/features/register/registerSlice";

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
      // case 4:
      //   return <RegisterFormStepFourth />;
      default:
        return null;
    }
  };

  return <>{renderForm()}</>;
};

export default RegisterForm;

import RegisterFormStepFirst from "@/components/RegisterFormStepFirst";
import RegisterFormStepSecond from "@/components/RegisterFormStepSecond";
import RegisterFormStepThird from "@/components/RegisterFormStepThird";
import RegisterFormStepFourth from "@/components/RegisterFormStepFourth";

import type { ReactElement } from "react";

interface Props {
  currentStep: number;
  handleNextStep: () => void;
}

const RegisterForm = ({ currentStep, handleNextStep }: Props): ReactElement => {
  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <RegisterFormStepFirst onNextStep={handleNextStep} />;
      case 2:
        return <RegisterFormStepSecond onNextStep={handleNextStep} />;
      case 3:
        return <RegisterFormStepThird onNextStep={handleNextStep} />;
      case 4:
        return <RegisterFormStepFourth onNextStep={handleNextStep} />;
      default:
        return null;
    }
  };

  return <>{renderForm()}</>;
};

export default RegisterForm;

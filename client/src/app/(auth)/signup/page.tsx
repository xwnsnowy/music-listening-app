"use client";

import RegisterForm from "@/components/RegisterFormSteps/RegisterForm";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  selectCurrentStep,
  setCurrentStep,
} from "@/lib/features/register/registerSlice";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const Register = () => {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (currentStep === 2) {
      setProgress(50);
    }
    if (currentStep === 3) {
      setProgress(75);
    }
    if (currentStep === 4) {
      setProgress(100);
    }
  }, [currentStep]);

  return (
    <div
      className={`max-w-[400px] min-h-[826px] w-full rounded-lg px-3 bg-bgBase flex flex-col items-center ${
        currentStep === 1 ? "justify-center" : "justify-start"
      } py-8 gap-4  font-circular`}
    >
      {currentStep === 1 && (
        <h1 className="text-primaryColor text-5xl text-center font-black py-10 cursor-default select-none">
          Sign up to start listening
        </h1>
      )}
      {currentStep !== 1 && (
        <ProgressBar
          completed={progress}
          className="w-full"
          height="2px"
          isLabelVisible={false}
          bgColor="#1ed760"
        />
      )}

      {currentStep === 2 && (
        <>
          <div className="flex flex-col w-[312px] mb-3 relative">
            <ChevronLeft
              className="absolute text-secondaryColor left-[-36px] top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primaryColor transition hover:scale-105"
              size={29}
            />
            <span className="text-secondaryColor">Step 2 of 4</span>
            <span className="text-primaryColor">Create a password</span>
          </div>
        </>
      )}
      {currentStep === 3 && (
        <>
          <div className="flex flex-col w-[312px] mb-3 relative">
            <ChevronLeft
              className="absolute text-secondaryColor left-[-36px] top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primaryColor transition hover:scale-105"
              size={29}
            />
            <span className="text-secondaryColor">Step 3 of 4</span>
            <span className="text-primaryColor">Tell us about yourself</span>
          </div>
        </>
      )}
      {currentStep === 4 && (
        <>
          <div className="flex flex-col w-[312px] mb-3 relative">
            <ChevronLeft
              className="absolute text-secondaryColor left-[-36px] top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primaryColor transition hover:scale-105"
              size={29}
            />
            <span className="text-secondaryColor">Step 4 of 4</span>
            <span className="text-primaryColor">Terms & Conditions</span>
          </div>
        </>
      )}
      <RegisterForm />
      {currentStep === 1 && (
        <>
          {/* Signup Social Media */}
          <SocialMedia text="Sign up" />

          <Link
            href="forgot-password"
            className="font-light text-primaryColor underline mt-8"
          >
            Forgot your password?
          </Link>

          <hr className="my-8 border border-tintedBase w-9/12" />

          <div className="text-primaryColor py-8 font-light gap-1 flex">
            <span className="text-secondaryColor">
              Already have an account?
            </span>
            <Link href="/login" className="underline">
              Log in here.
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;

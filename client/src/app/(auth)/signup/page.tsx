// Register.tsx
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import SocialMedia from "@/components/SocialMedia";
import Link from "next/link";

const Register = () => {
  return (
    <div className="max-w-[400px] w-full rounded-lg bg-bgBase flex flex-col items-center justify-center py-8 gap-4  font-circular">
      {/* Title Login */}
      <h1 className="text-primaryColor text-5xl text-center font-black py-10 cursor-default select-none">
        Sign up to start listening
      </h1>

      <RegisterForm />

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
        <span className="text-secondaryColor">Don&apos;t have an account?</span>
        <Link href="/signup" className="underline">
          Sign up for Spotify
        </Link>
      </div>
    </div>
  );
};

export default Register;

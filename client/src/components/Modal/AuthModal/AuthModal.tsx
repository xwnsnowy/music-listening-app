"use client";

import useAuthModal from "@/hooks/useAuthModal";
import Modal from "../Modal";
import { isAccessTokenValid } from "@/utils/Helpers";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import LoginForm from "@/components/Login/LoginForm";
import Link from "next/link";

const AuthModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  const onChange = () => {
    console.log("Close");
    onClose();
  };

  useEffect(() => {
    if (isAccessTokenValid()) {
      router.refresh();
      onClose();
    }
  }, [isAccessTokenValid, router, onClose]);

  return (
    <Modal isOpen={isOpen} onChange={onChange}>
      <div className="max-w-[734px] w-full rounded-lg  flex flex-col items-center justify-center h-full font-circular">
        {/* Title Login */}
        <h1 className="text-primaryColor text-5xl font-black py-6 cursor-default select-none">
          Log in to Spotify
        </h1>
        {/* Login Social Media */}
        <SocialMedia text="Continue" />

        <hr className="my-4 border border-tintedBase w-9/12" />

        <LoginForm />

        <Link
          href="forgot-password"
          className="font-light text-primaryColor underline mt-8"
        ></Link>

        <hr className="my-4 border border-tintedBase w-9/12" />

        <div className="text-primaryColor py-4 font-light gap-1 flex">
          <span className="text-secondaryColor">
            Don&apos;t have an account?
          </span>
          <Link href="/signup" className="underline">
            Sign up for Spotify
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;

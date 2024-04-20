"use client";

import useAuthModal from "@/hooks/useAuthModal";
import Modal from "../Modal";
import { isAccessTokenValid } from "@/utils/Helpers";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  useEffect(() => {
    if (isAccessTokenValid()) {
      router.refresh();
      onClose();
    }
  }, [isAccessTokenValid, router, onClose]);

  return (
    <Modal
      title="Welcome Back"
      description="Authenticate yourself using the following providers"
      isOpen={isOpen}
      onChange={onChange}
    >
      Auth Modal Children over here
    </Modal>
  );
};

export default AuthModal;

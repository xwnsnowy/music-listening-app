"use client";

import useAuthModal from "@/hooks/useAuthModal";
import Modal from "../Modal";

const AuthModal = () => {
  const { onClose, isOpen } = useAuthModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // useEffect(() => {
  //   if(session){
  //     Router.refresh();
  //     onClose();
  //   }
  // },[sesion, router, onClose])

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

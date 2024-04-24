import { toast, ToastContent, ToastOptions, Id, Bounce } from "react-toastify";

export const useToast = () => {
  const defaultToastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  };

  type ToastType = "success" | "error" | "info" | "warning" | "default";

  const showToast = (
    type: ToastType,
    content: ToastContent,
    options: Partial<ToastOptions> = {}
  ): Id => {
    const optionsToApply = { ...defaultToastOptions, ...options };

    switch (type) {
      case "success":
        return toast.success(content, optionsToApply);
      case "error":
        return toast.error(content, optionsToApply);
      case "info":
        return toast.info(content, optionsToApply);
      case "warning":
        return toast.warn(content, optionsToApply);
      case "default":
        return toast(content, optionsToApply);
      default:
        return toast(content, optionsToApply);
    }
  };

  return { showToast };
};

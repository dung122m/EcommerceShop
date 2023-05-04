import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastMessage() {
  useEffect(() => {
    // lắng nghe sự kiện toast mới
    const unsubscribe = toast.onChange((toast) => {
      if (toast.isVisible) {
        // hiển thị toast mới
        toast.toastId = toast[type](toast.message, toast.options);
      } else {
        // ẩn toast cũ
        toast.hide();
      }
    });

    // hủy đăng ký lắng nghe khi component bị hủy
    return () => unsubscribe();
  }, []);

  return <ToastContainer />;
}

export default ToastMessage;

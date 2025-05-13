import toast from "react-hot-toast";

export function notifySuccess(message: string) {
  toast.success(message, { duration: 3000 });
}

export function notifyError(message: string) {
  toast.error(message, { duration: 3000 });
}

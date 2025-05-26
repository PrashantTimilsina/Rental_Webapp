import { toast } from "react-toastify";

export default function SuccessMsg(msg) {
  toast.success(msg, { autoClose: 1500 });
}

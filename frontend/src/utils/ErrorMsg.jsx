import { toast } from "react-toastify";

export default function ErrorMsg(msg) {
  toast.error(msg, { autoClose: 1500 });
}

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import SuccessMsg from "../utils/SuccessMsg";
import ErrorMsg from "../utils/ErrorMsg";
import { useState } from "react";

const baseUrl = import.meta.env.VITE_BASE_URL;

function ResetPassword() {
  const { token } = useParams();
  const [btnText, setBtnText] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  async function handleLogOut() {
    const res = await axios.get(`${baseUrl}/user/logout`, {
      withCredentials: true,
    });
  }
  const onReset = async (data) => {
    try {
      setBtnText(true);
      const res = await axios.post(
        `${baseUrl}/user/resetpassword/${token}`,
        data
      );
      const detail = res.data;
      SuccessMsg(detail?.message + " " + "Please login again");
      handleLogOut();
      navigate("/");
    } catch (error) {
      ErrorMsg(error?.response?.data?.message);
    } finally {
      setBtnText(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-6">
      <div className="max-w-lg w-full bg-white p-12 rounded-3xl shadow-2xl animate-fadeIn">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-900">
          Reset Your Password
        </h2>
        <form onSubmit={handleSubmit(onReset)} className="space-y-6">
          <input
            type="password"
            placeholder="New Password"
            name="newPassword"
            className="w-full px-6 py-4 rounded-2xl border border-gray-400 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
            {...register("newPassword", { required: true })}
          />
          {errors.newPassword && (
            <span className="text-red-600 text-lg block">
              This field is required
            </span>
          )}
          <input
            type="password"
            placeholder="Confirm New Password"
            name="confirmNewPassword"
            className="w-full px-6 py-4 rounded-2xl border border-gray-400 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
            {...register("confirmNewPassword", { required: true })}
          />
          {errors.confirmNewPassword && (
            <span className="text-red-600 text-lg block">
              This field is required
            </span>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white text-xl py-4 rounded-2xl hover:bg-blue-700 transition-all cursor-pointer"
          >
            {btnText ? "Loading.." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

import { useState } from "react";
import { useData } from "../context/Context";
import { useForm } from "react-hook-form";
import ErrorMsg from "../utils/ErrorMsg";
import SuccessMsg from "../utils/SuccessMsg";
import axios from "axios";
import { useNavigate } from "react-router";
const baseUrl = import.meta.env.VITE_BASE_URL;
function Profile() {
  const { profileData, setIsLoggedIn } = useData();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [btnText, setBtnText] = useState(false);
  const onSubmit = async (data) => {
    try {
      setBtnText(true);
      const res = await axios.post(`${baseUrl}/user/changepassword`, data, {
        withCredentials: true,
      });
      const detail = res.data;
      // console.log(detail);
      SuccessMsg(detail?.message);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      ErrorMsg(error?.response?.data?.message);
      console.log(error);
    } finally {
      setBtnText(false);
    }
  };
  const onReset = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/user/forgotpassword`, data);
      const detail = res.data;
      SuccessMsg(detail?.message);
    } catch (error) {
      ErrorMsg(error?.response?.data?.message);
    }
  };

  if (!profileData) return <p className="text-center mt-40">Loading...</p>;

  return (
    <div className="flex justify-center px-4 mt-40 items-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg"
            alt="profile"
            className="w-28 h-28 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold mb-1">
            Name: {profileData?.user?.name}
          </h2>
          <p className="text-gray-600 mb-4 text-xl">
            Email: {profileData?.user?.email}
          </p>
          <p className="text-gray-600 mb-4 text-xl">Password: **********</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                setShowChangePassword(true);
                setShowResetPassword(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Change Password
            </button>
            <button
              onClick={() => {
                setShowResetPassword(true);
                setShowChangePassword(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </div>

        {/* Change Password Section (React Hook Form should handle state externally) */}
        {showChangePassword && (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              className="w-full border rounded p-2"
              {...register("currentPassword", { required: true })}
            />
            {errors.currentPassword && (
              <span className="text-red-500 ">Please fill this field</span>
            )}
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full border rounded p-2"
              {...register("newPassword", { required: true })}
            />
            {errors.newPassword && (
              <span className="text-red-500 ">Please fill this field</span>
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              className="w-full border rounded p-2"
              {...register("confirmNewPassword", { required: true })}
            />
            {errors.confirmNewPassword && (
              <span className="text-red-500 ">Please fill this field</span>
            )}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
            >
              {btnText ? "Loading..." : "Submit Change"}
            </button>
          </form>
        )}

        {/* Reset Password Section (React Hook Form should handle state externally) */}
        {showResetPassword && (
          <form
            className="mt-6 space-y-4 flex justify-center items-center"
            onSubmit={handleSubmit(onReset)}
          >
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded cursor-pointer "
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;

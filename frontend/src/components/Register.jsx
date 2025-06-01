import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/Context";

import ErrorMsg from "../utils/ErrorMsg";
import SuccessMsg from "../utils/SuccessMsg";
import { useState } from "react";
import { useEffect } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;
function Register() {
  const [text, setText] = useState(false);
  const { setIsLoggedIn } = useData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const onSubmit = async (data) => {
    try {
      setText(true);
      const res = await axios.post(`${baseUrl}/user/signup`, data, {
        withCredentials: true,
      });
      const result = res?.data;
      if (result?.token) {
        setIsLoggedIn(true);
        SuccessMsg("🎉Account created successfully!");
        navigate("/");
      }
      console.log(result);
    } catch (error) {
      ErrorMsg(error?.response?.data?.message);
    } finally {
      setText(false);
    }
  };
  return (
    <div className="relative min-h-screen bg-gray-900 text-2xl">
      {/* Background Image */}
      <img
        src="./house.jpg"
        alt="Background"
        className="absolute inset-0 object-cover w-full h-full opacity-50"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Register Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Create Your Account 🏡
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 py-1 text-xl">Name is required.</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 py-1 text-xl">Email is required.</p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 py-1 text-xl">
                  Password is required.
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Repeat your password"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 py-1 text-xl">
                  Please retype your password
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg transition duration-300 cursor-pointer"
            >
              {text ? "⏳" : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-xl text-gray-600 ">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

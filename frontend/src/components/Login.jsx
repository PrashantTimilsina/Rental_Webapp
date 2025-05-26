import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useData } from "../context/Context";
import SuccessMsg from "../utils/SuccessMsg";
import ErrorMsg from "../utils/ErrorMsg";
const baseUrl = import.meta.env.VITE_BASE_URL;
function Login() {
  const { setIsLoggedIn } = useData();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/user/login`, data, {
        withCredentials: true,
      });
      const detail = res?.data;
      if (detail?.token) {
        navigate("/home");
        SuccessMsg(detail?.message);
        setIsLoggedIn(true);
      }
      console.log(detail);
    } catch (error) {
      ErrorMsg(error?.response?.data?.message);
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

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl p-10">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Welcome Back 👋
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
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
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="text-red-500 py-1 text-xl">
                  Password is required.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg transition duration-300 cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-xl text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

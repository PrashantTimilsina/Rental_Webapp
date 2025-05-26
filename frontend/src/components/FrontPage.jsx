import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useData } from "../context/Context";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
function FrontPage() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useData();
  useEffect(() => {
    async function checkAuth() {
      const res = await axios.get(`${baseUrl}/user/checkAuth`, {
        withCredentials: true,
      });
      const data = res?.data;
      if (data?.cookies) {
        navigate("/home");
        setIsLoggedIn(true);
      }
      console.log(data);
    }
    checkAuth();
  }, []);
  return (
    <div className="relative h-screen overflow-hidden text-[#F9FAFB] ">
      <img
        src="./house.jpg"
        alt="House"
        className="w-full h-full object-cover opacity-90 "
      />
      <div className="absolute inset-0 flex items-center justify-center px-4 flex-col mt-32">
        <h1 className=" text-3xl sm:text-4xl md:text-5xl  text-center font-bold text-white">
          <Typewriter
            options={{
              strings: [
                "Welcome to Rental Website",
                "Find Your Dream Home Today",
              ],
              autoStart: true,
              loop: true,
              delay: 80,
            }}
          />
        </h1>
        <div className="flex text-4xl gap-7 mt-24">
          <Link to="/login">
            <h1 className="btn">Login</h1>
          </Link>
          <Link to="/register">
            <h1 className="btn">Register</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;

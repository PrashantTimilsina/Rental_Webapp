import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useData } from "../context/Context";
import axios from "axios";
import SuccessMsg from "../utils/SuccessMsg";
import ErrorMsg from "../utils/ErrorMsg";
const baseUrl = import.meta.env.VITE_BASE_URL;
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const {
    setIsLoggedIn,
    isLoggedIn,
    fetchProfile,
    profileData,
    cart,
    getCart,
  } = useData();
  function toggleNav() {
    setIsOpen((isOpen) => !isOpen);
  }
  useEffect(() => {
    getCart();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    async function checkAuth() {
      const res = await axios.get(`${baseUrl}/user/checkAuth`, {
        withCredentials: true,
      });
      const data = res?.data;

      setIsLoggedIn(true);
      fetchProfile();

      console.log(data);
    }
    checkAuth();
  }, [isLoggedIn]);
  async function handleLogOut() {
    try {
      const res = await axios.get(`${baseUrl}/user/logout`, {
        withCredentials: true,
      });
      SuccessMsg("Logout successful");
      setIsLoggedIn(false);
    } catch (err) {
      ErrorMsg("Server Error! Please try again");
    }
  }
  function handleCart() {
    if (!isLoggedIn) {
      ErrorMsg("Please login to access this section");
    }
  }
  const navItems = (
    <>
      <NavLink to="/" className="touch">
        <h2>Home</h2>
      </NavLink>

      {isLoggedIn ? (
        <NavLink to="/cart" className="touch">
          <h2 className="relative ">
            {cart.length > 0 && (
              <span className="absolute flex h-6 w-6 items-center justify-center rounded-full bg-black text-[1.1rem] sm:-right-4 sm:bottom-4 text-white sm:left-[53px] left-24">
                {cart.length}
              </span>
            )}
            Wishlist
          </h2>
        </NavLink>
      ) : (
        <button onClick={handleCart} className="flex justify-start touch">
          <h2>Wishlist</h2>
        </button>
      )}
      <NavLink to="/filter" className="touch">
        <h2>Filter</h2>
      </NavLink>

      {isLoggedIn ? (
        <button
          onClick={handleLogOut}
          className="cursor-pointer flex justify-start touch"
        >
          <h2>Logout</h2>
        </button>
      ) : (
        <NavLink to="/login">
          <h2>Login</h2>
        </NavLink>
      )}

      <NavLink to={isLoggedIn ? "/profile" : "/register"} className="touch">
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <img
              src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid"
              className="object-cover h-10 rounded-3xl"
            />
            <h2>{profileData?.user?.name}</h2>
          </div>
        ) : (
          <h2>Register</h2>
        )}
      </NavLink>
    </>
  );
  return (
    <>
      <div
        className={`fixed flex justify-between items-center text-2xl  w-full top-0  sm:h-24 h-16 p-3  font-semibold z-50 ${
          sticky ? "bg-cyan-100" : "bg-[#BFC3DD]"
        }`}
      >
        <div className="sm:w-[9%] w-1/2">
          <img
            src="https://t3.ftcdn.net/jpg/01/79/49/56/360_F_179495677_LMiOo97wzUMwkOcVaow1sgf39iYyMTTX.jpg"
            className="object-cover sm:h-24 h-16"
          />
        </div>

        <div className="flex justify-between items-center gap-12 mr-5 max-sm:hidden">
          {navItems}
        </div>
        {isOpen ? (
          <IoClose onClick={toggleNav} className="text-3xl mr-6" />
        ) : (
          <GiHamburgerMenu
            className={`${isOpen ? "" : "sm:hidden block mr-6"}`}
            onClick={toggleNav}
          />
        )}
      </div>
      <div
        className={`h-full bg-blue-200 z-50 w-1/2 fixed top-0 flex flex-col ${
          isOpen
            ? "translate-x-0 duration-150"
            : "-translate-x-full duration-100"
        }`}
      >
        <div
          className="mt-28 text-2xl gap-10 ml-14 flex flex-col "
          onClick={toggleNav}
        >
          {navItems}
        </div>
      </div>
    </>
  );
}

export default Navbar;

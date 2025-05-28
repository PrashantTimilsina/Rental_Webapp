import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleNav() {
    setIsOpen((isOpen) => !isOpen);
  }
  const navItems = (
    <>
      <Link to="/">
        <h2>Home</h2>
      </Link>

      <Link to="/">
        <h2>Favorites</h2>
      </Link>

      <Link to="/login">
        <h2>Login</h2>
      </Link>

      <Link to="/register">
        <h2>Register</h2>
      </Link>
    </>
  );
  return (
    <>
      <div className="fixed flex justify-between items-center text-2xl  w-full top-0  h-24 p-3 bg-[#BFC3DD] font-semibold z-50">
        <div className="sm:w-[9%] w-1/2">
          <img
            src="https://t3.ftcdn.net/jpg/01/79/49/56/360_F_179495677_LMiOo97wzUMwkOcVaow1sgf39iYyMTTX.jpg"
            className="object-cover h-24"
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

import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  function toggleNav() {
    setIsOpen((isOpen) => !isOpen);
  }
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
      <div
        className={`fixed flex justify-between items-center text-2xl  w-full top-0  sm:h-24 h-16 p-3  font-semibold z-50 ${
          sticky ? "bg-cyan-100" : "bg-[#BFC3DD]"
        }`}
      >
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

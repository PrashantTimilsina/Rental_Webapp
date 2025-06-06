import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useData } from "../context/Context";

function Footer() {
  const { isLoading } = useData();
  if (isLoading) return;
  return (
    <footer className="bg-gray-900 text-white mt-20 text-xl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">RENTAL</h2>
            <p className="text-gray-400">Providing seamless service</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white">
                  WishList
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">POKHARA</p>
            <p className="text-gray-400">
              Email: prashanttimilsina16@gmail.com
            </p>
            <p className="text-gray-400">Phone: +977 9829140900</p>
          </div>

          {/* Social Media */}
          <div className="text-2xl">
            <h3 className=" font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
                to="https://www.facebook.com/prashant.timilsina.752"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebookF />
              </Link>

              <Link
                to="https://www.linkedin.com/in/prashant-timilsina/"
                className="text-gray-400 hover:text-white"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-6">
          &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

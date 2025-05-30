import axios from "axios";
import { createContext, useContext, useState } from "react";
import SuccessMsg from "../utils/SuccessMsg";
import ErrorMsg from "../utils/ErrorMsg";
const baseUrl = import.meta.env.VITE_BASE_URL;
const UserContext = createContext();
function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rentalData, setRentalData] = useState([]);
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [btnText, setBtnText] = useState(false);
  async function fetchRentalData() {
    setIsLoading(true);
    const res = await axios.get(`${baseUrl}/rental`);
    const data = res?.data;

    setRentalData(data?.rentals);
    setIsLoading(false);
  }
  async function fetchDescription(id) {
    setIsLoading(true);
    const res = await axios.get(`${baseUrl}/rental/${id}`);
    const data = res.data;

    setDescription(data?.rental);
    setIsLoading(false);
  }
  async function fetchAddToCart(rentalId) {
    try {
      setIsLoading(true);
      const res = await axios.post(`${baseUrl}/wishlist/${rentalId}`, null, {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data);
      SuccessMsg(data?.message);
    } catch (error) {
      ErrorMsg("Please log in to add to wishlist");
    } finally {
      setIsLoading(false);
    }
  }
  async function getCart() {
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseUrl}/wishlist`, {
        withCredentials: true,
      });
      const data = res?.data?.wishList;
      console.log(data);
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        rentalData,
        setRentalData,
        fetchRentalData,
        fetchDescription,
        description,
        setDescription,
        setIsLoading,
        isLoading,
        cart,
        setCart,
        getCart,
        fetchAddToCart,
        btnText,
        setBtnText,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
function useData() {
  const context = useContext(UserContext);
  return context;
}
export { UserProvider, useData };

import axios from "axios";
import { createContext, useContext, useState } from "react";
const baseUrl = import.meta.env.VITE_BASE_URL;
const UserContext = createContext();
function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rentalData, setRentalData] = useState([]);
  const [description, setDescription] = useState(null);
  async function fetchRentalData() {
    const res = await axios.get(`${baseUrl}/rental`);
    const data = res?.data;

    setRentalData(data?.rentals);
  }
  async function fetchDescription(id) {
    const res = await axios.get(`${baseUrl}/rental/${id}`);
    const data = res.data;
    console.log(data);
    setDescription(data?.rental);
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

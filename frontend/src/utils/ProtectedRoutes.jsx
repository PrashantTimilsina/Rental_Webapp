import { Outlet, Navigate } from "react-router-dom";
import { useData } from "../context/Context";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminChatBox from "../components/AdminChatBox";
const baseUrl = import.meta.env.VITE_BASE_URL;
const ProtectedRoutes = () => {
  const { isLoggedIn, setIsLoggedIn } = useData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${baseUrl}/user/checkauth`, {
          withCredentials: true,
        });
        if (res.data.cookies) setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [setIsLoggedIn]);

  if (loading) return null;

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;

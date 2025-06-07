import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import { useData } from "./context/Context";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import Home from "./Home";
import Description from "./components/Description";

import Cart from "./components/Cart";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import ChatBox from "./components/ChatBox";
import AdminChatBox from "./components/AdminChatBox";
import Filter from "./components/Filter";
import Payment from "./components/payment/Payment";
import Success from "./components/payment/Success";
import Failure from "./components/payment/Failure";

const App = () => {
  const { profileData } = useData();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="/admin"
            element={
              profileData?.user?.role === "admin" ? <AdminChatBox /> : null
            }
          />
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/description/:id" element={<Description />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<ChatBox />} />
            <Route path="/admin" element={<AdminChatBox />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/success/:id" element={<Success />} />
            <Route path="/failure" element={<Failure />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer style={{ fontSize: "16px" }} />
    </BrowserRouter>
  );
};

export default App;

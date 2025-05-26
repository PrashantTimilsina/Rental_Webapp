import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import FrontPage from "./components/FrontPage";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import { UserProvider } from "./context/Context";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </UserProvider>
      <ToastContainer style={{ fontSize: "16px" }} />
    </BrowserRouter>
  );
};

export default App;

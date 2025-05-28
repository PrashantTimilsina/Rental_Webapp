import { BrowserRouter, Routes, Route } from "react-router";

import Login from "./components/Login";
import Register from "./components/Register";
import { UserProvider } from "./context/Context";
import { ToastContainer } from "react-toastify";
import Layout from "./Layout";
import Home from "./Home";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </UserProvider>
      <ToastContainer style={{ fontSize: "16px" }} />
    </BrowserRouter>
  );
};

export default App;

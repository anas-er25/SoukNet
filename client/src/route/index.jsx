import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import OtpVerification from "../pages/Auth/OtpVerification";
import ResestPassword from "../pages/Auth/ResestPassword";
import UserMenuMobile from "../pages/Auth/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Auth/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResestPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrders/>,
          },
          {
            path: "address",
            element: <Address />,
          },
        ],
      },
    ],
  },
]);

export default router;
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./component/Navbar.jsx";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Profile from "./pages/Profile";
import Footer from "./component/Footer";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path:'/verify',
    element:<Verify/>
  },
  {
    path:'/verify/:token',
    element:<VerifyEmail/>
  },
  {
    path:'/profile/:userId',
    element:<><Navbar/><Profile/><Footer/></>
  }
]);

export default function App() {
  return (
    <>
      <ToastContainer position='top-right'/>
      <RouterProvider router={router} />
      
    </>
  );
}

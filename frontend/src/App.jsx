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
import Products from "./pages/Products";
import Cart from './pages/Cart'
import Dashboard from "./pages/Dashboard";

//Below are the Child component of dashboard Component
import AdminOrders from "./pages/admin/AdminOrders";
import ShowUserOrders from "./pages/admin/ShowUserOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import UserInfo from "./pages/admin/UserInfo";
import AddProduct from "./pages/admin/AddProduct";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminSales from "./pages/admin/AdminSales";
import ProtectedRoute from "./component/ProtectedRoute";
import SingleProduct from './pages/SingleProduct'
import AddressForm from "./pages/AddressForm";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrder from "./pages/MyOrder";

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
    path: "/verify",
    element: <Verify />,
  },
  {
    path: "/verify/:token",
    element: <VerifyEmail />,
  },
  {
    path: "/profile/:userId",
    element: (
      <ProtectedRoute>
        <Navbar/>
        <Profile/>
        <Footer/>
      </ProtectedRoute>
    ),
  },//if user is looged in then it should show the Profile page other wise it should show the login page
  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products />
      </>
    ),
  },//all products
  {
    path:'/product/:id',
    element:(<>
    <Navbar/>
    <SingleProduct/>
    </>)
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute> 
        <Navbar/>
        <Cart/>
      </ProtectedRoute>
    ),
  } ,//if user is looged in then it should show the Cart page other wise it should show the login page
  {
    path:'/address',
    element:<ProtectedRoute><AddressForm/></ProtectedRoute>
  },
  {
    path:"/order-success",
    element:<ProtectedRoute><OrderSuccess/></ProtectedRoute>
  },
  {
    path:"/dashboard",
    element: <ProtectedRoute adminOnly={true}>
      <Navbar/> 
      <Dashboard/>
    </ProtectedRoute> ,
    children:[
      {
        path:"sales",
        element:<AdminSales/>
      },
      {
        path:'add-product',
        element:<AddProduct/>
      },
      {
        path:'products',
        element:<AdminProduct/>
      },
      {
        path:'orders',
        element:<AdminOrders/>
      },
      {
       path:'users/orders/:userId',
       element:<ShowUserOrders/>
      },
      {
        path:'users',
        element:<AdminUsers/>
      },
      {
        path:'users/:id',
        element:<UserInfo/>
      }
    ]
  },//if user is admin then and then it will show the dashboard Page here also we have use Protected route
  
]);

export default function App() {
  return (
    <>
      <ToastContainer position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

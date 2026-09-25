import React from "react";
import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      
      <Sidebar />  

      <main
        style={{
          flex: 1,
          minWidth: 0,
          width: "100%",
          overflowX: "hidden",
        }}
      > 
        <Outlet /> 
      </main> 
   
    </div>
  );
}
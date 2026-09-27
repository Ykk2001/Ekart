import React from "react";
import Hero from "../component/Hero.jsx";
import Navbar from "../component/Navbar.jsx";
import Features from "../component/Features.jsx";
import Footer from "../component/Footer.jsx";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      <Navbar />
      
      <Box component="main" sx={{ flex: 1, }}>
       <Hero />
       <Features />
      </Box>
     
      <Footer />

    </Box>
  );
}

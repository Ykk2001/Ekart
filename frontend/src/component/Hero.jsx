import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function Hero() {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap:'wrap',
        gap:2,
        justifyContent:'space-around',
        alignItems:'center',
        background: "linear-gradient(to right, #2563eb, #9333ea)",
        color:'white',
        minHeight:'400px',
        minWidth:'100px',
        px:5,
        py:8

      }}
    >
      <Box sx={{minWidth:'300px'}}>

        <Typography variant="h3" sx={{fontWeight:'bold',mb:2}}>Latest Electronics at Best Prices</Typography>
        <Typography variant="h6"  sx={{mb:2,color:"darkgray"}}>
          Discover Cutting-edge Technology with deals on SmartPhones,Laptops and
          More
        </Typography>
        <Button variant="contained" sx={{borderRadius:'6px',mr:2,background:'white',color:"blue",textTransform:'none'}}>Shop Now</Button>
        <Button variant="outlined" sx={{borderRadius:'6px',color:'white',textTransform:'capitalize',borderColor:'white'}}>View deals</Button>

      </Box>

      <Box sx={{minWidth:'300px'}}>

        <Box
          component="img"
          src="/Two_SmartPhone.png"
          alt="hero"
          sx={{ maxWidth: "500px",width:'100%',borderRadius:3,boxShadow:4,backgroundColor:'blue'}}
        />

      </Box>

    </Box>
  );
}

// import { Box, Button, Typography } from "@mui/material";
// import React from "react";

// export default function Hero() {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexWrap:'wrap',
//         gap:2,
//         justifyContent:'space-around',
//         alignItems:'center',
//         background: "linear-gradient(to right, #2563eb, #9333ea)",
//         color:'white',
//         minHeight:'400px',
//         minWidth:'100px',
//         px:5,
//         py:8

//       }}
//     >
//       <Box sx={{minWidth:'300px'}}>

//         <Typography variant="h3" sx={{fontWeight:'bold',mb:2}}>Latest Electronics at Best Prices</Typography>
//         <Typography variant="h6"  sx={{mb:2,color:"darkgray"}}>
//           Discover Cutting-edge Technology with deals on SmartPhones,Laptops and
//           More
//         </Typography>
//         <Button variant="contained" sx={{borderRadius:'6px',mr:2,background:'white',color:"blue",textTransform:'none'}}>Shop Now</Button>
//         <Button variant="outlined" sx={{borderRadius:'6px',color:'white',textTransform:'capitalize',borderColor:'white'}}>View deals</Button>

//       </Box>

//       <Box sx={{minWidth:'300px'}}>

//         <Box
//           component="img"
//           src="/Two_SmartPhone.png"
//           alt="hero"
//           sx={{ maxWidth: "500px",width:'100%',borderRadius:3,boxShadow:4,backgroundColor:'blue'}}
//         />

//       </Box>

//     </Box>
//   );
// }


import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",

        display: "flex",
        flexWrap: "wrap",

        justifyContent: "space-around",
        alignItems: "center",

        gap: {
          xs: 4,
          sm: 5,
          md: 6,
        },

        background:
          "linear-gradient(to right, #2563eb, #9333ea)",

        color: "white",

        minHeight: {
          xs: "auto",
          sm: 400,
          md: 450,
        },

        px: {
          xs: 2,
          sm: 4,
          md: 6,
        },

        py: {
          xs: 5,
          sm: 6,
          md: 8,
        },
      }}
    >
      {/* Hero Content */}
      <Box
        sx={{
          flex: "1 1 400px",
          maxWidth: {
            xs: "100%",
            md: "550px",
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,

            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
            },

            lineHeight: 1.2,
          }}
        >
          Latest Electronics at Best Prices
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 3,

            color: "#e5e7eb",

            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
              md: "1.25rem",
            },

            lineHeight: 1.6,
          }}
        >
          Discover Cutting-edge Technology with deals on
          SmartPhones, Laptops and More
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
          }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "6px",
              background: "white",
              color: "blue",
              textTransform: "none",

              "&:hover": {
                background: "#f3f4f6",
              },
            }}
          >
            Shop Now
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderRadius: "6px",
              color: "white",
              textTransform: "capitalize",
              borderColor: "white",

              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            View Deals
          </Button>
        </Box>
      </Box>

      {/* Hero Image */}
      <Box
        sx={{
          flex: "1 1 350px",
          maxWidth: {
            xs: "100%",
            sm: "500px",
          },

          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/Two_SmartPhone.png"
          alt="Smartphones"
          sx={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",

            borderRadius: 3,
            boxShadow: 4,

            display: "block",
          }}
        />
      </Box>
    </Box>
  );
}


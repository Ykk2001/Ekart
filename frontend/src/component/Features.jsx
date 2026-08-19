import { Box, Typography } from "@mui/material";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShieldIcon from "@mui/icons-material/Shield";
import HeadsetIcon from "@mui/icons-material/Headset";
export default function Features() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 4, background:'#e1e2e4' }}>
     
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
            background: "rgb(173,216,230)",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LocalShippingIcon color="primary" />
        </Box>

        <Box>
          <Typography variant="h6">Free Shipping</Typography>
          <Typography sx={{ color: "GrayText" }}>On orders over $50</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
            background: "#d6ffc1",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ShieldIcon color="success" />
        </Box>

        <Box>
          <Typography variant="h6">Secure Payment</Typography>
          <Typography sx={{ color: "GrayText" }}>
            100% Secure Transactions
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
            background: "#fce5fc",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <HeadsetIcon sx={{ color: "purple" }} />
        </Box>

        <Box>
          <Typography variant="h6">24/7 Support</Typography>
          <Typography sx={{ color: "GrayText" }}>
            Always here to Help
          </Typography>
        </Box>
      </Box>

    </Box>
  );
}
